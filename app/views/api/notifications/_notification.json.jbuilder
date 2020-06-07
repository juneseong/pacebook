json.extract! notification, :id, :notifiable_id, :read

if notification.notifiable_type == "Like"
    like = Like.find(notification.notifiable_id)
    likeable_type = like.likeable_type
    type = "Like_#{likeable_type}"
    user = User.find(like.user_id)
    
    if type == "Like_Post"
        post_id = like.likeable_id
        post_user_id = Post.find(post_id).receiver_id
    else
        post_id = Comment.find(like.likeable_id).post_id
        post_user_id = Post.find(post_id).receiver_id
    end
else
    type = notification.notifiable_type

    if type == "Post"
        post = Post.find(notification.notifiable_id)
        post_id = post.id
        post_user_id = Post.find(post_id).receiver_id
        user = User.find(post.user_id)
    elsif type == "Comment"
        comment = Comment.find(notification.notifiable_id)
        user = User.find(comment.user_id)
        post_id = comment.post_id
        post_user_id = Post.find(post_id).receiver_id
    else
        friendship = Friendship.find(notification.notifiable_id)
        user = User.find(friendship.requester_id)
        post_id = nil
        post_user_id = nil
    end 
end

json.type type
json.sender_name "#{user.first_name.capitalize} #{user.last_name.capitalize}"
json.sender_id user.id
json.post_id post_id
json.post_user_id post_user_id

if user.profile_img.attached?
    json.sender_img url_for(user.profile_img)
else
    nil
end