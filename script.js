document.addEventListener('DOMContentLoaded', () => {
    const forum = document.getElementById('forum');
    const form = document.getElementById('forum-form');

    // On récupère les infos de l'utilisateur depuis l'identification
    const pseudonyme = localStorage.getItem('pseudonyme') || "Invité";
    const nom = localStorage.getItem('nom') || "";
    const classe = localStorage.getItem('class') || "";

    let posts = [];

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        // On n'a plus besoin de récupérer un username depuis le formulaire
        const username = `${pseudonyme} (${classe})`; // ou juste pseudonyme
        const title = document.getElementById('title').value.trim();
        const content = document.getElementById('content').value.trim();

        if (!title || !content) return;

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
        const usernameReply = pseudonyme; // On utilise le pseudo déjà identifié
        const text = prompt("Ta réponse :");
        if (usernameReply && text) {
            const post = posts.find(p => p.id === id);
            post.replies.push({ username: usernameReply, text });
            renderPosts();
        }
    };
});