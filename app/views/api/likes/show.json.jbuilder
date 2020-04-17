json.likes do 
    json.set! @like.user_id do 
        json.partial! 'api/likes/like', like: @like 
    end
end

json.user do 
    json.set! @like.user_id do
        json.partial! 'api/users/user', user: User.find(@like.user_id)
    end
end