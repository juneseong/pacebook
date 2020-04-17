class Api::LikesController < ApplicationController
    before_action :ensure_logged_in

    def create
        @like = Like.new(like_params)

        if @like.save
            render :show
        end
    end

    def destroy
        @like = Like.find(params[:like][:id].to_i) 

        if @like 
            @like.destroy
            render :show
        end
    end

    def show
        @like = Like.find(params[:id])
    end

    def like_params 
        params.require(:like).permit(:user_id, :likeable_id, :emoji_type, :likeable_type)
    end
end