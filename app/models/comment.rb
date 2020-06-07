# == Schema Information
#
# Table name: comments
#
#  id                :bigint           not null, primary key
#  body              :text             not null
#  parent_comment_id :integer
#  user_id           :integer          not null
#  post_id           :integer          not null
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#
class Comment < ApplicationRecord
    validates :user_id, :post_id, :body, presence: true
    after_create :create_notification

    belongs_to :user,
        foreign_key: :user_id,
        class_name: :User

    belongs_to :post,
        foreign_key: :post_id,
        class_name: :Post,
        optional: true

    has_many :likes, as: :likeable, dependent: :destroy
    has_one :notification, as: :notifiable, dependent: :destroy

    def create_notification
        if self.post.user_id != self.user_id
            Notification.create(user_id: self.post.user_id, notifiable_id: self.id, notifiable_type: "Comment")
        end
    end
end