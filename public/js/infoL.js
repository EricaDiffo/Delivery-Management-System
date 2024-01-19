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
              editLink.href = 'test.html';
              editLink.textContent = 'Deliver';
    
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
});*/

    
                  
              actionsCell.appendChild(editLink);
              //actionsCell.appendChild(document.createTextNode('|'));
              //actionsCell.appendChild(deleteLink);
             
    
              tableRow.appendChild(actionsCell);
    
              tableBody.appendChild(tableRow);
            });
            
          })
          .catch(error => {
            console.error('Une erreur s\'est produite lors du chargement des données :', error);
          });
          




