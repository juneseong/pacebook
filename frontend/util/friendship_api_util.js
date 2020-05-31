export const addFriend = friendship => (
    $.ajax({
        type: "POST",
        url: "api/friendships",
        data: { friendship }
    })
);

export const acceptFriend = friendship => (
    $.ajax({
        type: "PATCH",
        url: `api/friendships/${friendship.id}`,
        data: { friendship }
    })
);

export const deleteFriend = friendship => (
    $.ajax({
        type: "DELETE",
        url: `api/friendships/${friendship.id}`,
        data: { friendship }
    })
);