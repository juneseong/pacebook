json.extract! post, :id, :body, :user_id, :receiver_id, :like_ids, :comment_ids

minutes = (Time.now - post.created_at).to_i / 60

if minutes < 1
    date_time = "Just Now"
elsif minutes == 1
    date_time = "1 min"
elsif minutes > 1 && minutes < 60
    date_time = "#{minutes} mins"
elsif minutes >= 60 && minutes < 120
    date_time = "1 hr"
elsif minutes >= 120 && minutes < 1440
    date_time = "#{minutes / 60} hrs"
elsif minutes >= 1440 && minutes < 2880
    date_time = post.created_at.strftime("Yesterday at %l:%M %p")
elsif minutes >= 2880 && minutes < 43800
    date_time = post.created_at.strftime("%-B %-d at %l:%M %p")
elsif minutes >= 43800 && minutes < 525600
    date_time = post.created_at.strftime("%-B %-d")
else
    date_time = post.created_at.strftime("%-B %-d, %-Y")
end

json.created_at date_time