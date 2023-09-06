import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import backend from '../../utils/axios';

const EditPost = () => {
  let id = useParams();
  const navigate = useNavigate();
  id = id.id;

  const [data, setData] = useState();
  const [title, setTitle] = useState();
  const [content, setContent] = useState();

  useEffect(() => {
    const getPost = async () => {
      const res = await backend.get(`/posts/post/${id}`);
      setData(res.data.post);
      setTitle(res.data.post.title);
      setContent(res.data.post.content);
    };
    getPost();
  }, []);

  const handleSubmit = async (id) => {
    const postData = {
      title,
      content,
      author: data.author,
      authorId: data.authorId,
    };
    const res = await backend.put(`/posts/post/${id}`, postData);
    if (res.data.success) {
      navigate('/profile');
    }
  };
  return (
    <>
      <h1>Edit Post</h1>
      {data && (
        <div className="posts-container">
          <div className="card" key={data._id}>
            <span className="card-title">
              title:
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            </span>
            <h4 className="card-user">author : {data.author}</h4>
            <textarea
              rows={10}
              cols={30}
              type="text"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <div>
              <button onClick={() => handleSubmit(data._id)} type="button">
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditPost;
