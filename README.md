# README
[**Project Live**](https://pacebook-app.herokuapp.com/#/)

## Pacebook
Pacebook is a pixel perfect Facebook clone website with posts, comments, likes, image upload, friending and notification functions.

## Technologies
Pacebook is built with `Ruby on Rails` as the backend server and `React`, `Redux`, `JavaScript`, `HTML5` and `CSS3` as the frontend design. `AWS S3` was utilized to store user's profile and cover photos.

## Features
### 1. User Authentication
![pacebook-giphy1](https://user-images.githubusercontent.com/57915629/84531925-572e5880-acb3-11ea-8748-ce9d047c381a.gif)
<br>
Users can sign up, sign in and sign out. Form validation was implemented so users can see error messages next to the corresponding input field.

### 2. Posts, Comments, Likes
Users can create and delete posts, comments or likes.
```ruby
# like.rb
belongs_to :likeable, polymorphic: true

# post.rb
has_many :likes, as: :likeable, dependent: :destroy

# comment.rb
has_many :likes, as: :likeable, dependent: :destroy
```
Polymorphic association was leveraged on posts and comments to implement likes for DRY code.

### 3. User Image Upload
Profile users can update their profile and cover photo.

### 4. Friending
Users can add, accept or delete other users as a friend.

### 5. Notifications
![pacebook-giphy5](https://user-images.githubusercontent.com/57915629/84535470-df176100-acb9-11ea-8839-70752624602b.gif)
<br>
Users can receive notifications for new friend requests, posts, comments and likes.

```ruby
# notification.rb
belongs_to :notifiable, polymorphic: true

# post.rb
after_create :create_notification
has_one :notification, as: :notifiable, dependent: :destroy

def create_notification
    if self.user_id != self.receiver_id
        Notification.create(
            user_id: self.receiver_id, 
            notifiable_id: self.id, 
            notifiable_type: "Post")
    end
end
```
Polymorphic association was leveraged on posts, comments, likes and friending to implement notifications for DRY code. `create_notification` is called after post, comment, like or friendship is created.

### 6. User Search
Users can search for other users using the search bar.
