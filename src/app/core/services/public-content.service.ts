import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, concat, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { API_BASE_URL } from '../tokens/api-base-url';
import { BaseResponse } from '../models/base-response';
import {
  AboutContent,
  ActivityDetail,
  ActivityList,
  AlbumDetail,
  AlbumList,
  BulletinList,
  ContactInfo,
  HomeContent,
  MinistryContent,
  OfferingInfo,
  WorshipContent
} from '../models/content.models';

@Injectable({
  providedIn: 'root'
})
export class PublicContentService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = inject(API_BASE_URL);
  private readonly cache = new Map<string, BaseResponse<unknown>>();

  getHome(): Observable<BaseResponse<HomeContent>> {
    return this.getWithCache(
      'home',
      this.http.get<BaseResponse<HomeContent>>(`${this.baseUrl}/public/home`)
    );
  }

  getAbout(): Observable<BaseResponse<AboutContent>> {
    return this.getWithCache(
      'about',
      this.http.get<BaseResponse<AboutContent>>(`${this.baseUrl}/public/about`)
    );
  }

  getWorship(): Observable<BaseResponse<WorshipContent>> {
    return this.getWithCache(
      'worship',
      this.http.get<BaseResponse<WorshipContent>>(`${this.baseUrl}/public/worship`)
    );
  }

  getBulletins(params?: { page?: number; limit?: number }): Observable<BaseResponse<BulletinList>> {
    const key = this.createKey('bulletins', params);
    const request$ = this.http.get<BaseResponse<BulletinList>>(`${this.baseUrl}/public/bulletins`, {
      params: this.createParams(params)
    });
    return this.getWithCache(key, request$);
  }

  getActivities(params?: {
    month?: string;
    category?: string;
    q?: string;
  }): Observable<BaseResponse<ActivityList>> {
    const key = this.createKey('activities', params);
    const request$ = this.http.get<BaseResponse<ActivityList>>(`${this.baseUrl}/public/activities`, {
      params: this.createParams(params)
    });
    return this.getWithCache(key, request$);
  }

  getActivityDetail(id: string): Observable<BaseResponse<ActivityDetail>> {
    return this.getWithCache(
      `activities/${id}`,
      this.http.get<BaseResponse<ActivityDetail>>(`${this.baseUrl}/public/activities/${id}`)
    );
  }

  getMinistry(): Observable<BaseResponse<MinistryContent>> {
    return this.getWithCache(
      'ministry',
      this.http.get<BaseResponse<MinistryContent>>(`${this.baseUrl}/public/ministry`)
    );
  }

  getOfferings(): Observable<BaseResponse<OfferingInfo>> {
    return this.getWithCache(
      'offerings',
      this.http.get<BaseResponse<OfferingInfo>>(`${this.baseUrl}/public/offerings`)
    );
  }

  getContact(): Observable<BaseResponse<ContactInfo>> {
    return this.getWithCache(
      'contact',
      this.http.get<BaseResponse<ContactInfo>>(`${this.baseUrl}/public/contact`)
    );
  }

  getAlbums(tag?: string): Observable<BaseResponse<AlbumList>> {
    const key = this.createKey('albums', { tag });
    const request$ = this.http.get<BaseResponse<AlbumList>>(`${this.baseUrl}/public/albums`, {
      params: this.createParams({ tag })
    });
    return this.getWithCache(key, request$);
  }

  getAlbumDetail(id: string): Observable<BaseResponse<AlbumDetail>> {
    return this.getWithCache(
      `albums/${id}`,
      this.http.get<BaseResponse<AlbumDetail>>(`${this.baseUrl}/public/albums/${id}`)
    );
  }

  private createParams(params?: Record<string, string | number | undefined | null>): HttpParams {
    let httpParams = new HttpParams();
    if (!params) {
      return httpParams;
    }
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && `${value}`.length > 0) {
        httpParams = httpParams.set(key, String(value));
      }
    });
    return httpParams;
  }

  private createKey(prefix: string, params?: Record<string, string | number | undefined | null>): string {
    if (!params) {
      return prefix;
    }
    return `${prefix}:${JSON.stringify(params)}`;
  }

  private getWithCache<T>(
    key: string,
    request$: Observable<BaseResponse<T>>
  ): Observable<BaseResponse<T>> {
    const cached = this.cache.get(key) as BaseResponse<T> | undefined;
    const requestWithCache = request$.pipe(
      tap((response) => {
        this.cache.set(key, response);
      })
    );

    return cached ? concat(of(cached), requestWithCache) : requestWithCache;
  }
}
