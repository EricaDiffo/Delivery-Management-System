/*

// Récupérer l'identifiant de la ligne à partir de l'URL
const urlParams = new URLSearchParams(window.location.search);
const rowId = urlParams.get('id');

// Effectuer une requête AJAX pour récupérer les données de la ligne spécifique
fetch(`/donnees/${rowId}`)
  .then(response => response.json())
  .then(data => {
    // Remplir les zones de texte avec les données récupérées
    //document.getElementById('nom').value = data.nom;
    //document.getElementById('telephone').value = data.telephone;
    document.getElementById('goods').value = data.goods;
    document.getElementById('weight').value = data.weight;
    document.getElementById('date_Info').value = data.date_Info;
    document.getElementById('actualLocation').value = data.actualLocation;
    document.getElementById('deliveryLocation').value = data.deliveryLocation;
    document.getElementById('transportMode').value = data.transportMode;
  })
  .catch(error => {
    console.error('Une erreur s\'est produite lors du chargement des données de la ligne :', error);
  });*/
