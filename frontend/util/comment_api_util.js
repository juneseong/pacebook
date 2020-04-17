export const createComment = (postId, formData) =>
    $.ajax({
        url: `/api/posts/${postId}/comments`,
        method: "POST",
        data: formData
    });

export const deleteComment = commentId =>
    $.ajax({
        url: `/api/comments/${commentId}`,
        method: "DELETE"
    });