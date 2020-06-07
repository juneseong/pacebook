class Api::NotificationsController < ApplicationController
    before_action :ensure_logged_in

    def create
        @notification = Notification.new(notification_params)

        if @notification.save
            render :show
        end
    end

    def index
        @notifications = Notification.find_by(user_id: current_user.id)
    end

    def show
        @notification = Notification.find(params[:id])
    end

    def update
        @notification = Notification.find(params[:id])
        
        if @notification.update(read: true)
            render :show
        end
    end

    def notification_params 
        params.require(:notification).permit(:user_id, :notifiable_id, :read, :notifiable_type)
    end
end