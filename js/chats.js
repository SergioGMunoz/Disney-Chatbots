// Listener para el btn de Home
document.getElementById('home').addEventListener('click', () => {
    console.log("Moviéndote a home");
    window.location.href = '../index.html';
});

// Recuperar datos de storage
const data = JSON.parse(localStorage.getItem('chats'));

// Verificar que no esta vacío
if (data && Object.keys(data).length > 0 ){
    renderResults(data)
}else{
    showErrorText('¡Comienza un nuevo chat y podrás verlo aquí!');
}

// Función que borra un elemento de la stoprage
function deleteItem(id) {
    // Eliminar la entrada del objeto chats
    if(id in data){
        delete data[id];
    }

    localStorage.setItem('chats', JSON.stringify(data));
    document.getElementById('characters-list').innerHTML = "";
    if (data && Object.keys(data).length > 0 ){
    renderResults(data)
}else{
    showErrorText('¡Comienza un nuevo chat y podrás verlo aquí!');
}
}

// Renderiza los resultados de local storage
function renderResults(characters){
    const list = document.getElementById('characters-list');
    console.log("Renderizando");
    list.innerHTML = "";
    for (const [ key, item ] of Object.entries(characters)){
        const character = document.createElement('div');
        character.classList.add('character');
        character.innerHTML = `
            <div class="div-img">
                <img class="icon" src="${item.info.imageUrl || 'img/no-image.png'}" >
            </div>
            <div class="character-buttons">
                <button data-id="${item.info._id}" class="button-grey name-btn">${item.info.name}</button>
                <button data-id="${item.info._id}" class="button-grey delete-btn">
                    <img class="icon" src="../img/delete-icon.svg">
                </button>
            </div>
        `;
        list.appendChild(character);
        const buttonName = character.querySelector('.name-btn'); 
        buttonName.addEventListener('click', () => {
            window.location.href = `/html/chat.html?id=${item.info._id}`;
        });
        const buttonDel = character.querySelector('.delete-btn'); 
        buttonDel.addEventListener('click', () => {
            console.log("Wliminando");
            deleteItem(item.info._id);
        });
    } 
}

// Muestra un mensaje de error personalizado
function showErrorText(msg){
    const errText =  document.getElementById('err-text');
    errText.innerHTML = msg;
    errText.style.visibility ='visible';
}

// Oculta mensaje de error
function hideErrorText(){
    const errText =  document.getElementById('err-text');
    errText.innerHTML = "";
    errText.style.visibility ='hidden';
}
