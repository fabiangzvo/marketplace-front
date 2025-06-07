export interface ProductTableProps {
  hideOptions?: boolean;
  token: string;
  userRole: string;
}

export interface SearchState {
  page: number;
  search: string;
}

export interface SearchInfiniteState {
  page: number;
  search: string;
  minPrice?: number;
  maxPrice?: number;
}
