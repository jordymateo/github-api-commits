import React, { FC } from 'react';
import { Avatar, Card, List, Skeleton } from 'antd';
import { BranchesOutlined } from '@ant-design/icons';
import { CommitProps, ICommit } from './types';

// const Commit: FC<ICommit> = ({ node_id, html_url, commit, author }) => {
//   return (
//     <Card>
//       <BranchesOutlined />
//       <a href={html_url} target="_blank">{commit.message}</a>

//       <Avatar size={40} src={author.avatar_url} />

//       <a href={author.html_url} target="_blank">{author.login}</a>
//     </Card>
//   )
// }

const Commit: FC<CommitProps> = ({ node_id, html_url, commit, author, loading }) => {
  return (
    <List.Item>
      <Skeleton loading={loading} active avatar>
        <List.Item.Meta
          avatar={<Avatar size={40} src={author.avatar_url} />}
          title={<a href={html_url} target="_blank">{commit.message}</a>}
        />
        <a href={author.html_url} target="_blank">{author.login}</a>
      </Skeleton>
    </List.Item>
  )
}

export default Commit;