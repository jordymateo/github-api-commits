
import { Avatar, Card, List } from 'antd';
import axios from 'axios';
import React, { FC, useEffect, useState } from 'react';
import Commit from '../../components/Commit';
import { ICommit } from '../../components/Commit/types';
import { timeAgo } from '../../utils/timeFormat';
import styles from './styles.module.scss';
import { Repository, skeletonData } from './types.d';


const HomePage: FC = () => {
  const [repo, setRepo] = useState<Repository>();
  const [commits, setCommits] = useState<ICommit[]>(skeletonData);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const repo = new AbortController();
    const commits = new AbortController();

    axios.get(`${process.env.REACT_APP_API}/github/repo`, { signal: repo.signal })
      .then(({ data }) => {
        setRepo(data);
      }).catch((error) => {
        console.error(error);
      });

    axios.get(`${process.env.REACT_APP_API}/github/commits`, { signal: commits.signal })
      .then(({ data }) => {
        setTimeout(() => {
          setCommits(data);
          setLoading(false)
        }, 1000);
      }).catch((error) => {
        setLoading(false);
        console.error(error);
      });

    return () => {
      repo.abort();
      commits.abort();
    }
  }, []);

  return (
    <div className={styles.layout}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            <b>Repository: </b>
            <a href={repo?.html_url} target="_blank">{repo?.name}</a>
          </h2>
          <div className={styles.owner}>
            <h3>Owner: </h3>
            <Avatar size={40} src={repo?.owner.avatar_url} />
            <a href={repo?.owner.html_url} target="_blank">{repo?.owner.login}</a>
          </div>
        </div>
        <Card className={styles.card}>
          <div className={styles.info}>
            <div className={styles.left}>
              <p>Default branch: {repo?.default_branch}</p>
            </div>
            <div className={styles.right}>
              {repo && (
                <p>Creation date: {timeAgo.format(new Date(repo.created_at))}</p>
              )}
            </div>
          </div>
          <List
            itemLayout="vertical"
            size="large"
            dataSource={commits}
            renderItem={(item) => (
              <Commit
                key={item.node_id}
                loading={loading}
                {...item}
              />
            )}
          />
        </Card>

      </div>
    </div>
  );
}

export default HomePage;