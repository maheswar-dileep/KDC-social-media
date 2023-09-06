import { useState } from 'react';
import backend from '../../utils/axios';
import { ThumbsDown, ThumbsUp } from 'lucide-react';
import './search.css';

const Search = () => {
  const [keyword, setKeyword] = useState('');
  const [posts, setPosts] = useState([]);

  const handleSearch = async () => {
    const res = await backend.get(`/posts/search?keyword=${keyword}`);
    console.log(res.data);
    setPosts(res.data.post);
  };

  const handleLike = async (id) => {
    await backend.put(`/posts/like/${id}`);
    handleSearch();
  };

  const handleDisike = async (id) => {
    await backend.put(`/posts/dislike/${id}`);
    handleSearch();
  };

  return (
    <>
      <div className="">
        <input
          type="search"
          name="search"
          value={keyword}
          className="search-container"
          onChange={(e) => {
            setKeyword(e.target.value);
          }}
        />
        <button type="button" className="search-btn" onClick={() => handleSearch()}>
          Search
        </button>
      </div>

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
            </div>
          ))}
      </div>
    </>
  );
};

export default Search;
