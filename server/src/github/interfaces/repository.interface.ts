export interface Repository {
  readonly node_id: string;
  readonly name: string;
  readonly full_name: string;
  readonly owner: {
    login: string;
    html_url: string;
  };
}