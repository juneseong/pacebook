json.partial! "/api/users/user", user: @user

@user.received_posts.includes(:receiver).each do |post|
    json.receivers do
        json.set! post.receiver.id do
            json.extract! post.receiver, :id, :first_name, :last_name
        end
    end
end