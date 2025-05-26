# Documentación Disney Chatbots

Aplicación web que permite explorar personajes del universo Disney y preguntarles (a través de preguntas predefinidas) información sobre ellos. 

[](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)

[](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)

[](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

[](https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white)

[](https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=notion&logoColor=white)

# 🚀 Cómo probar el proyecto

1. Clona el repositorio:
    
    ```bash
    git clone https://github.com/SergioGMunoz/Disney-Chatbots
    ```
    
2. Abre el archivo `index.html` en tu navegador favorito.

# ✨ Funcionalidades principales

1. **Filtrado de personajes** por nombre, película y/o serie de televisión.
    
    ![image.png](image.png)
    
2. **Visualización de fichas** de personaje (nombre e imagen, etc.).
    
    ![image.png](a55dceb9-2c13-4792-94f9-e9b203c70561.png)
    
3. **Chat** con respuestas predefinidas únicas para cada personaje.
    
    ![image.png](image%201.png)
    
4. **Recuperación** del chat con localStorage.
    
    ![image.png](image%202.png)
    

# 🌐 API utilizada

[**Disney API (disneyapi.dev)**](https://disneyapi.dev/)

### 📌 Endpoint usado

`GET /characters` Lista de personajes paginada

```json
{
  "data": [
    {
      "_id": "12345",
      "name": "Mickey Mouse",
      "films": ["Fantasia", "Steamboat Willie"],
      "imageUrl": "https://...jpg"
    }
  ]
}
```

## 🎨 Diseño UX/UI

El diseño fue creado previamente en Figma, cuidando la estética simple y funcional.

![image.png](image%203.png)

## 📁 Estructura del código

El proyecto está estructurado de forma muy simple, cada archivo js se encarga de gestionar su propia página con funciones independientes a las otras.

![codeviz-diagram-2025-05-26T09-48-40.drawio.png](codeviz-diagram-2025-05-26T09-48-40.drawio.png)

## 🧩 Estructura de datos

Los datos, información de los personajes guardados, mensajes enviados se guardan el local storage en el siguiente formato:

```json
// Objeto llamado chats
    "ID DEL PERSONAJE": {
        "info": {
            // Toda la info del personaje
             "name": "Nombre",
            "imageUrl": "https:// ..."
        },
        "messages": [
            {
                "type": "user",
                "msg": "Mensaje enviado por el usuario"
            },
            {
                "type": "IA",
                "msg": "Respuesta predefinida del chatbot"
            },
        ]
    },
    "ID OTRO PERSONAJE": {
        "info": {},
        "messages": []
}
```
