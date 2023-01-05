
import { Avatar, Card, List, Skeleton, Space, Typography } from 'antd';
import { GithubOutlined } from '@ant-design/icons';
import axios from 'axios';
import React, { FC, useEffect, useState } from 'react';
import { Repository, skeletonData } from './types.d';
import Commit from '../../components/Commit';
import { ICommit } from '../../components/Commit/types';
import { timeAgo } from '../../utils/timeFormat';
import styles from './styles.module.scss';
import InfiniteScroll from 'react-infinite-scroll-component';

const perPage = 10;
const { Title } = Typography;

const HomePage: FC = () => {
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [repo, setRepo] = useState<Repository>();
  const [commits, setCommits] = useState<ICommit[]>(skeletonData);
  const [loadingRepo, setLoadingRepo] = useState<boolean>(true);
  const [loadingCommits, setLoadingCommits] = useState<boolean>(true);

  useEffect(() => {
    const repo = new AbortController();

    axios.get(`${process.env.REACT_APP_API}/github/repo`, { signal: repo.signal })
      .then(({ data }) => {
        setTimeout(() => {
          setRepo(data);
          setLoadingRepo(false);
        }, 1000);
      }).catch((error) => {
        setLoadingRepo(false);
        console.error(error);
      });

    return () => {
      repo.abort();
    }
  }, []);

  useEffect(() => {
    const commits = new AbortController();

    axios.get(`${process.env.REACT_APP_API}/github/commits?per_page=${perPage}&page=${page}`, { signal: commits.signal })
      .then(({ data }) => {
        setTimeout(() => {
          setCommits(prev => prev[0].node_id ? [...prev, ...data] : [...data]);
          setLoadingCommits(false);
          setHasMore(data.length >= perPage);
        }, 1000);
      }).catch((error) => {
        setLoadingCommits(false);
        console.error(error);
      });

    return () => {
      commits.abort();
    }
  }, [page]);

  const onLoadNextPage = () => {
    setPage(prev => prev + 1);
  }

  return (
    <div className={styles.layout}>
      <div className={styles.container}>
        <div className={styles.header}>
          {loadingRepo ? (
            <Skeleton.Input className={styles.topSpace2} size="large" active />
          ) : (
            <Title level={2}>
              <GithubOutlined />
              <b> Repository: </b>
              <a href={repo?.html_url} target="_blank">{repo?.name}</a>
            </Title>
          )}
          {loadingRepo ? (
            <Space className={styles.topSpace2} >
              <Skeleton.Button active />
              <Skeleton.Avatar shape="circle" active />
              <Skeleton.Input active />
            </Space>
          ) : (
            <Title level={4} className={styles.owner}>
              Owner:
              <Avatar size={30} src={repo?.owner.avatar_url} />
              <a href={repo?.owner.html_url} target="_blank">{repo?.owner.login}</a>
            </Title>
          )}
        </div>
        <Card className={styles.card}>
          <div className={styles.info}>
            <div className={styles.left}>
              {loadingRepo ? (
                <Skeleton.Input className={styles.topSpace1} active />
              ) : (
                <Title level={5}>
                  Default branch: <b>{repo?.default_branch}</b>
                </Title>
              )}
            </div>
            <div className={styles.right}>
              {loadingRepo ? (
                <Skeleton.Input className={styles.topSpace1} active />
              ) : (
                <Title level={5}>
                  Creation date: <b>{timeAgo.format(new Date(repo?.created_at!))}</b>
                </Title>
              )}

            </div>
          </div>
          <InfiniteScroll
            dataLength={perPage}
            next={onLoadNextPage}
            hasMore={hasMore}
            loader={
              <div className={styles.infiniteLoading}>
                <Commit
                  loading={true}
                  {...skeletonData[0]}
                />
              </div>
            }
          >
            <List
              itemLayout="vertical"
              size="large"
              dataSource={commits}
              renderItem={(item) => (
                <Commit
                  key={item.node_id}
                  loading={loadingCommits}
                  {...item}
                />
              )}
            />
          </InfiniteScroll>

        </Card>

      </div>
    </div>
  );
}

export default HomePage;