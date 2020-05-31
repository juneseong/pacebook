class Api::FriendshipsController < ApplicationController
    before_action :ensure_logged_in

    def create
        @friendship = Friendship.new(friendship_params)
        
        if @friendship.save
            render :show
        end
    end

    def show
        @friendship = Friendship.find(params[:id])
    end

    def update
        @friendship = Friendship.find(params[:id])

        if @friendship.update(status: true)
            render :show
        end
    end
    
    def destroy
        @friendship = Friendship.find_by(requester_id: params[:friendship][:requestee_id], requestee_id: current_user.id) || Friendship.find_by(requester_id: current_user.id, requestee_id: params[:friendship][:requestee_id])
        
        if @friendship
            @friendship.destroy
            render :show
        end
    end

    private
    def friendship_params
        params.require(:friendship).permit(:requestee_id, :requester_id, :status)
    end
end