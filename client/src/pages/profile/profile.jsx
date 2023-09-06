import { useEffect, useState } from 'react';
import Navbar from '../../components/navbar/navbar.jsx';
import { useSelector } from 'react-redux';
import backend from '../../utils/axios.jsx';
import './profile.css';
import { ThumbsDown, ThumbsUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const Profile = () => {
  const [posts, setPosts] = useState([]);
  const userData = useSelector((state) => state?.data?.value)[0];

  useEffect(() => {
    const getPosts = async () => {
      const res = await backend.get(`/posts/post-by-id/${userData._id}`);
      console.log(res);
      setPosts(res.data.post);
    };
    getPosts();
  }, []);

  const handleLike = async (id) => {
    const res = await backend.put(`/posts/like/${id}`);
    console.log(res.data);
  };

  const handleDisike = async (id) => {
    const res = await backend.put(`/posts/dislike/${id}`);
    console.log(res);
  };

  const handleDelete = async (id) => {
    const res = await backend.delete(`/posts/post/${id}`);
    console.log(res.data);
    window.location.reload();
  };

  return (
    <>
      <Navbar />
      <h2 className="profile-userName">Hi, {userData.name}</h2>

      <h1 className="posts-h1">Posts</h1>

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
                      data.like++;
                    }}
                  />
                  :{data.like}
                </div>
                <div>
                  <ThumbsDown
                    onClick={() => {
                      handleDisike(data._id);
                      data.dislike++;
                    }}
                  />
                  :{data.dislike}
                </div>
              </div>
              {data.content}
              <div>
                <button type="button">
                  <Link to={`/edit-post/${data._id}`}>Edit</Link>
                </button>

                <button onClick={() => handleDelete(data._id)} type="button">
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default Profile;
