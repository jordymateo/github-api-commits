
import { Avatar, Card, List, Typography } from 'antd';
import axios from 'axios';
import React, { FC, useEffect, useState } from 'react';
import Commit from '../../components/Commit';
import { ICommit } from '../../components/Commit/types';
import { timeAgo } from '../../utils/timeFormat';
import styles from './styles.module.scss';
import { Repository, skeletonData } from './types.d';

const { Title } = Typography;


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
          <Title level={2}>
            <b>Repository: </b>
            <a href={repo?.html_url} target="_blank">{repo?.name}</a>
          </Title>
          <Title level={4} className={styles.owner}>
            Owner:
            <Avatar size={30} src={repo?.owner.avatar_url} />
            <a href={repo?.owner.html_url} target="_blank">{repo?.owner.login}</a>
          </Title>
        </div>
        <Card className={styles.card}>
          <div className={styles.info}>
            <div className={styles.left}>
              <Title level={5}>
                Default branch: <b>{repo?.default_branch}</b>
              </Title>
            </div>
            <div className={styles.right}>
              {repo && (
                <Title level={5}>
                  Creation date: <b>{timeAgo.format(new Date(repo.created_at))}</b>
                </Title>
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