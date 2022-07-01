let object;

// Récupération des données du canapé de l'API avec l'URL + id
function getObject(idProduct) {
	// Requete avec fetch 
	fetch("http://localhost:3000/api/products/" + idProduct) /*Le type de requête est GET pour récupérer les données*/
		.then((res) => { /*then()pour récupérer le résultat de la requête au format json */
			return res.json();
		})

		// Rédistribution des données de l'API 
		.then(function (resultatAPI) { /*récupérer la fonction*/
			object = resultatAPI;
			if (object) {
				insertObject(object); /*permet de créer ou modifier une ressource*/
			}
		})
		.catch((error) => {});
		
}

// Affichage du canapé et le choix des couleurs 
function insertObject (object) { /*permet de créer ou modifier une ressource*/ 
	// Ajout de la photographie d'un canapé "img"
	let productImg = document.createElement("img");
	document.querySelector(".item__img").appendChild(productImg);
	productImg.src = object.imageUrl;
	productImg.alt = object.altTxt;

	// Ajout du nom du canapé dans le "h1"
	let productName = document.getElementById("title");
	productName.innerHTML = object.name;

	// Transformation du nom de la page 
	document.title = object.name

	// Ajout du prix dans le "p" - "span"
	let productPrice = document.getElementById("price");
  	productPrice.innerHTML = object.price;

  	// Ajout de la description dans le "p"
  	let productDescription = document.getElementById("description");
  	productDescription.innerHTML = object.description;

  	// Ajout de "l'option" pour choisir les couleurs
  	for (let colors of object.colors) {/*boucle for of l'indice précis d'un élément n'est pas nécessaire pendant l'itération*/ 
  		let productColors = document.createElement("option");
  		document.querySelector("#colors").appendChild(productColors); 
  		productColors.value = colors;
  		productColors.innerHTML = colors;
  	}
}

const params = new URLSearchParams(window.location.search); /*SearchParams récupérer les paramètres d’URL en JavaScript*/
getObject (params.get("id")) /*appeler ma fonction get object et l'argument id de la barre d'url */ 

//Panier
const addCart = document.querySelector("#addToCart"); /*Présent dans le HMTL*/
const quantitySelection = document.querySelector("#quantity"); /*Présent dans le HMTL*/
const colorSelection = document.querySelector("#colors"); /*Présent dans le HMTL*/

// Condition sur le panier d'une quantité allant de 0 à 100
addCart.addEventListener("click", (event) => { /*réagir lors d'un clic sur un élément (écouter) notre callback prend en paramètre event (qui sera appelée à chaque fois que l'utilisateur cliquera sur le lien)*/
	if (
		// Quantité supérieure à 0
		quantitySelection.value > 0 && /*&& vérifier si deux conditions sont toutes les deux vraies*/
		// Quantité inférieure ou égale à 100
		quantitySelection.value <= 100 &&
		// Nombre entier
		quantitySelection.value == parseInt(quantitySelection.value) && /*analyse une chaîne de caractère fournie en argument et renvoie un entier */ /*L'égalité vérifie la valeur mais pas le type*/
		// Selection d'une couleur 
		colorSelection.value != 0 /*pour vérifier si une condition n'est pas vraie*/
		) {
		// Récupérer la quantité selectionnée 
		let selectionAmount = quantitySelection.value;

		//Récupérer la couleur selectionnée 
		let selectionColours = colorSelection.value;

		//Récupérer les renseignements de l'article et insérer dans le panier les couleurs et les quantités selectionnées 
		let overviewitem = { /*Création de ma variable*/
			itemId: object._id, /*item = produit*/
			itemColor: selectionColours, /*présent juste au dessus*/
			itemQuantity: Number(selectionAmount),
			itemName: object.name, /*Présent dans "Ajout du nom du canapé dans le "h1"*/
			itemPrice: object.price, /*Présent dans Ajout du prix dans le "p" - "span"*/
			itemDescription: object.description, /*Présent dans Ajout de la description dans le "p"*/
			itemImage: object.imageUrl, /*Présent dans Ajout de la photographie d'un canapé "img"*/
			itemAltImage: object.altTxt, /*Présent dans Ajout de la photographie d'un canapé "img"*/
		};

		//Initialisation du local storage
		let itemLocalStorage = JSON.parse(localStorage.getItem("item"));

		//Fenêtre pop-up pour confirmer
		const popupWindow = () => {
			if (
				window.confirm(
					`Votre selection de ${selectionAmount} ${object.name} ${selectionColours} est insérée au panier `
				)
			) {
				window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/')) + '/cart.html' /*renvoie directement vers la page panier sans passer par le html*/
			}
		};

		//Importation dans le local storage selon les conditions 

	if (itemLocalStorage) {
		const resultObtained = itemLocalStorage.find(
			(el) => /* el est juste un identifiant et il fait référence à un élément, un élément DOM, qui est une convention dans cette bibliothèque*/
				el.itemId === object.id && el.itemColor === selectionColours/*égalité stricte vérifie à la fois la valeur et le type, il s'arrete dès qu'il trouve l'élément*/
			);
			//L'article commandé est déjà dans le panier 
			if (resultObtained) {
				let newAmount =
					parseInt(overviewitem.itemQuantity) + 
					parseInt(resultObtained.itemQuantity);
				resultObtained.itemQuantity = newAmount;
				localStorage.setItem("item", JSON.stringify(itemLocalStorage)); /*Set objet permet de stocker des valeurs; JSON.stringify() convertit une valeur JavaScript en chaîne JSON*/
				popupWindow();
				//L'article n'est pas encore dans le panier
			} else {
				itemLocalStorage.push(overviewitem);
				localStorage.setItem("item", JSON.stringify(itemLocalStorage)); 
				popupWindow();
			}
			//Le panier est vide
		} else {
			itemLocalStorage = [];
			itemLocalStorage.push(overviewitem);
			localStorage.setItem("item", JSON.stringify(itemLocalStorage)); 
			popupWindow();
		}
	}
});












