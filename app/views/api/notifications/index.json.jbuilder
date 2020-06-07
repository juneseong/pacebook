@notifications.each do |notification|
    json.notifications do
        json.set! notification.id do
            json.partial! "api/notifications/notification", notification: notification
        end
    end
end