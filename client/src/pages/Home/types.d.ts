import ICommit  from "../../components/Commit/types";

export const skeletonData: ICommit[] = [{
  node_id: "",
  html_url: "",
  author: {
    login: "",
    avatar_url: "",
    html_url: "",
  },
  commit: {
    commiter: { date: "" },
    message: "",
  }
}, {
  node_id: "",
  html_url: "",
  author: {
    login: "",
    avatar_url: "",
    html_url: "",
  },
  commit: {
    committer: { date: "" },
    message: "",
  }
}];

export interface Repository {
  node_id: string;
  name: string;
  full_name: string;
  default_branch: string;
  created_at: string;
  html_url: string;
  owner: {
    login: string;
    html_url: string;
    avatar_url: string;
  };
}
