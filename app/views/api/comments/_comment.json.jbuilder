json.extract! comment, :id, :body, :user_id, :post_id

json.first_name comment.user.first_name.capitalize
json.last_name comment.user.last_name.capitalize