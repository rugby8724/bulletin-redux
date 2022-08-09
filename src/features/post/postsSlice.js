// A function that accepts an initial state, an object full of reducer functions, and a "slice name", and automatically generates action creators and action types that correspond to the reducers and state.


import { createSlice, nanoid } from "@reduxjs/toolkit";
import { sub } from 'date-fns';

const initialState = [
  {
      id: '1',
      title: 'Learning Redux Toolkit',
      content: "I've heard good things.",
      date: sub(new Date(), { minutes: 10 }).toISOString(),
      reactions: {
          thumbsUp: 0,
          wow: 0,
          heart: 0,
          rocket: 0,
          coffee: 0
      }
  },
  {
      id: '2',
      title: 'Slices...',
      content: "The more I say slice, the more I want pizza.",
      date: sub(new Date(), { minutes: 5 }).toISOString(),
      reactions: {
          thumbsUp: 0,
          wow: 0,
          heart: 0,
          rocket: 0,
          coffee: 0
      }
  }
]

// Redux Toolkit's createReducer and createSlice automatically use Immer internally to let you write simpler immutable update logic using "mutating" syntax. This helps simplify most reducer implementations.
const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers:{
    postAdded: { 
      reducer(state, action){
      state.push(action.payload)
      },
      prepare(title, content, userId){
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            date: new Date().toISOString(), 
            userId,
            reactions: {
              thumbsUp: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              coffee: 0
            }
          }
        }
      }
    },
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload
      const existingPost = state.find(post => post.id === postId)
      if (existingPost) {
          existingPost.reactions[reaction]++
      }
  }
  }
})

export const selectAllPost = (state) => state.posts

// when we create reducer functions, create slice automatically genterates an action creator function with the same name 
// when we export our action, we are actually exporting the action creator function
export const {postAdded, reactionAdded} = postsSlice.actions

export default postsSlice.reducer