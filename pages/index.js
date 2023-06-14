import { useState } from 'react';

import { loadData } from './api/post';
import {
  Section,
  Cover,
  SocialNetworks,
  Title,
  PostGrid,
  Post,
  Button
} from '../components';
import CustomHead from '@/components/CustomHead';

const LOAD_MORE_STEP = 4;

export default function Home({ initialPosts, total }) {
  const [ posts, setPosts ] = useState(initialPosts);
  const [ loadedAmount, setLoadedAmount ] = useState(LOAD_MORE_STEP);
  const [ loading, setLoading ] = useState(false);

  const showLoadButton = total > loadedAmount;

  const getMorePosts = async () => {
    setLoading(true);

    try {
      const data = await fetch(`/api/post?start=${loadedAmount}&end=${loadedAmount + LOAD_MORE_STEP}`).then((response) => response.json());
      setLoadedAmount(loadedAmount + LOAD_MORE_STEP);
      setPosts([...posts, ...data.posts])
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div style={{
      marginBottom: '1rem',
    }}>
      <CustomHead 
        title={"Blogs"}      
      />
      <Section>
        <Cover title="Blogs"/>
        <SocialNetworks />
      </Section>
      <Section>
        <Title>New Post</Title>
        <PostGrid>
          {posts.map((post) => (
            <Post
              key={post._id}
              {...post}
            />
          ))}
        </PostGrid>
        {showLoadButton && (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
          }}>
            <Button
              disabled={loading}
              onClick={getMorePosts}
            >
              Load more posts...
            </Button>
          </div>
        )}
      </Section>
    </div>
  )
}

export async function getServerSideProps() {
  const { posts, total } = await loadData(0, LOAD_MORE_STEP);

  return {
    props: {
      initialPosts: posts,
      total,
    },
  }
}