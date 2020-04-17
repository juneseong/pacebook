export const createLike = like => (
    $.ajax({
        type: "POST",
        url: "api/likes",
        data: like
    })
);

export const deleteLike = like => (
    $.ajax({
        type: "DELETE",
        url: `api/likes/${like.id}`,
        data: like
    })
);
