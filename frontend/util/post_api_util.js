export const fetchPosts = userId =>
  $.ajax({
    url: `api/users/${userId}/posts`,
    method: "GET"
  });

export const fetchAllPosts = () =>
  $.ajax({
    url: `api/posts`,
    method: "GET"
  });

export const fetchPost = postId =>
  $.ajax({
    url: `/api/posts/${postId}`,
    method: "GET",
  });

export const createPost = (userId, formData) => 
  $.ajax({
    url: `/api/users/${userId}/posts`,
    method: "POST",
    data: formData,
    contentType: false,
    processData: false
  });

export const deletePost = postId =>
  $.ajax({
    url: `/api/posts/${postId}`,
    method: "DELETE"
  });

export const updatePost = post =>
  $.ajax({
    url: `/api/posts/${post.id}`,
    method: "PATCH",
    data: { post }
  });