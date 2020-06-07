import * as NotificationUtils from "../util/notification_api_util";

export const RECEIVE_NOTIFICATION = "RECEIVE_NOTIFICATION";

const receiveNotification = notification => ({
    type: RECEIVE_NOTIFICATION,
    notification
});

export const readNotification = id => dispatch => (
    NotificationUtils.readNotification(id).then(notification => dispatch(receiveNotification(notification)))
);