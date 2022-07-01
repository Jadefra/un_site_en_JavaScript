const findId = document.querySelector("#orderId");
const takeUrl = window.location.search;/*SearchParams récupérer les paramètres d’URL en JavaScript*/
const takeOrderWithId = new URLSearchParams(takeUrl);
const addOrderIdinUrl = takeOrderWithId.get("name");
findId.textContent = addOrderIdinUrl;