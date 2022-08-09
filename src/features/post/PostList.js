// useSeletor is a hook to access the redux store's state. This hook takes a selector function as an argument. The selector is called with the store state.
// This hook takes an optional equality comparison function as the second parameter that allows you to customize the way the selected state is compared to determine whether the component needs to be re-rendered.
import React from 'react'
import { useSelector } from "react-redux";

import { selectAllPost } from './postsSlice';
import PostAuthor from './PostAuthor';
import TimeAgo from './TimeAgo';
import ReactionButtons from './ReactionsButtons';

const PostList = () => {
  const posts = useSelector(selectAllPost)

  const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))

  const renderedPosts = orderedPosts.map(post => (
    <article key={post.id}>
      <h3>{post.title}</h3>
      <p>{post.content.substring(0,100)}</p>

      <p className='postCredit'>
        <PostAuthor userId={post.userId} />
        <TimeAgo timestamp={post.date} />
      </p>
      <ReactionButtons post={post} />
    </article>
  ))
  return (
    <section>
      <h2>Posts</h2>
      {renderedPosts}
    </section>
  )
}

export default PostList