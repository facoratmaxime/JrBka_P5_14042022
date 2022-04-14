//recherche délément dans le DOM
const spanOrderId = document.getElementById("orderId");
//convertion du contenu de la clé orderId du localStorage au format javascript
const orderId = JSON.parse(localStorage.getItem("orderId"));
//ajout de l'orderId dans le DOM
spanOrderId.textContent = orderId;
//suppression de la clé contenant l'orderId dans le local storage
localStorage.removeItem("orderId");
