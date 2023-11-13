class Post {

    constructor() {
        const userNameEl = document.querySelector('.username');
        userNameEl.textContent = this.getUserName();
    }

    newPost() {

        // First, read post content from input area
        const postContent = this.readPostFromInput();

        // Second, add post to all the posts (database)
        this.savePost(postContent);

        // Third, add the new post to the "What others are saying..." section
        this.addPostToDisplay(postContent);

    }

    // read the text from the input area
    readPostFromInput() {
        const postEL = document.querySelector("#post_box");
        return postEL.value;
    }

    // Save post to all posts (database) and update localStorage
    savePost(post) {
        const userName = this.getUserName();
        let posts = [];
        const postsText = localStorage.getItem('posts');
        if (postsText) {
            posts = JSON.parse(postsText);
        }
        posts = this.updatePosts(userName, post, posts);

        localStorage.setItem('posts', JSON.stringify(posts));

    }

    // Add the new post to all posts, helper func for savePost()
    updatePosts(userName, post, posts) {
        const date = new Date().toLocaleDateString();
        const newPost = { name: userName, post: post, date: date };
        
        posts.push(newPost)
        return posts;
    }

    // Add the new post to the "What others are saying..." section
    addPostToDisplay(post) {
        const userName = this.getUserName();

        const table = document.querySelector('#comment_table');

        // Insert a new row at the end of the table
        const newRow = table.insertRow(0);

        // Set the background color of the new row to blue
        newRow.style.backgroundColor = "blue";

        // Add two cells to the new row
        const cell1 = newRow.insertCell();
        const cell2 = newRow.insertCell();

        // Set the text color of the cells to blue
        cell1.style.color = "blue";
        cell2.style.color = "blue";

        // Set the content of the cells
        cell1.innerHTML = userName;
        cell2.innerHTML = post;
    }

    getUserName() {
        return localStorage.getItem('userName') ?? 'Mystery user';
    }
}

const post = new Post();

function generateRandomString() {
    const length = Math.floor(Math.random() * (100 - 50 + 1)) + 50;
    const characters = 'ABCDEFGHI JKLMNOPQRSTUVWX YZabcdefghijk lmnopqrstuvwxyz0123456789 ,';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

function generateRandomName() {
    const firstNames = ["Alice", "Bob", "Charlie", "David", "Eve", "Frank", "Grace", "Henry", "Isabella", "Jack", "Kate", "Liam", "Mia", "Nathan", "Olivia", "Peter", "Quinn", "Rachel", "Sophia", "Thomas", "Ursula", "Victoria", "William", "Xander", "Yvonne", "Zachary"];
    const lastNames = ["Adams", "Brown", "Carter", "Davis", "Edwards", "Fisher", "Garcia", "Hernandez", "Ishida", "Johnson", "Kim", "Lee", "Martinez", "Nguyen", "O'Brien", "Patel", "Quinnell", "Rodriguez","Smith","Taylor","Ueda","Vargas","Williams","Xu","Yamamoto","Zhang"];
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    return `${firstName} ${lastName}`;
}

// Generate fake new user post
setInterval(() => {
    const fakeName = generateRandomName();
    const fakePost = generateRandomString();
    console.log("%s: %s", fakeName, fakePost);
    const table = document.querySelector('#comment_table');
    table.innerHTML =
      `<tr><td>${fakeName}</td><td>${fakePost}</td></tr>` + table.innerHTML;

  }, 5000);
