# README
[**Project Live**](https://pacebook-app.herokuapp.com/#/)

## Pacebook
Pacebook is a pixel-perfect Facebook clone built with React and Rails.

## Technologies
Pacebook is built with `Ruby on Rails` as the backend server and `React`, `Redux`, `JavaScript`, `HTML5` and `CSS3` as the frontend design. `AWS S3` was utilized to store user's profile and cover photos.

## Features
### 1. User Authentication
Users can sign up, sign in, log out.<br>
![pacebook-giphy1](https://user-images.githubusercontent.com/57915629/84531925-572e5880-acb3-11ea-8748-ce9d047c381a.gif)

### 2. Posts, Comments, Likes
Users can create and delete posts, comments or likes.
<br><br>
Polymorphic association was leveraged on posts and comments to implement likes for DRY code.
```ruby
# like.rb
belongs_to :likeable, polymorphic: true

# post.rb
has_many :likes, as: :likeable, dependent: :destroy

# comment.rb
has_many :likes, as: :likeable, dependent: :destroy
```

### 3. User Image Upload
Profile users can update their profile and cover photo.

### 4. Friending
Users can add, accept or delete other users as a friend.

### 5. Notifications
Users can receive friend requests and notifications for new posts, comments and likes.<br>
![pacebook-giphy5](https://user-images.githubusercontent.com/57915629/84535470-df176100-acb9-11ea-8839-70752624602b.gif)

### 6. User Search
Users can search for other users.<br>
![pacebook-giphy4](https://user-images.githubusercontent.com/57915629/84534786-90b59280-acb8-11ea-9de2-2acaf019c469.gif)
