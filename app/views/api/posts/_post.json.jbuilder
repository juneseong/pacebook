json.extract! post, :id, :body, :user_id, :receiver_id
json.created_at post.created_at.strftime("%-B %-d, %-Y")

json.likes do
    post.likes.each do |like|
        json.set! like.user_id do
            json.partial! "api/likes/like", like: like
        end
    end
end