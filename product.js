//methode pour obtenir l'id avec urlSearchParams
//variable contenant l'url de la page
const url_Product = window.location.search;

//nouvelle variable URLSearchParams contenant l'url de la page
const urlSearchParams = new URLSearchParams(url_Product);

//Récupération de l'id dans l'url
const monId = urlSearchParams.get("id");

//récupération et création d'éléments dans le DOM
const item__img = document.querySelector(".item__img");
const item__title = document.getElementById("title");
const item__price = document.getElementById("price");
const item__description = document.getElementById("description");
const item__color = document.getElementById("colors");
const input = document.getElementById("quantity");
const button = document.getElementById("addToCart");
const item__content = document.querySelector(".item__content");
const form = document.createElement("form");
const item__content__settings = document.querySelector(
  ".item__content__settings"
);
const item__content__addButton = document.querySelector(
  ".item__content__addButton"
);
form.method = "get";
form.action = "cart.html";
button.type = "submit";
item__color.required = "true";
input.required = "true";



//collecte des données du produit dans l'api
const apiProductId = fetch("http://localhost:3000/api/products/" + `${monId}`)
  .then((result) => result.json())
  .then((data) => {
    altTxt = data.altTxt;
    colors = data.colors;
    description = data.description;
    imageUrl = data.imageUrl;
    name = data.name;
    price = data.price;
    id = data._id;

    //insertion des valeures, collectés et créés, dans la page html
    item__img.innerHTML = `<img src=${imageUrl} alt=${altTxt}>`;
    item__title.innerHTML = `${name}`;
    item__price.innerHTML = `${price}`;
    item__description.innerHTML = `${description}`;
    item__content.appendChild(form);
    form.appendChild(item__content__settings);
    form.appendChild(item__content__addButton);

    //création de balise option et insertion de valeur pour chaque couleur
    colors.forEach((color) => {
      const colorz = document.createElement("option");
      colorz.value = `${color}`;
      colorz.className = "color";
      item__color.appendChild(colorz);
      colorz.innerHTML = `${color}`;
    });

    //écoute du bouton "ajouter au panier"
    button.addEventListener("click", () => {
      let newColor = item__color.value;
      let newQuantity = input.value;

      //variable contenant toutes les informations à envoyer au panier
      let newProduct = {
        id: id,
        name: name,
        color: newColor,
        quantity: newQuantity,
        image: imageUrl,
        alt: altTxt,
      };

      //Regarde dans le local storage si la clé "product" est présente et la converti au format javascript
      var cmd = JSON.parse(localStorage.getItem("product"));
      //si newColor = true, verifie newQuantity
      if (newColor) {
        //si newQuantity plus grand ou égale à 1, verifie newQuantity <= 100
        if (newQuantity >= 1) {
          //si newQuantity plus petit ou égale à 100, verifie cmd
          if (newQuantity <= 100) {
            //si cmd déja présente, collecte d'information et vérifie s'il y a des doublons
            if (cmd) {
              //cherche tous les id dans le tableau d'objet cmd
              let listeId = cmd.map((el) => el.id);
              //retourne l'index de l'objet où se trouve l'id du produit à ajouter au panier
              let indexDoublonId = listeId.indexOf(id);
              //retourne true ou false celon si l'id du produit à ajouter est déja présent ou non dans le tableau d'objet cmd
              let booleanDoublonId = listeId.includes(id);
              //cherche tous les color dans le tableau d'objet cmd
              let listColors = cmd.map((el) => el.color);
              //retourne l'index de l'objet où se trouve la color du produit à ajouter au panier
              let indexDoublonColor = listColors.indexOf(newColor);
              //retourne true ou false celon si la color du produit à ajouter est déja présente ou non dans le tableau d'objet cmd
              let booleanDoublonColor = listColors.includes(newColor);

              //si l'id et la color du produit à ajouter sont déja prensent dans le tableau d'objet cmd, ajouter seulement la nouvelle quantité au produit déja présent
              if (booleanDoublonId && booleanDoublonColor) {
                newQuantity = [
                  newQuantity,
                  cmd[indexDoublonColor].quantity,
                ];
                //remplace la virgule entre les valeures du tableau newQuantity par des + et additionne ces 2 valeures
                let myQuantity = eval(newQuantity.join("+"));
                //remplace newQuantity par myQuantity dans newProduct
                newProduct.quantity = myQuantity;
                //remplace l'objet à l'index "indexDoublonColor" par newProduct
                cmd.splice(indexDoublonColor, 1, newProduct);
                //envoi "cmd" dans le local storage au format json
                localStorage.setItem("product", JSON.stringify(cmd));
              }
              //sinon ajoute les valeur de "newProduct" à "cmd" et envoi "cmd" dans le local storage au format json
              else {
                cmd.push(newProduct);
                localStorage.setItem("product", JSON.stringify(cmd));
              }
            }

            //sinon créer un tableau, ajoute les valeur de "newProduct" à "cmd" et envoi "cmd" dans le local storage au format json
            else {
              cmd = [];
              cmd.push(newProduct);
              localStorage.setItem("product", JSON.stringify(cmd));
            }
          } else {
            console.log("error input more high");
          }
        } else {
          console.log("error input more low");
        }
      } else {
        console.log("error select color");
      }
    });
  })
  .catch((err) => {
    alert(err);
  });
