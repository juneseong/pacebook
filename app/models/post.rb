# == Schema Information
#
# Table name: posts
#
#  id          :bigint           not null, primary key
#  body        :text             not null
#  user_id     :integer          not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  receiver_id :integer
#
class Post < ApplicationRecord
    validates :body, :user_id, :receiver_id, presence: true
    after_create :create_notification

    belongs_to :user,
        foreign_key: :user_id,
        class_name: :User

    belongs_to :receiver,
        foreign_key: :receiver_id,
        class_name: :User

    has_many :comments,
        foreign_key: :post_id,
        class_name: :Comment,
        dependent: :destroy

    has_many :likes, 
        as: :likeable,
        dependent: :destroy

    has_one :notification, as: :notifiable, dependent: :destroy

    def create_notification
        if self.user_id != self.receiver_id
            Notification.create(user_id: self.receiver_id, notifiable_id: self.id, notifiable_type: "Post")
        end
    end
end
