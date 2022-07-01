// Intégration des éléments dans le HTML après la récupération des éléments dans l'API
(async function () { /* async et await gérer le code asynchrone de manière beaucoup plus intuitive, en bloquant l'exécution d'un code asynchrone jusqu'à ce qu'il retourne un résultat.*/
	const objects = await getObjects(); /* récupère les données*/
	for (object of objects) {/*boucle for of pour obtenir un tableau avec les éléments dans l'ordre*/ 
		insertObject(object);
	}
})();

// Utilisation de GET pour récupérer les produits grace à l'API
async function getObjects() { /*retourne un tableau avec tous les éléments*/ /*Ce code nous permet d'envoyer une requête HTTP de type GET au service web se trouvant à l'adresse */
	try {  /*Async et await permettent de gérer le code asynchrone en bloquant l'exécution d'un code*/
		const res = await fetch ("http://localhost:3000/api/products"); /*fetch retourne une promise ; récupère le résultat de la requete*/
		const objects = await res.json(); /*récupérer le résultat de la requête au format json*/
		return objects;
		}

	catch (error) { /*la promise n'est pas résolu : une fonction catch qui sera appelée s’il y a une erreur qui est survenue lors de la requête*/
		alert(
			"Erreur le port 3000 est-il chargé ?" /*Si l'API est éteinte il y a une erreur car le code n'est pas codé dans le HTML, importé de manière dynamique*/
			);
	};
}

// Affichage de la page avec le bon canapé (appeler dynamiquement le bon canapé)
function insertObject(object) { 
	// Ajout de l'élément "a" : lien avec l'id
	let productLink = document.createElement("a"); /*le lien est égal à l'id renvoyé par le backend*/
	document.querySelector(".items").appendChild(productLink); /*retourne le premier élement dans le document correspondant au sélecteur*/ /*appendChild()méthode Node interface ajoute un nœud à la fin de la liste des enfants d'un nœud parent spécifié, déplace de sa position actuelle vers la nouvelle position */
	productLink.href = `product.html?id=${object._id}`; /*?? pq pas 42*/


	// Ajout de l'élément "article" : agencement pour la visualisation des canapés
	let productArticle = document.createElement("article");
	productLink.appendChild(productArticle);

	// Ajout de l'élément "img" : image du canapé
	let productImg = document.createElement("img");
	productArticle.appendChild(productImg);
	productImg.src = object.imageUrl; /*imageURL vu sur la page du port 3000*/
	productImg.alt = object.altTxt;

	// Ajout de l'élément "h3" : nom du canapé
	let productName = document.createElement("h3"); /*créer un noeud*/
	productArticle.appendChild(productName); /*ajout du noeud a son noeud parent*/
	productName.classList.add("productName"); /*ajouter une liste*/
	productName.innerHTML = object.name; /*inner HTML pour insérer le HTML dans le document*/

	// Ajout de l'élément "p" : explication du canapé
	let productDescription = document.createElement("p");
	productArticle.appendChild(productDescription);
	productDescription.classList.add("productName");
	productDescription.innerHTML = object.description;
}
