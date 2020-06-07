# == Schema Information
#
# Table name: notifications
#
#  id              :bigint           not null, primary key
#  notifiable_type :string
#  notifiable_id   :bigint
#  read            :boolean          default(FALSE), not null
#  user_id         :integer          not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class Notification < ApplicationRecord
    validates :user_id, presence: true
    validates :read, inclusion: { in: [true, false] }

    belongs_to :notifiable, polymorphic: true

    belongs_to :user,
        foreign_key: :user_id,
        class_name: :User
end