json.extract! comment, :id, :body, :user_id, :post_id, :like_ids
json.first_name comment.user.first_name.capitalize()
json.last_name comment.user.last_name.capitalize()

if comment.user.profile_img.attached?
    json.profile_img url_for(comment.user.profile_img)
else
    nil
end