// Conseguir info completa de personaje por la ID 
const paragrams = new URLSearchParams(window.location.search);
const actualID = paragrams.get('id');

// Obtener info storage, si no hay crear objeto
let chats = JSON.parse(localStorage.getItem('chats')) || {};

// Validar que esta el personaje o si no decargar info y guardar en chats
validateData();

// Añadir listeners a todos los botones de opciones
const btnGroup = document.querySelectorAll('.category-btn');
for (let btn of btnGroup) {
    const option = btn.textContent;
    btn.addEventListener('click', () => {
        renderQuestion(option);
        renderAnswer(option);
    });
}

// Listener para el btn de Home
document.getElementById('home').addEventListener('click', () => {
    console.log("Moviéndote a home");
    window.location.href = '../index.html';
});

// Función para agregar un mensaje al array messages en chats
function addMessageToChat(message, isUser) {
    chats[actualID].messages.push({
        type: isUser ? 'user' : 'IA',
        msg: message
    });
    saveLocalStorage(chats);
}

// Guardar en local storage la info del chat 
function saveLocalStorage(data) {
    localStorage.setItem('chats', JSON.stringify(data));
    console.log("Guardado en storage -> " + JSON.stringify(data)); 
}

// Funcion que renderiza todos los mensajes pasados por un array
function updatePastMessages (messages) {
    const chat = document.getElementById('chat');
    chat.innerHTML ="";
    for(let msg of messages){
        const msgElement = document.createElement('p');
        msgElement.textContent = msg.msg;
        if(msg.type == 'user'){
            msgElement.className = "user-message";
        }else{
            msgElement.className = "IA-message";
        }
        chat.appendChild(msgElement);
    }
};

// Buscar datos del personaje, si no crearlos
function validateData(){
    if(chats[actualID]){
        // Si existe rescatar mensajes y renderizarlos
        updatePastMessages(chats[actualID].messages);
    } else {
        console.log('Personaje no guardado, consultado API');
        fetch(`https://api.disneyapi.dev/character/${actualID}`)
            .then(res => res.json())
            .then(data => {
                chats[actualID] = {
                    info: data.data,
                    messages: []
                }
                saveLocalStorage(chats);
            })
            .catch(err => {
                console.error("ERROR AL BUSCAR EL PERSONAJE " + actualID + " ERROR: "  + err);
            })
    }
}

// Función que imprime la opción del usuario
function renderQuestion(option) {
    let message = "";
    switch(option.toLowerCase()) {
        case "aliados":
            message = "¿Cuáles son tus aliados?";
            break;
        case "enemigos":
            message = "¿Tienes algún enemigo?";
            break;
        case "películas":
            message = "¿En qué películas has aparecido?";
            break;
        case "atracciones":
            message = "¿En qué atracciones me puedo montar para que me recuerden a ti?";
            break;
        case "series tv":
            message = "¿En qué series de televisión has salido?";
            break;
        case "videojuegos":
            message = "¿En qué videojuegos apareces?";
            break;
        default:
            message = option;
    }
    
    const chat = document.getElementById('chat');
    const msgElement = document.createElement('p');
    msgElement.className = "user-message";
    msgElement.textContent = message;
    chat.appendChild(msgElement);

    addMessageToChat(message, true);
}

// Función que responde a la pregunta del usuario
function renderAnswer(option) {
    const chat = document.getElementById('chat');
    let respuesta = "";

    // Obtener la info del personaje
    const characterData = chats[actualID].info || null;
    
    if (!characterData) {
        respuesta = "Vaya... No tengo ni idea.";
        validateData();
    } else {
        switch (option.toLowerCase()) {
            case "películas":
                if (characterData.films && characterData.films.length > 0) {
                    respuesta = "Si quieres verme en acción 🎬, salgo en: " + 
                    characterData.films.join(", ");
                } else {
                    respuesta = "Oh... No tengo ni idea de en qué películas estoy 😭";
                }
                break;
            case "atracciones":
                if (characterData.parkAttractions && characterData.parkAttractions.length > 0) {
                    respuesta = "🎢 Si quieres montarte en una atracción mía... Te recomiendo: " 
                    + characterData.parkAttractions.join(", ")
                } else {
                    respuesta = "Las atracciones no son lo mío dan miedo 😨";
                }
                break;
            case "series tv":
                if (characterData.tvShows && characterData.tvShows.length > 0) {
                    respuesta = "🤩 Obviamente, salgo en: " + characterData.tvShows.join(", ")
                } else {
                    respuesta = "Siempre he sido mas de peliculas... 😶 ";
                }
                break;
            case "videojuegos":
                if (characterData.videoGames && characterData.videoGames.length > 0) {
                    respuesta = "Claro gamer! 🕹️ Puedes juegar a: " 
                    + characterData.videoGames.join(", ");
                } else {
                    respuesta = "¿Videojuegos?, ¿que es eso?, ¿se come? 🤨";
                }
                break;
            case "aliados":
                if (characterData.allies && characterData.allies.length > 0) {
                    respuesta = "💪🏻 Mis aliados son: " + characterData.allies.join(", ");
                } else {
                    respuesta = "💀 Estoy acabado... No se quienes son mis aliados";
                }
                break;
            case "enemigos":
                if (characterData.enemies && characterData.enemies.length > 0) {
                    respuesta = "😡 Mis peores enemigos son: " + characterData.enemies.join(", ")
                } else {
                    respuesta = "Caigo tan bien que no tengo enemigos 😁";
                }
                break;
            default:
                respuesta = "Vaya...  No tengo ni idea";
        }
    }

    const msgElement = document.createElement('p');
    msgElement.className = "IA-message";
    msgElement.textContent = respuesta;
    chat.appendChild(msgElement);
    
    addMessageToChat(respuesta, false);
}