import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { finalize } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PublicContentService } from '../../core/services/public-content.service';
import { BulletinItem, BulletinList } from '../../core/models/content.models';
import { LoadingStateComponent } from '../../shared/ui/loading-state/loading-state.component';
import { ErrorStateComponent } from '../../shared/ui/error-state/error-state.component';
import { EmptyStateComponent } from '../../shared/ui/empty-state/empty-state.component';

@Component({
  selector: 'app-warta-arsip-page',
  standalone: true,
  imports: [NgClass, NgIf, NgFor, LoadingStateComponent, ErrorStateComponent, EmptyStateComponent],
  templateUrl: './warta-arsip.html',
  styleUrl: './warta-arsip.css'
})
export class WartaArchivePageComponent {
  private readonly contentService = inject(PublicContentService);
  private readonly destroyRef = inject(DestroyRef);

  bulletins: BulletinList | null = null;
  allBulletins: BulletinItem[] = [];
  selectedMonth = '';
  isLoading = false;
  errorMessage = '';

  ngOnInit(): void {
    this.loadBulletins();
  }

  loadBulletins(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.contentService
      .getBulletins()
      .pipe(
        finalize(() => {
          this.isLoading = false;
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: (response) => {
          if (!response?.isSuccess || !response.data) {
            this.bulletins = null;
            this.allBulletins = [];
            this.selectedMonth = '';
            return;
          }
          this.bulletins = response.data;
          this.allBulletins = this.buildArchiveItems(response.data);
          if (!this.selectedMonth) {
            this.selectedMonth = response.data.archives?.[0]?.month || '';
          }
        },
        error: () => {
          this.errorMessage = 'Gagal memuat arsip warta jemaat.';
          this.bulletins = null;
          this.allBulletins = [];
          this.selectedMonth = '';
        }
      });
  }

  setMonth(month: string): void {
    this.selectedMonth = month;
  }

  get filteredBulletins(): BulletinItem[] {
    if (!this.selectedMonth) {
      return this.allBulletins;
    }
    const month = this.selectedMonth.toLowerCase();
    const yearMatch = month.match(/\\d{4}/)?.[0] || '';
    const monthName = month.replace(yearMatch, '').trim();
    const shortMap: Record<string, string> = {
      januari: 'jan',
      februari: 'feb',
      maret: 'mar',
      april: 'apr',
      mei: 'mei',
      juni: 'jun',
      juli: 'jul',
      agustus: 'agu',
      september: 'sep',
      oktober: 'okt',
      november: 'nov',
      desember: 'des'
    };
    const monthShort = shortMap[monthName] || monthName.slice(0, 3);
    return this.allBulletins.filter((item) => {
      const label = item.dateLabel.toLowerCase();
      const matchesYear = yearMatch ? label.includes(yearMatch) : true;
      const matchesMonth =
        label.includes(monthName) || label.includes(monthShort);
      return matchesYear && matchesMonth;
    });
  }

  private buildArchiveItems(data: BulletinList): BulletinItem[] {
    const items = [data.weekly, ...(data.latest || [])].filter(Boolean) as BulletinItem[];
    const seen = new Set<string>();
    return items.filter((item) => {
      const key = item.id || `${item.dateLabel}-${item.theme}`;
      if (seen.has(key)) {
        return false;
      }
      seen.add(key);
      return true;
    });
  }
}
