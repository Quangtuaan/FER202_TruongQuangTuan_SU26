import { useEffect, useState } from "react";
import { fetchPosts } from "../api";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts()
      .then((data) => {
        setPosts(data.slice(0, 8));
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading posts:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="loading">Loading posts...</p>;
  }

  return (
    <div>
      <section className="hero">
        <h1>📝 Posts</h1>
      </section>

      <div className="post-grid">
        {posts.map((post) => (
          <div className="post-card" key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Posts;