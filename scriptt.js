function togglePseudonym(show) {
    document.getElementById('pseudonym-section').style.display = show ? 'block' : 'none';
    document.getElementById('generated-pseudonyms').style.display = show ? 'none' : 'block';
    if(!show) generatePseudonyms(document.getElementById('name').value);
}

function generatePseudonyms(name){
    const sel = document.getElementById('generatedPseudonym');
    sel.innerHTML='';
    if(name){
        const pseuds = [name+'123','Super'+name,name+'_Star','Lady_'+name,'Mystery_'+name,name+'X'];
        pseuds.forEach(p=>{
            const opt=document.createElement('option');
            opt.value=p; opt.textContent=p;
            sel.appendChild(opt);
        });
    }
}

document.getElementById('identificationForm').addEventListener('submit',function(e){
    e.preventDefault();
    const name=document.getElementById('name').value.trim();
    const pseud=document.getElementById('pseudonym').value.trim();
    const gen=document.getElementById('generatedPseudonym').value;
    const userPseud=pseud || gen;
    if(!userPseud){ alert('Veuillez entrer un pseudonyme'); return; }
    localStorage.setItem('serenitName', name);
    localStorage.setItem('serenitPseudonym', userPseud);
    localStorage.setItem('serenitClass', document.getElementById('class').value);
    window.location.href='forum.html';
});