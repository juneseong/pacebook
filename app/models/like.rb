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

    belongs_to :likeable, polymorphic: true

    belongs_to :user,
        foreign_key: :user_id,
        class_name: :User
end
