# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all
Post.destroy_all
Like.destroy_all
Comment.destroy_all

user1 = User.create!(email: "jyjseong@gmail.com", password: "123456", first_name: "june", last_name: "seong", birth_date: DateTime.new(1993,6,25), gender: "F", school: "App Academy", work: "App Academy", bio: "I am a software engineer based in New York", city: "Flushing", state: "New York")
user2 = User.create!(email: "ken@gmail.com", password: "123456", first_name: "ken", last_name: "ting", birth_date: DateTime.new(1993,9,15), gender: "M", bio: "I <3 Koba")
user3 = User.create!(email: "hae@gmail.com", password: "123456", first_name: "haejun", last_name: "chung", birth_date: DateTime.new(1992,2,10), gender: "M")
user4 = User.create!(email: "christina@gmail.com", password: "123456", first_name: "christina", last_name: "hulee", birth_date: DateTime.new(1991,1,1), gender: "F")
user5 = User.create!(email: "koba@gmail.com", password: "123456", first_name: "koba", last_name: "inu", birth_date: DateTime.new(2010,1,1), gender: "M")

user3.profile_img.attach(io:open("https://pacebook-seed.s3.amazonaws.com/image/hae.jpeg"), filename:"hae.jpeg")
user2.profile_img.attach(io:open("https://pacebook-seed.s3.amazonaws.com/image/ken.jpg"), filename:"ken.jpg")
user5.profile_img.attach(io:open("https://pacebook-seed.s3.amazonaws.com/image/koba.jpg"), filename:"koba.jpg")
user5.cover_img.attach(io:open("https://pacebook-seed.s3.amazonaws.com/image/koba.jpg"), filename:"koba.jpg")
user1.profile_img.attach(io:open("https://pacebook-seed.s3.amazonaws.com/image/image.jpg"), filename:"june.jpg")
user1.cover_img.attach(io:open("https://pacebook-seed.s3.amazonaws.com/image/cloud.jpg"), filename:"cloud.jpg")

post9 = Post.create!(body: "welcome to Pacebook!", user_id: user1.id, receiver_id: user1.id)
post8 = Post.create!(body: "hi all. thanks for visiting.", user_id: user1.id, receiver_id: user1.id)
post3 = Post.create!(body: "hello world!", user_id: user1.id, receiver_id: user1.id)
post1 = Post.create!(body: "hi koba ;)", user_id: user2.id, receiver_id: user5.id)
post4 = Post.create!(body: "hi christina!", user_id: user3.id, receiver_id: user4.id)
post10 = Post.create!(body: "search feature now works.", user_id: user1.id, receiver_id: user1.id)
post5 = Post.create!(body: "woof!", user_id: user5.id, receiver_id: user2.id)
post6 = Post.create!(body: "users can now receive notifications.", user_id: user1.id, receiver_id: user1.id)
post7 = Post.create!(body: "hi june!", user_id: user3.id, receiver_id: user1.id)

like1 = Like.create!(likeable_type: "Post", likeable_id: post5.id, emoji_type: "Love", user_id: user2.id)
like2 = Like.create!(likeable_type: "Post", likeable_id: post3.id, emoji_type: "Like", user_id: user2.id)
like3 = Like.create!(likeable_type: "Post", likeable_id: post3.id, emoji_type: "Like", user_id: user3.id)
like4 = Like.create!(likeable_type: "Post", likeable_id: post3.id, emoji_type: "Haha", user_id: user4.id)
like5 = Like.create!(likeable_type: "Post", likeable_id: post1.id, emoji_type: "Love", user_id: user5.id)
like7 = Like.create!(likeable_type: "Post", likeable_id: post5.id, emoji_type: "Like", user_id: user1.id)
like8 = Like.create!(likeable_type: "Post", likeable_id: post5.id, emoji_type: "Like", user_id: user3.id)
like9 = Like.create!(likeable_type: "Post", likeable_id: post7.id, emoji_type: "Like", user_id: user1.id)
like10 = Like.create!(likeable_type: "Post", likeable_id: post8.id, emoji_type: "Love", user_id: user1.id)
like11 = Like.create!(likeable_type: "Post", likeable_id: post10.id, emoji_type: "Like", user_id: user3.id)

comment3 = Comment.create!(body: "what a cute dog!", user_id: user1.id, post_id: post5.id)
comment5 = Comment.create!(body: "so cool", user_id: user4.id, post_id: post6.id)
comment6 = Comment.create!(body: "awesome", user_id: user2.id, post_id: post6.id)
comment7 = Comment.create!(body: "awesome!", user_id: user3.id, post_id: post10.id)

like11 = Like.create!(likeable_type: "Comment", likeable_id: comment5.id, emoji_type: "Like", user_id: user1.id)
like12 = Like.create!(likeable_type: "Comment", likeable_id: comment6.id, emoji_type: "Like", user_id: user1.id)

friendship1 = Friendship.create!(requestee_id: user1.id, requester_id: user2.id, status: true)
friendship2 = Friendship.create!(requestee_id: user1.id, requester_id: user3.id, status: true)
friendship3 = Friendship.create!(requestee_id: user1.id, requester_id: user4.id, status: false)
friendship4 = Friendship.create!(requestee_id: user1.id, requester_id: user5.id, status: true)
friendship5 = Friendship.create!(requestee_id: user2.id, requester_id: user3.id, status: true)
friendship6 = Friendship.create!(requestee_id: user3.id, requester_id: user4.id, status: true)
friendship7 = Friendship.create!(requestee_id: user2.id, requester_id: user5.id, status: true)
friendship8 = Friendship.create!(requestee_id: user2.id, requester_id: user4.id, status: true)