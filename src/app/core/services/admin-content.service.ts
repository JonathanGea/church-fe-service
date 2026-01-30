import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../tokens/api-base-url';
import { BaseResponse } from '../models/base-response';
import {
  AboutContent,
  ActivityDetail,
  ActivityItem,
  ActivityList,
  ActivityPayload,
  AlbumDetail,
  AlbumItem,
  AlbumList,
  AlbumPayload,
  AlbumPhotoPayload,
  BulletinItem,
  BulletinList,
  BulletinPayload,
  ContactInfo,
  HomeContent,
  MinistryContent,
  OfferingInfo,
  WorshipContent
} from '../models/content.models';

@Injectable({
  providedIn: 'root'
})
export class AdminContentService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = inject(API_BASE_URL);

  getHome(): Observable<BaseResponse<HomeContent>> {
    return this.http.get<BaseResponse<HomeContent>>(`${this.baseUrl}/admin/home`);
  }

  updateHome(payload: HomeContent): Observable<BaseResponse<HomeContent>> {
    return this.http.put<BaseResponse<HomeContent>>(`${this.baseUrl}/admin/home`, payload);
  }

  getAbout(): Observable<BaseResponse<AboutContent>> {
    return this.http.get<BaseResponse<AboutContent>>(`${this.baseUrl}/admin/about`);
  }

  updateAbout(payload: AboutContent): Observable<BaseResponse<AboutContent>> {
    return this.http.put<BaseResponse<AboutContent>>(`${this.baseUrl}/admin/about`, payload);
  }

  getWorship(): Observable<BaseResponse<WorshipContent>> {
    return this.http.get<BaseResponse<WorshipContent>>(`${this.baseUrl}/admin/worship`);
  }

  updateWorship(payload: WorshipContent): Observable<BaseResponse<WorshipContent>> {
    return this.http.put<BaseResponse<WorshipContent>>(`${this.baseUrl}/admin/worship`, payload);
  }

  getBulletins(params?: { page?: number; limit?: number }): Observable<BaseResponse<BulletinList>> {
    return this.http.get<BaseResponse<BulletinList>>(`${this.baseUrl}/admin/bulletins`, {
      params: this.createParams(params)
    });
  }

  updateBulletins(payload: BulletinList): Observable<BaseResponse<BulletinList>> {
    return this.http.put<BaseResponse<BulletinList>>(`${this.baseUrl}/admin/bulletins`, payload);
  }

  createBulletin(payload: BulletinPayload): Observable<BaseResponse<BulletinItem>> {
    return this.http.post<BaseResponse<BulletinItem>>(`${this.baseUrl}/admin/bulletins`, payload);
  }

  updateBulletin(id: string, payload: BulletinPayload): Observable<BaseResponse<BulletinItem>> {
    return this.http.put<BaseResponse<BulletinItem>>(`${this.baseUrl}/admin/bulletins/${id}`, payload);
  }

  deleteBulletin(id: string): Observable<BaseResponse<Record<string, never>>> {
    return this.http.delete<BaseResponse<Record<string, never>>>(`${this.baseUrl}/admin/bulletins/${id}`);
  }

  getActivities(params?: {
    month?: string;
    category?: string;
    q?: string;
  }): Observable<BaseResponse<ActivityList>> {
    return this.http.get<BaseResponse<ActivityList>>(`${this.baseUrl}/admin/activities`, {
      params: this.createParams(params)
    });
  }

  updateActivities(payload: ActivityList): Observable<BaseResponse<ActivityList>> {
    return this.http.put<BaseResponse<ActivityList>>(`${this.baseUrl}/admin/activities`, payload);
  }

  createActivity(payload: ActivityPayload): Observable<BaseResponse<ActivityItem>> {
    return this.http.post<BaseResponse<ActivityItem>>(`${this.baseUrl}/admin/activities`, payload);
  }

  getActivityDetail(id: string): Observable<BaseResponse<ActivityDetail>> {
    return this.http.get<BaseResponse<ActivityDetail>>(`${this.baseUrl}/admin/activities/${id}`);
  }

  updateActivity(id: string, payload: ActivityPayload): Observable<BaseResponse<ActivityDetail>> {
    return this.http.put<BaseResponse<ActivityDetail>>(`${this.baseUrl}/admin/activities/${id}`, payload);
  }

  deleteActivity(id: string): Observable<BaseResponse<Record<string, never>>> {
    return this.http.delete<BaseResponse<Record<string, never>>>(`${this.baseUrl}/admin/activities/${id}`);
  }

  getMinistry(): Observable<BaseResponse<MinistryContent>> {
    return this.http.get<BaseResponse<MinistryContent>>(`${this.baseUrl}/admin/ministry`);
  }

  updateMinistry(payload: MinistryContent): Observable<BaseResponse<MinistryContent>> {
    return this.http.put<BaseResponse<MinistryContent>>(`${this.baseUrl}/admin/ministry`, payload);
  }

  getOfferings(): Observable<BaseResponse<OfferingInfo>> {
    return this.http.get<BaseResponse<OfferingInfo>>(`${this.baseUrl}/admin/offerings`);
  }

  updateOfferings(payload: OfferingInfo): Observable<BaseResponse<OfferingInfo>> {
    return this.http.put<BaseResponse<OfferingInfo>>(`${this.baseUrl}/admin/offerings`, payload);
  }

  getContact(): Observable<BaseResponse<ContactInfo>> {
    return this.http.get<BaseResponse<ContactInfo>>(`${this.baseUrl}/admin/contact`);
  }

  updateContact(payload: ContactInfo): Observable<BaseResponse<ContactInfo>> {
    return this.http.put<BaseResponse<ContactInfo>>(`${this.baseUrl}/admin/contact`, payload);
  }

  getAlbums(tag?: string): Observable<BaseResponse<AlbumList>> {
    return this.http.get<BaseResponse<AlbumList>>(`${this.baseUrl}/admin/albums`, {
      params: this.createParams({ tag })
    });
  }

  updateAlbums(payload: AlbumList): Observable<BaseResponse<AlbumList>> {
    return this.http.put<BaseResponse<AlbumList>>(`${this.baseUrl}/admin/albums`, payload);
  }

  createAlbum(payload: AlbumPayload): Observable<BaseResponse<AlbumItem>> {
    return this.http.post<BaseResponse<AlbumItem>>(`${this.baseUrl}/admin/albums`, payload);
  }

  getAlbumDetail(id: string): Observable<BaseResponse<AlbumDetail>> {
    return this.http.get<BaseResponse<AlbumDetail>>(`${this.baseUrl}/admin/albums/${id}`);
  }

  updateAlbum(id: string, payload: AlbumPayload): Observable<BaseResponse<AlbumDetail>> {
    return this.http.put<BaseResponse<AlbumDetail>>(`${this.baseUrl}/admin/albums/${id}`, payload);
  }

  deleteAlbum(id: string): Observable<BaseResponse<Record<string, never>>> {
    return this.http.delete<BaseResponse<Record<string, never>>>(`${this.baseUrl}/admin/albums/${id}`);
  }

  addAlbumPhoto(id: string, payload: AlbumPhotoPayload): Observable<BaseResponse<AlbumDetail>> {
    return this.http.post<BaseResponse<AlbumDetail>>(
      `${this.baseUrl}/admin/albums/${id}/photos`,
      payload
    );
  }

  deleteAlbumPhoto(id: string, photoId: string): Observable<BaseResponse<Record<string, never>>> {
    return this.http.delete<BaseResponse<Record<string, never>>>(
      `${this.baseUrl}/admin/albums/${id}/photos/${photoId}`
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
}
