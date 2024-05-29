async function loadPosts() {
    let allPosts = [];
    let posts = [];
    const userName = localStorage.getItem('userName') ?? 'Mystery player';

    try {
        // Get the latest high scores from the service
        const response = await fetch('/api/posts');
        allPosts = await response.json();
    
        // Save the scores in case we go offline in the future
        localStorage.setItem('posts', JSON.stringify(allPosts));
      } catch {
        // If there was an error then just use the last saved scores
        const postsText = localStorage.getItem('posts');
        if (postsText) {
            allPosts = JSON.parse(postsText);
        }
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
    displayPosts(posts);
}

function displayPosts(posts) {
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