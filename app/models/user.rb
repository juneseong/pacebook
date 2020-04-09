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
class User < ApplicationRecord
    validates :password_digest, :first_name, :last_name, presence: true
    validates :email, :session_token, presence: true, uniqueness: true
    validates :password, length: { minimum: 6 }, allow_nil: true
    validates :birth_date, :gender, presence: true

    attr_reader :password
    after_initialize :ensure_session_token

    has_many :posts,
        foreign_key: :user_id,
        class_name: :Post

    has_many :comments,
        foreign_key: :user_id,
        class_name: :Comment

    has_many :likes,
        foreign_key: :user_id,
        class_name: :Like

    has_many :requesters,
        foreign_key: :requester_id,
        class_name: :Friendship

    has_many :requestees,
        foreign_key: :requestee_id,
        class_name: :Friendship

    def self.generate_session_token
        SecureRandom.urlsafe_base64
    end

    def self.find_by_credentials(email, password)
        user = User.find_by(email: email)
        return nil unless user && user.is_password?(password)
        return user
    end

    def password=(password)
        @password = password
        self.password_digest = BCrypt::Password.create(password)
    end

    def is_password?(password)
        bcrypt_password = BCrypt::Password.new(self.password_digest)
        bcrypt_password.is_password?(password)
    end

    def ensure_session_token
        self.session_token ||= User.generate_session_token
    end

    def reset_session_token!
        self.update!(session_token: User.generate_session_token)
        self.session_token
    end
end
