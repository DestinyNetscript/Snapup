import React, { useState } from 'react'; 
import useFetchProducts from '../../hooks/useFetchProducts';

const Posts = () => {
  const { products, loading, posts, error } = useFetchProducts(); 
  const [expandedPosts, setExpandedPosts] = useState({});

  if (loading) {
    return <div className="loading"></div>;
  }

  if (error) {
    return <p>Error loading products: {error.message}</p>;
  }

  const togglePostClass = (postId) => {
    setExpandedPosts(prevState => ({
      ...prevState,
      [postId]: !prevState[postId]
    }));
  };

  return (
    <div className="productList emplyoeeList">
      <h1 className="title">Posts</h1>  
      <ul className="posts">   
          {posts.map((post) => (
            <li key={post.id} className={expandedPosts[post.id] ? 'expanded' : ''}>
              <div className="postData">
                <div className="postImg">
                  <p>{post.id}</p>
                </div>
                <div className="postContent">
                  <h3>{post.title}</h3>
                  {expandedPosts[post.id] && <p>{post.body}</p>}
                </div>
                <div className="postArrow" onClick={() => togglePostClass(post.id)}>
                  <i className={`fa-solid fa-angle-${expandedPosts[post.id] ? 'up' : 'down'}`}></i>
                </div>
              </div>   
            </li>
          ))} 
      </ul>  
    </div>
  );
};

export default Posts;
