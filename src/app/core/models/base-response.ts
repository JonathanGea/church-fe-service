export interface BaseResponse<T> {
  isSuccess: boolean;
  errors: null | unknown;
  data: T;
  timestamp: string;
}
