export interface PaginateResult<T> {
  data: T[];
  meta: {
    limit: number;
    total: number;
    page: number;
    totalPages: number;
  };
}
