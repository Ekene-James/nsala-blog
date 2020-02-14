import {
  GET_DATA_FROM_FIREBASE,
  IS_LOADING,
  GET_SINGLE_BLOG_POST,
  BUTTON_LOADING,
  BUTTON_SUCCESS,
  GET_COMMENTS,
  GET_SIDEBAR_DATA,
  GET_BLOG_TOTAL,
  ADD_COUNTER,
  REDUCE_COUNTER,
  GET_CATEGORY,
  GET_SEARCH,
  ADD_COMMENT,
  GET_RELATED_BLOGS,
  GET_PROFILE_INFO
} from "../../type";

const initialState = {
  loading: false,
  Buttonloading: false,

  blogData: [],
  sideBarData: [],
  singleBlogPost: {},
  comments: [],
  blogTotal: {},
  category: [],
  search: [],
  relatedBlogs: [],
  counter: 0,
  user: ""
};
const blogReducer = (state = initialState, action) => {
  switch (action.type) {
    case IS_LOADING: {
      return {
        ...state,
        loading: true
      };
    }
    case GET_PROFILE_INFO: {
      return {
        ...state,
        user: action.payload,
        loading: false
      };
    }
    case ADD_COUNTER: {
      return {
        ...state,
        counter: ++state.counter
      };
    }

    case REDUCE_COUNTER: {
      return {
        ...state,
        counter: --state.counter
      };
    }
    case GET_SEARCH: {
      return {
        ...state,
        loading: false,
        search: action.payload
      };
    }
    case GET_CATEGORY: {
      return {
        ...state,
        loading: false,
        counter: 0,
        category: action.payload
      };
    }
    case GET_DATA_FROM_FIREBASE: {
      return {
        ...state,
        blogData: action.payload,
        loading: false
      };
    }
    case GET_SIDEBAR_DATA: {
      return {
        ...state,
        sideBarData: action.payload
      };
    }

    case GET_SINGLE_BLOG_POST: {
      return {
        ...state,
        singleBlogPost: action.payload,
        loading: false
      };
    }
    case ADD_COMMENT: {
      return {
        ...state,
        comments: [...state.comments, action.payload]
      };
    }
    case GET_COMMENTS: {
      return {
        ...state,
        comments: action.payload
      };
    }
    case GET_RELATED_BLOGS: {
      return {
        ...state,
        relatedBlogs: action.payload
      };
    }
    case BUTTON_LOADING: {
      return {
        ...state,
        Buttonloading: true
      };
    }
    case BUTTON_SUCCESS: {
      return {
        ...state,
        Buttonloading: false
      };
    }
    case GET_BLOG_TOTAL: {
      return {
        ...state,
        blogTotal: action.payload
      };
    }

    default:
      return state;
  }
};
export default blogReducer;
