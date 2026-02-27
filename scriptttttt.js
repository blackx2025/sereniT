window.addEventListener('load', () => {
        setTimeout(() => {
            alert("Bienvenue ma belle, nous allons prendre soin de toi.");
        }, 800);

        
        const estInscrit = localStorage.getItem('estInscrit') === 'true';

        if (estInscrit) {
            document.getElementById('messagerie').style.display = 'block';
            document.getElementById('ressources').style.display = 'block';
            document.getElementById('forum').style.display = 'block';
            document.getElementById('rendezvous').style.display = 'block';

            document.getElementById('identification').style.display = 'none';
        } else {
            document.getElementById('identification').style.display = 'block';
        }
    });

    
    document.getElementById('formIdentification').addEventListener('submit', function(event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const classe = document.getElementById('classe').value;

        if (username && classe) {
            localStorage.setItem('estInscrit', 'true');
            localStorage.setItem('username', username);
            localStorage.setItem('classe', classe);

            window.location.href = 'siteee.html'; 
        } else {
            alert("Veuillez remplir tous les champs.");
        }
    });