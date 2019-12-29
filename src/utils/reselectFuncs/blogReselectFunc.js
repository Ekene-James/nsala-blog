import { createSelector } from "reselect";
const selectBlog = state => state.blog;
export const selectLoading = createSelector(
  [selectBlog],
  blog => blog.loading
);
export const selectButtonloading = createSelector(
  [selectBlog],
  blog => blog.Buttonloading
);

export const selectBlogData = createSelector(
  [selectBlog],
  blog => blog.blogData
);

export const selectRelatedBlogs = createSelector(
  [selectBlog],
  blog => blog.relatedBlogs
);

export const selectSideBarData = createSelector(
  [selectBlog],
  blog => blog.sideBarData
);

export const selectSingleBlogPost = createSelector(
  [selectBlog],
  blog => blog.singleBlogPost
);

export const selectComments = createSelector(
  [selectBlog],
  blog => blog.comments
);

export const selectBlogTotal = createSelector(
  [selectBlog],
  blog => blog.blogTotal
);

export const selectCategory = createSelector(
  [selectBlog],
  blog => blog.category
);
export const selectSearch = createSelector(
  [selectBlog],
  blog => blog.search
);
export const selectCounter = createSelector(
  [selectBlog],
  blog => blog.counter
);
