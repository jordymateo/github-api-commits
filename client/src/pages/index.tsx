
import { Card, List } from 'antd';
import axios from 'axios';
import React, { FC, useEffect, useState } from 'react';
import Commit from '../components/Commit';
import { ICommit } from '../components/Commit/types';
import styles from './styles.module.scss';

const skeletonData = [{
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

const HomePage: FC = () => {
  const [commits, setCommits] = useState<ICommit[]>(skeletonData);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const about = new AbortController();
    // axios.get(`${process.env.REACT_APP_API}/github/commits`, { signal: about.signal })
    //   .then(({ data }) => {
    //     console.log(data);
    //     setTimeout(() => {
    //       setCommits(data);
    //       setLoading(false)
    //     }, 1000);
    //   }).catch((error) => {
    //     setLoading(false);
    //     console.error(error);
    //   });

    return () => {
      about.abort();
    }
  }, []);

  return (
    <div className={styles.layout}>
      <div className={styles.container}>
        <Card>
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