# == Schema Information
#
# Table name: posts
#
#  id         :bigint           not null, primary key
#  body       :text             not null
#  user_id    :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Post < ApplicationRecord
    validates :body, :user_id, presence: true

    belongs_to :user,
        foreign_key: :user_id,
        class_name: :User

    has_many :comments,
        foreign_key: :post_id,
        class_name: :Post,
        dependent: :destroy

    has_many :likes, 
        as: :likeable,
        dependent: :destroy
end