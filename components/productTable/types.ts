export interface ProductTableProps {
  hideOptions?: boolean;
  token: string;
  userRole: string;
}

export interface SearchState {
  page: number;
  search: string;
}
