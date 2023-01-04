export interface Commit {
  readonly title: string;
  readonly sha: string;
  readonly node_id: string;
  readonly commit: {
    author: {
      name: string;
      email: string;
      date: string;
    },
    message: string;
    url: string;
  };
}