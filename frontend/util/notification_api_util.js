export const readNotification = id => (
    $.ajax({
        url: `/api/notifications/${id}`,
        method: "PATCH",
    })
);