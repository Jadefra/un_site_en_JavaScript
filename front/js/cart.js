//Initialisation du local storage
let itemLocalStorage = JSON.parse(localStorage.getItem("item")); /*Renvoie la valeur associée à la clé passée en paramètre*/

// Renforcer la sécurité du formulaire
const inspectFirstNameLastNameTown = (value) => {
	return /^([A-Z a-z]{3,20})?([-]{0,1})?([A-Z a-z]{3,20})$/.test(value); /*regex ^ commence par n'importe quel lettre tant qu'elle est comprise entre az/AZ min 3 caractère */
}; /* ? est optionnel . test sur l'expression reg que tu viens de definir + au moins une fois*/

const inspectAdress = (value) => {
	return /^[A-Za-z0-9\s]{3,100}$/.test(value);
};

const inspectEmail = (value) => {
	return /^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$/.test(value);
};

// Organisation du panier
function getCart() {
	// Si le panier est absolument vide 
	if (itemLocalStorage === null || itemLocalStorage == 0) { /*|| pour vérifier si au moins une condition est vraie */
		let itemEmptyBasket = document.querySelector("#cart__items"); /*Création de ma variable*/
		itemEmptyBasket.innerHTML = "votre panier est actuellement vide... Souhaitez-vous une assistance ? ";
		itemEmptyBasket.style.textAlign = "center"; 
		itemEmptyBasket.style.fontWeight = "bold"; /*gras*/
		itemEmptyBasket.style.fontSize = "32px"; 
	} // Si le panier contient des articles
	else {
		for (let item in itemLocalStorage) { /*Démarre automatiquement à zéro, et s'incrémente à chaque boucle, l'indice précis d'un élément est nécessaire*/ 
			// Insertion de l'élément article class et data-id="{product-ID}"
		let productObject = document.createElement("article");
		document.querySelector("#cart__items").appendChild(productObject);
		productObject.className = "cart__items";
		productObject.setAttribute(/*Définit la valeur d'un attribut sur l'élément spécifié. Si l'attribut existe déjà, la valeur est mise à jour*/
			"data-id",
			itemLocalStorage[item].itemId /*??*/
		);

		// Insertion de la div class qui comporte l'élément img
		let productImg = document.createElement("div");
		productObject.appendChild(productImg);
		productImg.className = "cart__item__img";

		//Insertion de l'image du produit 
		let productSofa = document.createElement("img");
		productImg.appendChild(productSofa);
		productSofa.src = itemLocalStorage[item].itemImage;
		productSofa.alt = itemLocalStorage[item].itemAltImage;

		//Insertion de la div class "content"
		let productCartItemContent = document.createElement("div");
		productObject.appendChild(productCartItemContent);
		productCartItemContent.className = "cart__item__content";

		//Insertion de la div class qui comporte la description d'un article (h2, p, p)
		let productCartItemDescription = document.createElement("div");
		productCartItemContent.appendChild(productCartItemDescription);
		productCartItemDescription.className = "cart__item__content__description";

		//Insertion du nom de canapé "h2"
		let productHdeux = document.createElement("h2");
		productCartItemDescription.appendChild(productHdeux);
		productHdeux.innerHTML = itemLocalStorage[item].itemName;

		//Insertion de la couleur du canapé "p"
		let productColored = document.createElement("p");
		productCartItemDescription.appendChild(productColored);
		productColored.innerHTML = itemLocalStorage[item].itemColor;
		productColored.style.fontSize = "16px";

		//Insertion du prix du canapé "p"
		let productRate = document.createElement("p");
		productCartItemDescription.appendChild(productRate);
		productRate.innerHTML = itemLocalStorage[item].itemPrice + "€";

		//La div class "cart__item__content__settings"
		let productContentSettings = document.createElement("div");
		productCartItemContent.appendChild(productContentSettings);
		productContentSettings.className = "cart__item__content__settings";

		//La div class "cart__item__content__settings__quantity"
		let productContentSettingsQuantity = document.createElement("div");
		productContentSettings.appendChild(productContentSettingsQuantity);
		productContentSettingsQuantity.className = "cart__item__content__settings__quantity";

		//Inserion de l'écriture quantité
		let productWritingQuantity = document.createElement("p");
		productContentSettingsQuantity.appendChild(productWritingQuantity);
		productWritingQuantity.innerHTML = "Qté  : ";

		//Insertion de la quantité avec l'"input"
		let productQuantityInput = document.createElement("input");
		productContentSettingsQuantity.appendChild(productQuantityInput);
		productQuantityInput.value = itemLocalStorage[item].itemQuantity;
		productQuantityInput.className = "itemQuantity";
		productQuantityInput.setAttribute("type", "number");
		productQuantityInput.setAttribute("name", "itemQuantity");
		productQuantityInput.setAttribute("min", "1");
		productQuantityInput.setAttribute("max", "100");

		//Insertion de la div class "cart__item__content__settings__delete"
		let productCartItemContentSettingsDelete = document.createElement("div");
		productContentSettings.appendChild(productCartItemContentSettingsDelete);
		productCartItemContentSettingsDelete.className = "cart__item__content__settings__delete";

		//Suppression de la totalité d'une référence article 
		let productRemove = document.createElement("p");
		productCartItemContentSettingsDelete.appendChild(productRemove);
		productRemove.className = "deleteItem";
		productRemove.innerHTML = "Supprimer";

		}
	}
}

getCart (); 

function overallQuantity() {
	// Récupérer de la quantité total
	const sofaQuantity = document.getElementsByClassName("itemQuantity"); /*const récupère juste un élément du dom; let permet de rechanger ta variable*/
	const sofaLength = sofaQuantity.length;/*contient la longueur de la chaîne, en unités de code UTF-16*/
	totalQuantity = 0; /*? et const ou var pq commencer à 0*/


	for (let i = 0; i < sofaLength; ++i) { /*?? var ou const Une variable d'indice i sert de compteur pour le nombre d'exécutions de la boucle. C'est pour cette raison qu'elle démarrera à zéro, car on n'a pas encore parcouru la boucle, l'exécuter autant de fois qu'il y a de passagers (l'ordre n'a pas d'importance); i++ ajouter 1*/
		totalQuantity += sofaQuantity[i].valueAsNumber; /*+= la valeur à droite va être ajoutée à la première valeur */		
	} /*valueAsNumber renvoie la valeur de l'élément, un nombre ou NaN si la conversion est impossible*/

	let productTotalQuantity = document.getElementById("totalQuantity");
	productTotalQuantity.innerHTML = totalQuantity;

	//Disposer du prix total
	totalPrice = 0;

	for (let i = 0; i < sofaLength; ++i) {
		totalPrice += sofaQuantity[i].valueAsNumber * itemLocalStorage[i].itemPrice;
	}

	let productTotalPrice = document.getElementById("totalPrice");
  	productTotalPrice.innerHTML = totalPrice;
}	

overallQuantity();

//Supprimer un article 
function eraseItem() {
	let eraseKnob = document.querySelectorAll(".deleteItem"); /*?? Puis je faire document.getElementsByClassName*/

	for (let j = 0; j < eraseKnob.length; j++) { /*?? Changer de lettre*/
		eraseKnob[j].addEventListener("click", (event) => { /*réagir lors d'un clic sur un élément (écouter) notre callback prend en paramètre event (qui sera appelée à chaque fois que l'utilisateur cliquera sur le lien)*/
			event.preventDefault();/*à n'importe quelle étape du flux d'événements annule l'événement*/

			//Selection de la donnée à supprimer en fonction de l'id et de la couleur
			let idErase = itemLocalStorage[j].itemId;
			let colorErase = itemLocalStorage[j].itemColor;

			itemLocalStorage = itemLocalStorage.filter(
				(el) => el.itemId !== idErase || el.itemColor !== colorErase /*|| pour vérifier si au moins une condition est vraie !== inégalité qui vérifie simplement la valeur*/
			); /*??*/

			localStorage.setItem("item", JSON.stringify(itemLocalStorage)); /*ajoutera cette clé à l' Storage objet donné ou mettra à jour la valeur de cette clé ; stringify convertit un objet ou une valeur JavaScript en une chaîne JSON*/

			//Avertissement de l'article supprimé
			alert("Cet article est supprimé de votre panier");
			location.reload(); /*Rafraichit*/
		});
	}
}
eraseItem();

//Modifier la quantité d'un article
function changeQuantity() {
	let modifyQuantity = document.querySelectorAll(".itemQuantity");

	for (let k = 0; k < modifyQuantity.length; k++) {
		modifyQuantity[k].addEventListener("change", (event) => {
			event.preventDefault();

			//Selection de la donnée à modifier en fonction de l'id et de la couleur
			let quantityChange = itemLocalStorage[k].itemQuantity; /*?? mieux comprendre*/
			let quantityModifValue = modifyQuantity[k].valueAsNumber;

			const resultGet = itemLocalStorage.find( /*find() renvoie la valeur du premier élément trouvé*/
				(el) => el.quantityModifValue !== quantityChange /*!== inégalité qui vérifie simplement la valeur*/
			);

			resultGet.itemQuantity = quantityModifValue;
			itemLocalStorage[k].itemQuantity = resultGet.itemQuantity;

			localStorage.setItem("item", JSON.stringify(itemLocalStorage)); /*ajoutera cette clé à l' Storage objet donné ou mettra à jour la valeur de cette clé ; stringify convertit un objet ou une valeur JavaScript en une chaîne JSON*/

			location.reload(); /*Rafraichit*/
		});
	}
}
changeQuantity();

formToFill();

function formToFill() {
	if (itemLocalStorage === null || itemLocalStorage == 0) { /*|| pour vérifier si au moins une condition est vraie == égalité simple uniquelement la valeur === égalité stricte*/
		alert("Le panier est vide veuillez insérer la quantité souhaitée afin de poursuivre vos achats");
	} else {
		// Lorsqu'on clic sur le bouton commander pour adresser le formulaire
		const orderKnob = document.querySelector("#order");
		orderKnob.addEventListener("click", (valid) => {
			valid.preventDefault();
		
			const products = []
			for( var i=0;i<itemLocalStorage.length;i++){ /*Chercher local storage et pusher dans la const product*/ 
				products.push({productId : itemLocalStorage[i].itemId});
			}

			const contact = {
				firstName: document.querySelector("#firstName").value,
        		lastName: document.querySelector("#lastName").value,
        		address: document.querySelector("#address").value,
        		city: document.querySelector("#city").value,
        		email: document.querySelector("#email").value,
			};
			const firstNameOk = contact.firstName;
			const lastNameOk = contact.lastName;
			const addressOk = contact.address;
			const cityOk = contact.city;
			const emailOk = contact.email;

			//Intégration des informations afin d'avertir si la saisie est correct ou non
			const controlFirstName = document.querySelector("#firstNameErrorMsg");
      		const controllastName = document.querySelector("#lastNameErrorMsg");
     		const controlAddress = document.querySelector("#addressErrorMsg");
      		const controlCity = document.querySelector("#cityErrorMsg");
      		const controlEmail = document.querySelector("#emailErrorMsg");

      		if (inspectFirstNameLastNameTown(firstNameOk)) {
      			controlFirstName.innerHTML = "Valider";
      		} else {
      			controlFirstName.innerHTML = "Vos données sont incorrectes, merci de bien vouloir les modifier";
      		}
      		if (inspectFirstNameLastNameTown(lastNameOk)) {
      			controllastName.innerHTML = "Valider";
      		} else {
      			controllastName.innerHTML = "Vos données sont incorrectes, merci de bien vouloir les modifier";
      		}
      		if (inspectAdress(addressOk)) {
      			controlAddress.innerHTML = "Valider";
      		} else {
      			controlAddress.innerHTML = "Vos données sont incorrectes, merci de bien vouloir les modifier";
      		}
      		if (inspectFirstNameLastNameTown(cityOk)) {
      			controlCity.innerHTML = "Valider";
      		} else {
      			controlCity.innerHTML = "Vos données sont incorrectes, merci de bien vouloir les modifier";
      		}
      		if (inspectEmail(emailOk)) {
      			controlEmail.innerHTML = "Valider";
      		} else {
      			controlEmail.innerHTML = "Vos données sont incorrectes, merci de bien vouloir les modifier";
      		}
      		let contacts = []; /*?? infini*/
      		
      			contacts.push(contact); /*??La push()méthode ajoute un ou plusieurs éléments à la fin d'un tableau et renvoie la nouvelle longueur du tableau.*/
      		
      		const submitContactForm = {
      			contact,
				products
      		};

      		//Expédier le formulaire dans le localStorage (seulement si les coordonnées sont correctes)
      		if (
      			inspectFirstNameLastNameTown(firstNameOk) &
      			inspectFirstNameLastNameTown(lastNameOk) &
      			inspectAdress(addressOk) &
      			inspectFirstNameLastNameTown(cityOk) &
      			inspectEmail(emailOk)
      		) {
      			localStorage.setItem("contact", JSON.stringify(contact)); /*ajoutera cette clé à l' Storage objet donné ou mettra à jour la valeur de cette clé ; stringify convertit un objet ou une valeur JavaScript en une chaîne JSON*/

      			return fetch("http://localhost:3000/api/products/order", {/*?? order*/
      				method: "POST", /*créer ou modifier une ressource*/
      				headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json' /*j'envoie json  */
      				},
      				body: JSON.stringify(submitContactForm), /* envoie au server stringify transformer en json  */
      			}) 
      				.then((response) => response.json())
      				.then ((order) => {
      					localStorage.setItem("orderId", order.orderId);
      					window.location.href = /*renvoie directement vers la page confirmation sans passer par le html*/
      						"confirmation.html" + "?" + "name" + "=" + order.orderId;
      					localStorage.clear(); /*Supprimez tous les éléments du stockage local*/
      				})
      				.catch((err) => ("Il y a un dysfonctionnement: ", err));			
      		} else {
      			alert("Veuillez corriger vos informations présent dans le formulaire");
      		}
		});
	}
}
















