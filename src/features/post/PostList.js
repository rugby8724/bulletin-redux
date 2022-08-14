// useSeletor is a hook to access the redux store's state. This hook takes a selector function as an argument. The selector is called with the store state.
// This hook takes an optional equality comparison function as the second parameter that allows you to customize the way the selected state is compared to determine whether the component needs to be re-rendered.
import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import { selectAllPosts, getPostsStatus, getPostsError, fetchPosts } from './postsSlice';
import { useEffect } from 'react';
import PostsExcerpt from './PostsExcerpt';


const PostList = () => {
  const dispatch = useDispatch()

  const posts = useSelector(selectAllPosts);
  const postStatus = useSelector(getPostsStatus);
  const error = useSelector(getPostsError);

  useEffect(() => {
    if (postStatus === 'idle') {
        dispatch(fetchPosts())
    }
  }, [postStatus, dispatch])

  let content;
  if (postStatus === 'loading') {
      content = <p>"Loading..."</p>;
  } else if (postStatus === 'succeeded') {
      const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))
      content = orderedPosts.map(post => <PostsExcerpt key={post.id} post={post} />)
  } else if (postStatus === 'failed') {
      content = <p>{error}</p>;
  }

  return (
      <section>
          <h2>Posts</h2>
          {content}
      </section>
  )

}

export default PostList