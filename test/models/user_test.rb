# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  email           :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  first_name      :string           not null
#  last_name       :string           not null
#  birth_date      :datetime         not null
#  gender          :string           not null
#  school          :string
#  work            :string
#  bio             :text
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  city            :string
#  state           :string
#
require 'test_helper'

class UserTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
