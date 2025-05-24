// Nada mas arranca la página
const pageSize = 16;
let actualPage = 1;
let filtersString ='{}'; // Filtrado vacío

getCharacters();

// Devuelve un objeto con los campos de filtros en formato GraphQL
function getFilterString(nameInput, filmInput, showInput) {
  let filters = "{";

  if (nameInput && nameInput.trim().length > 0) {
    filters += `name: "${nameInput.trim()}", `;
  }
  if (filmInput && filmInput.trim().length > 0) {
    filters += `films: "${filmInput.trim()}", `;
  }
  if (showInput && showInput.trim().length > 0) {
    filters += `tvShows: "${showInput.trim()}"`;
  }

  // Si me he dejado una coma la quito
  if (filters.endsWith(", ")) {
    filters = filters.slice(0, -2);
  }
  filters += "}";
  return filters;
}

// Devuelve una lista filtrada de personajes disney en JSON
function getCharacters(){
    // Limpiando y poniendo mensaje de cargando
    console.log(`Oteniendo personajes para filtros: ${filtersString} `);
    console.log("PAGINAAAAAAAAAA -> " + actualPage);
    document.getElementById('characters-list').innerHTML ="";
    showErrorText('Cargando...')
    const query = `
        {
        characters(
            page: ${actualPage},
            pageSize: ${pageSize},
            filter: ${filtersString}
        ) {
            items {
                _id
                name
                imageUrl
            }
            paginationInfo {
                hasPreviousPage
                hasNextPage
                pageItemCount
                totalPages
            }
          }
        }
        `;
    // Hago una peticion POST para poder enviar un JSON con mi peticion (Consultar API)
    fetch('https://api.disneyapi.dev/graphql',{
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({query})
    })
        .then(res => res.json()) // Pasar a JSON  
        .then(res => {
            // Si devuelve algo
            if(res.data.characters.paginationInfo.pageItemCount >= 1){
                hideErrorText(); 
                const characters = res.data.characters.items;
                renderResults(characters);
            }else{
                // No devuelve nada
                showErrorText("No se ha encontrado ningun resultado :(")
            }
            const pageInfo = res.data.characters.paginationInfo;
            renderPageInfo(pageInfo.hasPreviousPage, pageInfo.hasNextPage, pageInfo.totalPages);
})

        .catch(err => {
            showErrorText('Error inesperado')
            console.error("Error:", err);
            return null;
        });
}

// Renderiza los resultados de la API
function renderResults(characters){
    const list = document.getElementById('characters-list');
    console.log(characters);
    for (let item of characters){
        // Iteración por cada resultado
        const character = document.createElement('div');
        character.classList.add('character');
        character.innerHTML =`
            <div class="div-img">
                <img class="icon" src="${item.imageUrl || 'img/no-image.png'}" >
            </div>
            <div>
                <button data-id="${item._id}" class="button-grey">${item.name}</button>
            </div>
        `;
        list.appendChild(character);
    } 
}

// Actualiza la información de paginado
function renderPageInfo(hasPreviousPage, hasNextPage, totalPages){
    //Previous page
    if (hasPreviousPage){
        document.getElementById('before').style.visibility='visible';
    }else{
        document.getElementById('before').style.visibility='hidden';
    }

    // Next page
    if (hasNextPage){
        document.getElementById('next').style.visibility='visible';
    }else{
        document.getElementById('next').style.visibility='hidden';
    }

    // Datos numericos de paginas
    document.getElementById('actual-page').innerHTML = actualPage;
    document.getElementById('last-page').innerHTML =totalPages;
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

// Listeners de la página
const form = document.getElementById('form-filters');
form.addEventListener('submit', event => {
    event.preventDefault(); // No recargar
      // Accedemos a los inputs por su atributo `name`
    const name = form.name.value;
    const film = form.film.value;
    const show = form.show.value;
    form.reset();

    // Guardar filtros 
    filtersString = getFilterString(name, film, show); 
    console.log("Buscando con filtros -> " + filtersString);
    // Lanzar query a la API
    getCharacters(filtersString);
})

// Pasando a la siguiente página
const btnNext = document.getElementById('next');
btnNext.addEventListener('click', event =>{
    actualPage++;
     // Lanzar query a la API
    getCharacters(filtersString);
})

// Volviendo a la anterior pagina
const btnBefore = document.getElementById('before');
btnBefore.addEventListener('click', event =>{
    if(actualPage > 1){
        actualPage--;
        // Lanzar query a la API
       getCharacters(filtersString);
    }else{
        console.error("Intentando ir a una pagina que no existe");
    }
})