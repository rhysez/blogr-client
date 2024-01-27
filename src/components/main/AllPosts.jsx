import Post from "./Post";
import Nav from "./Nav";
import Hero from "./Hero";
import { useLocation } from "react-router-dom";
import * as React from 'react';

export default function AllPosts(props) {
  const posts = props.posts;
  const location = useLocation();

  if (!posts) {
    return (
      <h1 style={{ marginTop: "100px" }}>Sorry, we could not load any posts</h1>
    );
  }

  const postsMapped = posts.map(item => {
    return (
      <Post
        title={item.title}
        text="Read post to see more..."
        likes={item.likes}
        dislikes={item.dislikes}
        comments={item.comments.length}
        key={item._id}
        id={item._id}
      />
    );
  });

  return (
    <>
      <section className='gradient-box'>
        <Nav />
      </section>
      <section className="all-posts-container">{postsMapped}</section>
    </>
  );
}
