# CS260-startup
[Notes](/notes.md)

## BOM Forum

### Elevator pitch
Do you love the Book of Mormon? What is your favorite verse/chapter? Imagine yourself just read a verse and really want to share your reflection or testimony about it. Probably you also want to know what others think about this verse. You do not have to go the church to do all that. Now with BOM Forum, you can easily post your thoughts about the BOM online and view others' comments. Whether it is a verse or a chapter or a character in the BOM that you have opinions about, post them online and see how others think about it.

### Design
![The main page.](/assets/startup_designs/main_page.jpg)
![The login page.](/assets/startup_designs/login_page.jpg)

### Key features
- Secure login over HTTPS
- Ability to select the verse/chapter to post comment on
- Ability to view others' comments
- Chronological/random ordering of all the comments
- Comments are persistently stored
- Ability for admin to delete user comments

### Technologies
- Authentication: users need to register/login before they can enter the main page. Registration and login functionalities will be implemented.
- Database data: all the comments posted by users will be stored in a database.
- WebSocket data: the website can retrieve the latest comments every time another user posts

### HTML deliverable
- HTML pages - Four html files that represent the ability to login, post/view others' posts, and view historical posts.
- Links - Login page's button links to the Forum page; every page has a menu that links to every other page.
- App textual content - Others' posts and textual content in the About page.
- Third-party service call - Random scripture pulled from 3rd-party api in the About page.
- App image - A logo of the website can be found in the About page.
- Login placeholder - Login placeholder is in the Home page. User's name is displayed next to the menu after logging in.
- Database data placeholder - Historical posts found in the My Posts page represent the use of database data.
- Websocket data placeholder - Others' posts in the Forum page will be updated anytime a user submit a new post. It shows the use of websocket data.
