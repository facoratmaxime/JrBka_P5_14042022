//collecte des données de l'api
const apiProduct = fetch("http://localhost:3000/api/products")
  //".json" converti le resultat en promise depuis le format json, cette promise une fois résolu retournera un objet javascript
  .then((result) => result.json())
  //traitement du resultat
  .then((data) => {
    let number = 0;
    let numbersOfProduct = data.length - 1;
    //collecte d'éléments dans le DOM
    const items = document.getElementById("items");

    //collecte et insertion de valeur dans la page html
    while (number <= numbersOfProduct) {
      const article = document.createElement("article");
      let link = document.createElement("a");

      items.appendChild(link);
      link.appendChild(article);

      altTxt = data[number].altTxt;

      colors = data[number].colors;

      description = data[number].description;

      imageUrl = data[number].imageUrl;

      name = data[number].name;

      price = data[number].price;

      id = data[number]._id;

      link.href = "./product.html?id=" + `${id}`;

      article.innerHTML =
        `<img src=${imageUrl} alt=${altTxt}/>` +
        `<h3 class="productName">${name}</h3>` +
        `<p class="productDescription">${description}</p>`;

      number++;
    }
  })
  .catch((err) => {
    alert(err);
  });
