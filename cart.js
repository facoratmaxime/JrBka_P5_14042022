 //collecte d'éléments dans le local storage
let searchInLocalStorage = JSON.parse(localStorage.getItem("product"));

//fonction de tri par ordre alphabétique grace au name
var triArticle = (a, b) => {
  if(a.name.toLowerCase() < b.name.toLowerCase()){return -1}
  if(a.name.toLowerCase() > b.name.toLowerCase()){return +1}
  else{return 0}
};

//tri des produit du local storage par ordre alphabétique
searchInLocalStorage.sort(triArticle)

//Tableau contenant les prix des article
let priceProduct = [];
//Tableau contenant les quantité de produit
let quantityProduct = [];
    console.log(quantityProduct);

//collecte d'éléments dans le DOM
const section = document.getElementById("cart__items");

const totalQuantity = document.getElementById("totalQuantity");

const totalPrice = document.getElementById("totalPrice");

const order = document.getElementById("order");
order.setAttribute("disabled", "true");

const firstName = document.getElementById("firstName");

const firstNameErrorMsg = document.getElementById("firstNameErrorMsg");

const lastName = document.getElementById("lastName");

const lastNameErrorMsg = document.getElementById("lastNameErrorMsg");

const address = document.getElementById("address");

const addressErrorMsg = document.getElementById("addressErrorMsg");

const city = document.getElementById("city");

const cityErrorMsg = document.getElementById("cityErrorMsg");

const email = document.getElementById("email");

const emailErrorMsg = document.getElementById("emailErrorMsg");

const cart__order__form = document.querySelector(".cart__order__form");


const createCart = searchInLocalStorage.forEach((i) => {
  
  //création d'éléments dans le DOM
  const article = document.createElement("article");
  article.className = "cart__item";
  article.id = i.id;
  article.color = i.Color;

  
  const divImg = document.createElement("div");
  divImg.className = "cart__item__img";
  
  const img = document.createElement("img");
  img.src = i.image;
  img.alt = i.alt;
  
  const cart__item__content = document.createElement("div");
  cart__item__content.className = "cart__item__content";
  
  const cart__item__content__description = document.createElement("div");
  cart__item__content__description.className =
  "cart__item__content__description";
  
  const cart__item__content__settings = document.createElement("div");
  cart__item__content__settings.className = "cart__item__content__settings";
  
  const cart__item__content__settings__quantity = document.createElement("div");
  cart__item__content__settings__quantity.className =
  "cart__item__content__settings__quantity";
  
  const cart__item__content__settings__delete = document.createElement("div");
  cart__item__content__settings__delete.className =
  "cart__item__content__settings__delete";
  
 

  //insertion d'éléments dans le DOM
  section.appendChild(article);
  article.appendChild(divImg);
  divImg.appendChild(img);
  article.appendChild(cart__item__content);
  cart__item__content.appendChild(cart__item__content__description);
  //collecte des données du produit dans l'api
  let apiProductPrice = fetch("http://localhost:3000/api/products/" + `${i.id}` )
  .then((result) => result.json())
  .then((data) => {
    
    //insertion d'éléments dans le DOM
    cart__item__content__description.innerHTML =
    `<h2>${i.name}</h2>` +
    `<p>${i.color}</p>` +
    `<p class="select_price" value="${data.price}"> ${data.price} €</p>`;
  
    //envoi du résultat du prix * la quantité de chaque produit dans le tableau "priceProduct"
    priceProduct.push(data.price * i.quantity);
    //calcul des la somme des prix contenu dans le tableau "priceProduct"
    let sum = priceProduct.reduce((a,b)=>{
      return a + b;
    }, 0);
    // insertion dans le DOM
    totalPrice.textContent = sum;
  });
  
  
  cart__item__content.appendChild(cart__item__content__settings);
  cart__item__content__settings.appendChild(
    cart__item__content__settings__quantity
    );
    cart__item__content__settings__quantity.innerHTML =
    `<p> Quantité : ${i.quantity}</p>` +
    `<input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${i.quantity}">`;
    //convertion de la chaine de caractère en nombre
    let numbers = parseInt(i.quantity)
    //envoi de la quantité de chaque produit dans le tableau "quantityProduct"
    quantityProduct.push(numbers);
    //calcul des la somme des quantité contenu dans le tableau quantityProduct et insertion dans le DOM
    console.log(numbers);
    let sum = quantityProduct.reduce((a,b)=>{
      
      return a + b;
    });
    
    totalQuantity.textContent = sum

  cart__item__content__settings.appendChild(
    cart__item__content__settings__delete
    );
    cart__item__content__settings__delete.innerHTML = `<p class="deleteItem">Supprimer</p>`;
  
});

  
  //collecte d'élément récement créé dans le DOM
  const deleteItem = document.querySelectorAll(".deleteItem");
  
  const pQuantities = document.querySelectorAll(
    ".cart__item__content__settings__quantity > p"
    );
  var itemQuantity = document.querySelectorAll(".itemQuantity");
  
    
   
    
    //boucle qui défini l'index des input (itemQuantity) et leur ID
    for (let i = 0; i < itemQuantity.length; i++) {
      let element = itemQuantity[i];
      
      let select_id = searchInLocalStorage[i].id;
      
      let inputId = (select_id, element);
      
      let buttonDelete = (select_id, deleteItem[i]);
      
      //modifier la quantité
      //écoute l'input, au changement et après confirmation supprime l'article et le remplace par l'article modifié ( newLocalStorage)
      const changeQuantity = inputId.addEventListener("change", (e) => {
        let newQuantity = e.target.value;
        
        //article modifié
        let newLocalStorage = {
          alt: searchInLocalStorage[i].alt,
          color: searchInLocalStorage[i].color,
          id: select_id,
          image: searchInLocalStorage[i].image,
          myInput: searchInLocalStorage[i].myInput,
          name: searchInLocalStorage[i].name,
          quantity: newQuantity,
          };

        //si newQuantity superieur ou égal à 1 vérifier la suite
        if (newQuantity >= 1) {
          //si newQuantity inferieur ou égal à 100 vérifier la suite
          if (newQuantity <= 100) {
            //si ok supprimer l'article et le remplacer par l'article modifié
            //si annuler fenêtre alert
            if (window.confirm("Modifier la quantité ?")) {
              searchInLocalStorage.splice(i, 1, newLocalStorage);
              localStorage.setItem("product", JSON.stringify(searchInLocalStorage));
              //recharge la page
              window.location.reload();
            } else {
              alert("Vous n'avez pas modifié la quantité");
            }
          } else {
            alert("quantité maximal 100");
          }
        } else {
          alert("quantité minimal 1");
        }
      });

      //écoute le bouton (buttonDelete) et au click supprime l'article
      const clickButton = buttonDelete.addEventListener("click", () => {
        //si ok supprime l'article
        //si annuler rien ne change
        if (window.confirm("Vous allez supprimer cet article")) {
          searchInLocalStorage.splice(i, 1);
          localStorage.setItem("product", JSON.stringify(searchInLocalStorage));
          window.location.reload();
        }
      });
    }
  

//regex firstName lastName et city, empeche les chiffres et les caractères spéciaux, sauf le "-"
const regexNameCity = (e) => {
  //message d'erreur
  e.textContent =
    "Veillez à utiliser des caractères autorisé, le champs doit contenir entre 3 et 30 caractères ";
  e.style.display = "none";
  //si l'un de ces caractère est utilisé ou si le texte saisi est plus petit que 3 ou lus grand que 30 désactive le bouton commande (order) et fait apparaitre le message d'erreur
  if (
    /[0-9²&"#'{}()`_=£¤µ%!§:;.\\,\]<>@+*?$|€[/]/.test(text) ||
    text.length < 3 ||
    text.length > 30
  ) {
    order.setAttribute("disabled", "true");
    e.style.display = "flex";
    //sinon pas de message d'erreur et bouton activé
  } else {
    order.removeAttribute("disabled", "true");
    e.style.display = "none";
  }
};

//regex address, empeche les caractères spéciaux, sauf le "-"

const regexAddress = (e) => {
  //message d'erreur
  e.textContent =
    "Veillez à utiliser des caractère autorisé, le champs doit contenir entre 3 et 50 caractères";
  e.style.display = "none";
  //si l'un de ces caractère est utilisé ou si le texte saisi est plus petit que 3 ou lus grand que 50 désactive le bouton commande (order) et fait apparaitre le message d'erreur
  if (
    /[²&"#'{}()`_=£¤µ%!§:;.\\,\]<>@+*?$|€[/]/.test(text) ||
    text.length < 3 ||
    text.length > 50
  ) {
    order.setAttribute("disabled", "true");
    e.style.display = "flex";
    //sinon pas de message d'erreur et bouton activé
  } else {
    order.removeAttribute("disabled", "true");
    e.style.display = "none";
  }
};

//le champs doit contenir une suite de caractère suivi d'un @ suivi d"une suite caractère, suivi d"un ".", suivi d"une suite de caractère
var regMail = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
const regexEmail = (email) => {
  //input email
  //message d'erreur
  email.textContent = "Veuillez renseigner un email valide";
  email.style.display = "none";

  //si ces deux caractères ne sont pas utilisés ou si le texte saison est plus petit que 10 ou plus grand que 50 désactive le bouton commande (order) et fait apparaitre le message d'erreur
  if (regMail.exec(text)) {
    order.removeAttribute("disabled", "true");
    email.style.display = "none";
    //sinon pas de message d'erreur et bouton activé
  } else {
    order.setAttribute("disabled", "true")
    email.style.display = "flex"
  }
};

//ecoute l'input prénom
firstName.addEventListener("input", (e) => {
  text = e.target.value;

  regexNameCity(firstNameErrorMsg);
});

//ecoute l'input nom
lastName.addEventListener("input", (e) => {
  text = e.target.value;
  regexNameCity(lastNameErrorMsg);
});

//ecoute l'input addresse
address.addEventListener("input", (e) => {
  text = e.target.value;
  regexAddress(addressErrorMsg);
});

//ecoute l'input ville
city.addEventListener("input", (e) => {
  text = e.target.value;
  regexNameCity(cityErrorMsg);
});

//ecoute l'input email
email.addEventListener("input", (e) => {
  text = e.target.value;
  regexEmail(emailErrorMsg);
});

//envoi à l'api
//écoute du bouton commander !
const postRequest = order.addEventListener("click", () => {
  //annule le comportement par default du bouton, pour éviter le rechargement de la page avant l'envoi de la requete
  event.preventDefault();
  let contact = {
    firstName: firstName.value,
    lastName: lastName.value,
    address: address.value,
    city: city.value,
    email: email.value,
  };

  //collecte les id dans les elements du fichier "searchInLocalStorage"
  let listId = searchInLocalStorage.map((el) => el.id);

  let products = listId;

  let sendBackEnd = {
    contact,
    products,
  };

  //envoi de la requete post
  const send = fetch("http://localhost:3000/api/products/order", {
    method: "post",

    body: JSON.stringify(sendBackEnd),

    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    //lecture de l'orderId renvoyer par le backend
    .then((data) => {
      let orderId = data.orderId;
      //envoi de l'orderId dans le local storage
      localStorage.setItem("orderId", JSON.stringify(orderId));
    })
    .catch((err) => {
      console.log(err);
    });

  //fenêtre de confirmation
  if (window.confirm("Confirmez votre commande")) {
    window.location.href = "confirmation.html";
  }
});
