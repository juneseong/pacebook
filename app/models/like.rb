# == Schema Information
#
# Table name: likes
#
#  id            :bigint           not null, primary key
#  likeable_type :string
#  likeable_id   :bigint
#  emoji_type    :string           not null
#  user_id       :integer          not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#
class Like < ApplicationRecord
    EMOJIS = ["Like", "Love", "Haha", "Yay", "Wow", "Sad", "Angry"]
    validates :user_id, presence: true
    validates :emoji_type, inclusion: { in: EMOJIS }
    after_create :create_notification

    belongs_to :likeable, polymorphic: true

    belongs_to :user,
        foreign_key: :user_id,
        class_name: :User

    has_one :notification, as: :notifiable, dependent: :destroy

    def create_notification
        if self.user_id != self.likeable.user_id
            Notification.create(user_id: self.likeable.user_id, notifiable_id: self.id, notifiable_type: "Like")
        end
    end
end
