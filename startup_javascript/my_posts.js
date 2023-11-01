function loadPosts() {
    let allPosts = [];
    let posts = [];
    const userName = localStorage.getItem('userName') ?? 'Mystery player';

    // Get all posts
    const postsText = localStorage.getItem('posts');
    if (postsText) {
        allPosts = JSON.parse(postsText);
    }

    // Filter target posts by the current username
    if (userName !== 'Mystery player') {
        if (allPosts.length) {
            for (const [_, post] of allPosts.entries()) {
                if (post.name === userName) {
                    posts.push(post);
                }
            }
        }
    }

    const tableBodyEl = document.querySelector('#my_posts');

    // Add target posts to the table
    if (posts.length) {
        for (const p of posts) {
            const postTdEl = document.createElement('td');
            const dateTdEl = document.createElement('td');

            postTdEl.textContent = p.post;
            dateTdEl.textContent = p.date;
        
            const rowEl = document.createElement('tr');
            rowEl.appendChild(dateTdEl);
            rowEl.appendChild(postTdEl);
        
            tableBodyEl.appendChild(rowEl);
        }
    } else {
        tableBodyEl.innerHTML = '<tr><td colSpan=2>Make your first post today!</td></tr>';
    }

}

loadPosts();