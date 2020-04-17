@users.each do |user|
    json.users do
        json.set! user.id do
            json.partial! "api/users/user", user: user
        end
    end
end

@posts.each do |post|
    json.posts do
        json.set! post.id do
            json.partial! "api/posts/post", post: post
        end
    end
end

json.post_ids @post_ids