json.extract! user, :id, :email, :birth_date, :gender, :bio, :school, :work, :city, :state, :profile_img, :cover_img, :requests_sent_ids, :requests_received_ids

json.first_name user.first_name.capitalize
json.last_name user.last_name.capitalize
json.city user.city ? user.city.split(" ").map(&:capitalize).join(" ") : user.city
json.state user.state ? user.state.split(" ").map(&:capitalize).join(" ") : user.state
json.school user.school ? user.school.split(" ").map(&:capitalize).join(" ") : user.school
json.work user.work ? user.work.split(" ").map(&:capitalize).join(" ") : user.work

received_post_ids = user.received_posts.order(updated_at: :desc).pluck(:id)
json.received_post_ids received_post_ids

json.birth_date user.birth_date.strftime("%-B %-d, %-Y")
json.created_at user.created_at.strftime("%-B %-d, %-Y")

if user.profile_img.attached?
    json.profile_img url_for(user.profile_img)
else
    nil
end

if user.cover_img.attached?
    json.cover_img url_for(user.cover_img)
else
    nil
end