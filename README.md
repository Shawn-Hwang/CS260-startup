# CS260-startup
[Notes](/notes.md)

## BOM Forum

### Elevator pitch
Do you love the Book of Mormon? What is your favorite verse/chapter? Imagine yourself just read a verse and really want to share your reflection or testimony about it. Probably you also want to know what others think about this verse. You do not have to go the church to do all that. Now with BOM Forum, you can easily post your thoughts about the BOM online and view others' comments. Whether it is a verse or a chapter or a character in the BOM that you have opinions about, post them online and see how others think about it.

### Design
![Under development: Design of the website.]()

### Key features
- Secure login over HTTPS
- Ability to select the verse/chapter to post comment on
- Ability to view others' comments### Technologies
- Chronological/random ordering of all the comments
- Comments are persistently stored
- Ability for admin to delete user comments

### Technologies
- Authentication: users need to register/login before they can enter the main page. Registration and login functionalities will be implemented.
- Database data: all the comments posted by users will be stored in a database.
- WebSocket data: the website can retrieve the latest comments every time another user posts
