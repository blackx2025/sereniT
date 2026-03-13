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

        
        window.location.href = "modifier.html"; 
    } else {
        alert('Veuillez entrer un pseudonyme avant de continuer.');
    }
});