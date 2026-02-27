function togglePseudonymInput(show) {
    const pseudonymSection = document.getElementById('pseudonym-section');
    const generatedPseudonyms = document.getElementById('generated-pseudonyms');
    const name = document.getElementById('name').value;

    if (show) {
        pseudonymSection.style.display = 'block';
        generatedPseudonyms.style.display = 'none';
    } else {
        pseudonymSection.style.display = 'none';
        generatedPseudonyms.style.display = 'block';
        generatePseudonyms(name);
    }
}

function generatePseudonyms(name) {
    const generatedPseudonymSelect = document.getElementById('generatedPseudonym');
    generatedPseudonymSelect.innerHTML = '';

    if (name) {
        const basePseudonyms = [
            name + '123',
            'Super' + name,
            name + '_Star',
            'Lady_' + name,
            'Mystery_' + name,
            name + 'X'
        ];

        basePseudonyms.forEach(pseudonym => {
            const option = document.createElement('option');
            option.value = pseudonym;
            option.textContent = pseudonym;
            generatedPseudonymSelect.appendChild(option);
        });
    }
}

document.getElementById('identificationForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const pseudonym = document.getElementById('pseudonym').value;
    const generatedPseudonym = document.getElementById('generatedPseudonym')?.value;

    let userPseudonym = pseudonym || generatedPseudonym;

        if (userPseudonym) {
        alert('Bienvenue sur SereniT, ' + userPseudonym + ' !');

        
        localStorage.setItem('pseudonyme', userPseudonym);
        localStorage.setItem('nom', name);

        
        window.location.href = "siteee.html"; 
    } else {
        alert('Veuillez entrer un pseudonyme avant de continuer.');
    }
});
)

Le script du forum( document.addEventListener('DOMContentLoaded', () => {
    const forum = document.getElementById('forum');
    const form = document.getElementById('forum-form');

    let posts = [];

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value.trim();
        const title = document.getElementById('title').value.trim();
        const content = document.getElementById('content').value.trim();

        if (!username || !title || !content) return;

        const newPost = {
            id: Date.now(),
            username,
            title,
            content,
            likes: 0,
            dislikes: 0,
            views: 0,
            shares: 0,
            reposts: 0,
            replies: []
        };

        posts.push(newPost);
        renderPosts();
        form.reset();
    });

    function renderPosts() {
        forum.innerHTML = '';
        posts.sort((a, b) => a.title.localeCompare(b.title));
        posts.forEach(post => {
            const postDiv = document.createElement('div');
            postDiv.className = 'discussion';

            post.views += 1;

            postDiv.innerHTML = `
                <h3>${post.title}</h3>
                <p><strong>${post.username}</strong> : ${post.content}</p>
                <div class="actions">
                    <button onclick="like(${post.id})">👍 ${post.likes}</button>
                    <button onclick="dislike(${post.id})">👎 ${post.dislikes}</button>
                    <button onclick="share(${post.id})">🔁 Partages : ${post.shares}</button>
                    <button onclick="repost(${post.id})">📣 Republier (${post.reposts})</button>
                    <span>👁️ ${post.views} vues</span>
                    <button onclick="reply(${post.id})">💬 Répondre</button>
                </div>
                <div class="replies">
                    ${post.replies.map(r => `<p><strong>${r.username}</strong> : ${r.text}</p>`).join('')}
                </div>
            `;
            forum.appendChild(postDiv);
        });
    }

    window.like = (id) => {
        const post = posts.find(p => p.id === id);
        post.likes++;
        renderPosts();
    };

    window.dislike = (id) => {
        const post = posts.find(p => p.id === id);
        post.dislikes++;
        renderPosts();
    };

    window.share = (id) => {
        const post = posts.find(p => p.id === id);
        post.shares++;
        alert('Lien copié pour partage !');
        renderPosts();
    };

    window.repost = (id) => {
        const post = posts.find(p => p.id === id);
        post.reposts++;
        posts.push({ ...post, id: Date.now(), reposts: 0, views: 0 });
        renderPosts();
    };

    window.reply = (id) => {
        const username = prompt("Ton prénom pour répondre :");
        const text = prompt("Ta réponse :");
        if (username && text) {
            const post = posts.find(p => p.id === id);
            post.replies.push({ username, text });
            renderPosts();
        }
    };
});
