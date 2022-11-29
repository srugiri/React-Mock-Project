import {
  GET_ALL_BLOGS,
  STORE_ALL_BLOGS,
  GET_BLOG_COMMENTS,
  STORE_BLOG_COMMENTS,
  GET_BLOG,
  STORE_BLOG,
  GET_USERS,
  STORE_USERS,
  GET_CATEGORIES,
  STORE_CATEGORIES,
  GET_CATEGORY_BLOGS,
  STORE_CATEGORY_BLOGS,
  GET_SEARCH_BLOGS,
  STORE_SEARCH_BLOGS,
  GET_USER,
  STORE_USER,
  GET_MY_BLOGS,
  STORE_MY_BLOGS,
} from "../actionType";

export const getAllBlogs = (id, userId, page) => async (dispatch) => {
  let apiUrl = `http://localhost:3000/blogs?_sort=id&_order=desc&_page=${page}&_limit=4`;
  let response = await fetch(apiUrl);
  let data = await response.json();

  dispatch({
    type: GET_ALL_BLOGS,
    payload: data,
  });

  dispatch({
    type: STORE_ALL_BLOGS,
    payload: data,
  });
};

export const getMyBlogs = (id,page) => async (dispatch) => {
  let apiUrl = `http://localhost:3000/blogs?blogger_id=${id}&_page=${page}&_limit=4`;
  let response = await fetch(apiUrl);
  let data = await response.json();

  dispatch({
    type: GET_MY_BLOGS,
    payload: data,
  });

  dispatch({
    type: STORE_MY_BLOGS,
    payload: data,
  });
};

export const getComments = (id) => async (dispatch) => {
  let apiUrl = `http://localhost:3000/blog_details/${id}`;
  let response = await fetch(apiUrl);
  let data = await response.json();
  console.log(data);
  dispatch({
    type: GET_BLOG_COMMENTS,
    payload: data,
  });
  dispatch({
    type: STORE_BLOG_COMMENTS,
    payload: data,
  });
};

export const getBlog = (id) => async (dispatch) => {
  let apiUrl = `http://localhost:3000/blogs/${id}`;
  let res = await fetch(apiUrl);
  let data = await res.json();
  // console.log(data)
  dispatch({
    type: GET_BLOG,
    payload: data,
  });
  dispatch({
    type: STORE_BLOG,
    payload: data,
  });
};

export const getUsers = (id) => async (dispatch) => {
  let api_url = `http://localhost:3000/users`;
  let response = await fetch(api_url);
  let data = await response.json();
  // console.log(data)
  dispatch({
    type: GET_USERS,
    payload: data,
  });
  dispatch({
    type: STORE_USERS,
    payload: data,
  });
};

export const getCategory = () => async (dispatch) => {
  let api_url = `http://localhost:3000/category`;
  let response = await fetch(api_url);
  let data = await response.json();
  // console.log(data);

  dispatch({
    type: GET_CATEGORIES,
    payload: data,
  });

  dispatch({
    type: STORE_CATEGORIES,
    payload: data,
  });
};

export const getCategoryBlogs = (category) => async (dispatch) => {
  let api_url = `http://localhost:3000/blogs/?category_like=${category}`;
  let response = await fetch(api_url);
  let data = await response.json();
  // console.log(data)
  dispatch({
    type: GET_CATEGORY_BLOGS,
    payload: data,
  });
  dispatch({
    type: STORE_CATEGORY_BLOGS,
    payload: data,
  });
};

export const getSearchBlogs = (title) => async (dispatch) => {
  let api_url = `http://localhost:3000/blogs/?title_like=${title}`;
  let response = await fetch(api_url);
  let data = await response.json();
  console.log(data);
  dispatch({
    type: GET_SEARCH_BLOGS,
    payload: data,
  });

  dispatch({
    type: STORE_SEARCH_BLOGS,
    payload: data,
  });
};

export const getUser = (id) => async (dispatch) => {
  let api_url = `http://localhost:3000/users/${id}`;
  let response = await fetch(api_url);
  let data = await response.json();
  // console.log(data);
  dispatch({
    type: GET_USER,
    payload: data,
  });
  dispatch({
    type: STORE_USER,
    payload: data,
  });
};
