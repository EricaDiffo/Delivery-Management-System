fetch('/donnees')
          .then(response => response.json())
          .then(data => {
            const tableBody = document.querySelector('#table-body');
            data.forEach(row => {
              const tableRow = document.createElement('tr');
              const columns = ['nom', 'telephone', 'goods', 'weight', 'date_Info', 'actualLocation', 'deliveryLocation', 'transportMode'];
              columns.forEach(column => {
                const tableData = document.createElement('td');
                tableData.textContent = row[column];
                tableRow.appendChild(tableData);
              });
    
              const actionsCell = document.createElement('td');
              const editLink = document.createElement('a');
              editLink.href = 'modificationinfo.html';
              editLink.textContent = 'Modifier';
    
              //const deleteLink = document.createElement('a');
              //deleteLink.href = 'suppimezinfo.html';
              //deleteLink.href = '#';
              //deleteLink.textContent = 'Supprimer';

           /*
              const deleteLink = document.createElement('a');
deleteLink.href = '#';
deleteLink.textContent = 'Supprimer';
deleteLink.addEventListener('click', () => {
  deleteRowFromDatabase(row.id); 
  deleteRowFromTable(tableRow);
});

    
                  
              actionsCell.appendChild(editLink);
             // actionsCell.appendChild(document.createTextNode('|'));
             // actionsCell.appendChild(deleteLink);
             */
    
              //tableRow.appendChild(actionsCell);
    
              tableBody.appendChild(tableRow);
            });
            
          })
          .catch(error => {
            console.error('Une erreur s\'est produite lors du chargement des données :', error);
          });
          

/*

          function deleteRowFromDatabase(rowId) {
    fetch(`/donneesinfo/${rowId}`, { method: 'DELETE' })
      .then(response => {
        if (response.ok) {
          console.log('Ligne supprimée de la base de données avec succès.');
        } else {
          console.error('Une erreur s\'est produite lors de la suppression de la ligne de la base de données.');
        }
      })
      .catch(error => {
        console.error('Une erreur s\'est produite lors de la suppression de la ligne de la base de données :', error);
      });
  }

  function deleteRowFromTable(tableRow) {
    tableRow.remove();
  }*/

