const username = localStorage.getItem('serenitPseudonym');
if(!username){ alert('Tu dois t’identifier'); window.location.href='identification.html'; }

const forum=document.getElementById('forum');
const form=document.getElementById('forum-form');
let posts=[];

form.addEventListener('submit', e=>{
    e.preventDefault();
    const title=document.getElementById('title').value.trim();
    const content=document.getElementById('content').value.trim();
    if(!title || !content) return;
    posts.push({id:Date.now(), username, title, content, likes:0, dislikes:0, views:0, reposts:0, replies:[]});
    renderPosts();
    form.reset();
});

function renderPosts(){
    forum.innerHTML='';
    posts.forEach(p=>{
        const div=document.createElement('div');
        div.className='discussion';
        p.views++;
        div.innerHTML=`<h3>${p.title}</h3><p><strong>${p.username}</strong>: ${p.content}</p>
        <div class="actions">
            <button onclick="like(${p.id})">👍 ${p.likes}</button>
            <button onclick="dislike(${p.id})">👎 ${p.dislikes}</button>
            <button onclick="repost(${p.id})">🔁 ${p.reposts}</button>
            <span>👁️ ${p.views} vues</span>
            <button onclick="reply(${p.id})">💬 Répondre</button>
        </div>
        <div class="replies">
            ${p.replies.map(r=>`<p><strong>${r.username}</strong>: ${r.text}</p>`).join('')}
        </div>`;
        forum.appendChild(div);
    });
}

window.like=id=>{const p=posts.find(p=>p.id===id);p.likes++;renderPosts();}
window.dislike=id=>{const p=posts.find(p=>p.id===id);p.dislikes++;renderPosts();}
window.repost=id=>{const p=posts.find(p=>p.id===id);posts.push({...p,id:Date.now(),reposts:0,views:0});renderPosts();}
window.reply=id=>{const text=prompt('Ta réponse :'); if(text){const p=posts.find(p=>p.id===id);p.replies.push({username,text}); renderPosts();}}