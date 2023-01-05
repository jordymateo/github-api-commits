import React, { FC } from 'react';
import { Avatar, Card, List, Skeleton } from 'antd';
import { BranchesOutlined } from '@ant-design/icons';
import { CommitProps, ICommit } from './types';
import styles from './styles.module.scss';
import { CommitIcon } from '../Icons';
import { timeAgo } from '../../utils/timeFormat';

const Commit: FC<CommitProps> = ({ html_url, commit, author, loading }) => {
  console.log(commit);
  return (
    <List.Item>
      <Skeleton loading={loading} active avatar>
        <List.Item.Meta
          avatar={<CommitIcon />}
          title={<a href={html_url} target="_blank">{commit.message}</a>}
        />
        <div className={styles.content}>
          <div className={styles.commitedBy}>
            <label>Commited by</label>
            <Avatar size={30} src={author.avatar_url} />
            <a href={author.html_url} target="_blank">{author.login}</a>
          </div>
          <span>•</span>
          <div>
            {commit?.committer?.date ? (
              <p>Committed {timeAgo.format(new Date(commit.committer.date))}</p>
            ) : null}
          </div>
        </div>
      </Skeleton>
      {/* <Skeleton loading={loading} active avatar>
        <List.Item.Meta
          avatar={<Avatar size={40} src={author.avatar_url} />}
          title={<label className={styles.metaTitle}>Commited by <a href={author.html_url} target="_blank">{author.login}</a></label>}
        />
       <a href={html_url} target="_blank">{commit.message}</a>
      </Skeleton> */}
    </List.Item>
  )
}

export default Commit;