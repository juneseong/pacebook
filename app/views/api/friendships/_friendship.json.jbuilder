json.extract! friendship, :id, :status, :requester_id, :requestee_id

requestee = friendship.requestee
requester = friendship.requester

requestee_name = requestee.first_name.capitalize + " " + requestee.last_name.capitalize
requester_name = requester.first_name.capitalize + " " + requester.last_name.capitalize

json.requestee_name requestee_name
json.requester_name requester_name

if requestee.profile_img.attached?
    json.requestee_img url_for(requestee.profile_img)
else
    nil
end

if requester.profile_img.attached?
    json.requester_img url_for(requester.profile_img)
else
    nil
end