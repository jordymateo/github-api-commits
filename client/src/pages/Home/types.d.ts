export const skeletonData = [{
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
    commiter: { date: "" },
    message: "",
  }
}];

export interface Repository {
  node_id: string;
  name: string;
  full_name: string;
  default_branch: string;
  created_at: string;
  owner: {
    login: string;
    html_url: string;
    avatar_url: string;
  };
}
