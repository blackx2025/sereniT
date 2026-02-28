// Ajouter une nouvelle discussion
document.getElementById("forum-form").addEventListener("submit", function (event) {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;

    const newDiscussion = document.createElement("div");
    newDiscussion.classList.add("discussion");
    newDiscussion.innerHTML = `
        <h3>${title}</h3>
        <p>${content}</p>
        <div class="actions">
            <button onclick="likePost(this)">👍 J'aime</button>
            <button onclick="dislikePost(this)">👎 Je n'aime pas</button>
            <button onclick="favoritePost(this)">⭐ Mettre en favoris</button>
        </div>
        <div class="reponse">
            <p>Réponse à venir...</p>
            <div class="actions">
                <button onclick="likePost(this)">👍 J'aime</button>
                <button onclick="dislikePost(this)">👎 Je n'aime pas</button>
                <button onclick="favoritePost(this)">⭐ Mettre en favoris</button>
            </div>
        </div>
    `;

    document.getElementById("forum").prepend(newDiscussion);

    document.getElementById("title").value = "";
    document.getElementById("content").value = "";
});

// Bouton J’aime
function likePost(button) {
    alert("Vous avez aimé ce message !");
    button.setAttribute("disabled", "true");
}

// Bouton Je n’aime pas
function dislikePost(button) {
    alert("Vous n'aimez pas ce message !");
    button.setAttribute("disabled", "true");
}

// Bouton Favoris
function favoritePost(button) {
    alert("Ce message a été mis en favoris !");
    button.setAttribute("disabled", "true");
}