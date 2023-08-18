import {useEffect, useState} from 'react';
import BlogList from "./BlogList";

const Home = () => {
  const [blogs, setBlogs] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      fetch('http://localhost:8000/blogss')
          .then((res) => {
            if (!res.ok) {
              throw Error('could not fetch the data for that resource');
            }
            return res.json();
          })
          .then((data) => {
            setError(null);
            setBlogs(data);
            setIsPending(false);
          })
          .catch((err) => {
            setIsPending(false);
            setError(err.message);
          });
    }, 1000);
  }, []);

  return (
      <div className="content">
        {error && <div>{error}</div>}
        {isPending && <div>Loading...</div>}
        {blogs && <BlogList blogs={blogs} title="All blogs"/>}
      </div>
  );
};

export default Home;
