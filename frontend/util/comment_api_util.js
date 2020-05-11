export const createComment = (postId, comment) => 
    $.ajax({
        url: `/api/posts/${postId}/comments`,
        method: "POST",
        data: comment
    });

export const deleteComment = commentId =>
    $.ajax({
        url: `/api/comments/${commentId}`,
        method: "DELETE"
    });