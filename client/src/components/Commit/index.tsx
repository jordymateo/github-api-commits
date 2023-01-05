import React, { FC } from 'react';
import { Avatar, List, Skeleton, Typography } from 'antd';
import { CommitProps, ICommit } from './types';
import styles from './styles.module.scss';
import { CommitIcon } from '../Icons';
import { timeAgo } from '../../utils/timeFormat';

const { Text, Link } = Typography;

const Commit: FC<CommitProps> = ({ html_url, commit, author, loading }) => {
  console.log(commit);
  return (
    <List.Item>
      <Skeleton loading={loading} active avatar>
        <List.Item.Meta
          avatar={<CommitIcon />}
          title={<Link href={html_url} target="_blank">{commit.message}</Link>}
        />
        <div className={styles.content}>
          <Text className={styles.commitedBy}>
            Commited by
            <Avatar size={30} src={author.avatar_url} />
            <Link href={author.html_url} target="_blank">{author.login}</Link>
          </Text>
          <span>•</span>
          {commit?.committer?.date ? (
            <Text>
              Committed {timeAgo.format(new Date(commit.committer.date))}
            </Text>
          ) : null}
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