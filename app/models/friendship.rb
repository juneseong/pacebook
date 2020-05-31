# == Schema Information
#
# Table name: friendships
#
#  id           :bigint           not null, primary key
#  requester_id :integer          not null
#  requestee_id :integer          not null
#  status       :boolean          default(FALSE)
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#
class Friendship < ApplicationRecord
    validates :requestee_id, :requester_id, presence: true
    validates :status, inclusion: { in: [true, false] }

    belongs_to :requester,
        foreign_key: :requester_id,
        class_name: :User

    belongs_to :requestee,
        foreign_key: :requestee_id,
        class_name: :User
end