export interface PaginationData {
  count: number;
  page: number;
  pages: number;
}

export interface PaginatedResponse<T> extends PaginationData {
  items: T[];
}
