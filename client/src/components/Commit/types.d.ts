
export interface ICommit {
  node_id: string;
  html_url: string;
  author: {
    login: string;
    avatar_url: string;
    html_url: string;
  }
  commit: {
    commiter: { date: string; }
    message: string;
  };
}

export interface CommitProps extends ICommit {
  loading: boolean;
}