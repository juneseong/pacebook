json.extract! like, :id, :user_id, :emoji_type, :likeable_type, :likeable_id
json.first_name like.user.first_name.capitalize()
json.last_name like.user.last_name.capitalize()