import React from "react";
import Post from "../../components/Post/Post";
import { gql, useQuery } from "@apollo/client";

const GET_POSTS = gql`
  query Posts {
    posts {
      id
      title
      content
      createdAt
      author {
        name
      }
    }
  }
`;

export default function Posts() {
  const { data, error, loading } = useQuery(GET_POSTS);

  if (error) return <div>Error Page</div>;
  if (loading) return <div>Spinner ......</div>;
  const { posts } = data;

  return (
    <div>
      {posts.map((post) => {
        return (
          <Post
            key={post.id}
            title={post.title}
            content={post.content}
            date={post.createdAt}
            id={post.id}
            user={post.author.name}
          ></Post>
        );
      })}
    </div>
  );
}
