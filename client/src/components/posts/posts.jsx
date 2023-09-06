import { ThumbsDown, ThumbsUp } from 'lucide-react';
import './posts.css';
import backend from '../../utils/axios';
import { useEffect, useState } from 'react';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const getPosts = async () => {
    const res = await backend.get('/posts/post');
    setPosts(res.data.post);
  };
  useEffect(() => {
    getPosts();
  }, []);

  const handleLike = async (id) => {
    await backend.put(`/posts/like/${id}`);
    getPosts();
  };

  const handleDisike = async (id) => {
    await backend.put(`/posts/dislike/${id}`);
    getPosts();
  };

  return (
    <>
      <div className="posts-container">
        {posts &&
          posts.map((data) => (
            <div className="card" key={data._id}>
              <h2 className="card-title">{data?.title}</h2>
              <h4 className="card-user">author : {data.author}</h4>
              <div className="like-container">
                <div>
                  <ThumbsUp
                    onClick={() => {
                      handleLike(data._id);
                    }}
                  />
                  :{data.like}
                </div>
                <div>
                  <ThumbsDown
                    onClick={() => {
                      handleDisike(data._id);
                    }}
                  />
                  :{data.dislike}
                </div>
              </div>
              {data.content}
            </div>
          ))}
      </div>
    </>
  );
};

export default Posts;
