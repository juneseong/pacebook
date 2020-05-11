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

    json.likes do
        post.likes.each do |like|
            json.set! like.id do
                json.partial! "api/likes/like", like: like
            end
        end

        post.comments.each do |comment|
            comment.likes.each do |like|
                json.set! like.id do
                    json.partial! "api/likes/like", like: like
                end
            end
        end
    end

    json.comments do
        post.comments.each do |comment|
            json.set! comment.id do
                json.partial! "api/comments/comment", comment: comment
            end
        end
    end
end

json.post_ids @post_ids