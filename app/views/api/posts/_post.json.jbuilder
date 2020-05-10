json.extract! post, :id, :body, :user_id, :receiver_id, :like_ids
json.created_at post.created_at.strftime("%-B %-d, %-Y")