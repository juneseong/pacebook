@users.each do |user|
    full_name = "#{user.first_name.downcase} #{user.last_name.downcase}"
    json.users do
        json.set! user.id do
            json.id user.id
            json.name full_name
        end
    end
end