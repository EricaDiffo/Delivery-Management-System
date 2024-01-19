const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
/*
function encryptPassword(password){
  const cipher=crypto.createCipher('aes-256-cbc','tipam2@2023xxxxxxxxxx237doualalogbessouiuc');
  let encryptedPassword=cipher.update(password,'utf8','hex');
  encryptedPassword+=cipher.final('hex');
  return encryptedPassword;
}

function decryptPassword(encryptedPassword){
  const decipher=crypto.createDecipher('aes-256-cbc','tipam2@2023xxxxxxxxxx237doualalogbessouiuc');
  let decryptedPassword=decipher.update(encryptedPassword,'hex','utf8');
  decryptedPassword+=decipher.final('utf8');
  return decryptedPassword;
}
*/
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'livraison'
});

connection.connect((err) => {
  if (err) {
    console.error('Erreur lors de la connexion à la base de données :', err);
    return;
  }
  console.log('Connexion à la base de données réussie !');
});



app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});


app.post('/connexion', (req, res) => {
  
  const emailL = req.body.emailL;
  const mdpL = req.body.mdpL;

  
  const query = 'SELECT * FROM livreur WHERE emailL = ? AND mdpL = ?';
  connection.query(query, [emailL, mdpL], (err, results) => {
    if (err) {
      console.error('Erreur lors de la requête de connexion :', err);
      res.send('Une erreur est survenue lors de la connexion.');
      return;
    }

    if (results.length > 0) {
      
      res.redirect('/infodonneeL.html');
      //res.send('Connexion réussie !');
    } else {
      
      res.send('Email ou mot de passe incorrect.');
      
    }
  });
});

app.post('/enregistrer', function(req, res) {
  const { nomL, emailL,telephoneL,vehicule,immatriculation,mdpL } = req.body;
  const sql = 'INSERT INTO livreur (nomL, emailL, telephoneL, vehicule, immatriculation, mdpL) VALUES (?, ?, ?, ?, ?, ?)';
  const values = [nomL, emailL,telephoneL,vehicule,immatriculation,mdpL];

  connection.query(sql, values, function(err, result) {
    if (err) {
      console.error('Erreur lors de l\'enregistrement des données : ' + err.stack);
      return;
    }

    console.log('Données enregistrées avec succès.');

    //res.send('Données enregistrées avec succès.');
    res.redirect('/infodonneeL.html');
  });
});

app.post('/enregistrerAdmin', function(req, res) {
  const { nomL, emailL,telephoneL,vehicule,immatriculation,mdpL } = req.body;
  const sql = 'INSERT INTO livreur (nomL, emailL, telephoneL, vehicule, immatriculation, mdpL) VALUES (?, ?, ?, ?, ?, ?)';
  const values = [nomL, emailL,telephoneL,vehicule,immatriculation,mdpL];

  connection.query(sql, values, function(err, result) {
    if (err) {
      console.error('Erreur lors de l\'enregistrement des données : ' + err.stack);
      return;
    }

    console.log('Données enregistrées avec succès.');

    //res.send('Données enregistrées avec succès.');
    res.redirect('Dash/Deliverer/Livreur.html');
  });
});

// app.post('/modifierAdmin', function(req, res) {
//   const { idl,nomL, emailL,telephoneL,vehicule,immatriculation,mdpL } = req.body;
//   const sql = 'UPDATE `livreur` SET `nomL`= ?,`emailL`= ? ,`telephoneL`=? ,`vehicule`=?,`immatriculation`=?,`mdpL`=? WHERE `id`=?';
//   const values = [idl,nomL, emailL,telephoneL,vehicule,immatriculation,mdpL];

//   connection.query(sql, values, function(err, result) {
//     if (err) {
//       console.error('Erreur lors de l\'enregistrement des données : ' + err.stack);
//       return;
//     }

//     console.log('Données enregistrées avec succès.');

//     //res.send('Données enregistrées avec succès.');
//     res.redirect('Dash/Deliverer/Livreur.html');
//   });
// });

app.post('/modifierAdmin', (req, res) => {
  const idl = req.body.idl;
  const nomL = req.body.nomL;
  const emailL = req.body.emailL;
  const telephoneL = req.body.telephoneL;
  const vehicule = req.body.vehicule;
  const immatriculation = req.body.immatriculation;
  const mdpL = req.body.mdpL;

  
  const query = 'UPDATE `livreur` SET `nomL`= ?,`emailL`= ? ,`telephoneL`=? ,`vehicule`=?,`immatriculation`=?,`mdpL`=? WHERE `id`=?';
  connection.query(query, [nomL, emailL, telephoneL, vehicule, immatriculation, mdpL, idl], (err, result) => {
    if (err) {
      console.error('Erreur lors de la modification des données du client :', err);
      res.send('Une erreur s\'est produite lors de la modification des données.');
      return;
    }
    console.log('Données du client modifiées avec succès.');
    console.log('Nombre de lignes modifiées :', result.affectedRows);
    //res.send('Les données du client ont été modifiées avec succès.');
    res.redirect('Dash/Deliverer/Livreur.html');
  });
});

app.post('/enregistrerInfo', function(req, res) {
  const { email,goods,weight,date_Info,actualLocation,deliveryLocation,transportMode } = req.body;
  
  const sql = 'INSERT INTO info (email,goods,weight,date_Info,actualLocation,deliveryLocation,transportMode) VALUES (?, ?, ?, ?, ?, ?, ?)';
  const values = [email,goods,weight,date_Info,actualLocation,deliveryLocation,transportMode];

  connection.query(sql, values, function(err, result) {
    if (err) {
      console.error('Erreur lors de l\'enregistrement des données : ' + err.stack);
      return;
    }

   // console.log('Information enregistrées avec succès.');
    res.redirect('/test.html');

    //res.send('Information enregistrées avec succès.');
  });
});

app.post('/connexionA', (req, res) => {
  const email = req.body.emailA;
  const mdp = req.body.mdpA;

  // Vérifier les informations de connexion dans la base de données
  const query = 'SELECT * FROM admin WHERE emailA = ? AND mdpA = ?';
  connection.query(query, [email, mdp], (err, results) => {
    if (err) {
      console.error('Erreur lors de la requête de connexion :', err);
      res.send('Une erreur est survenue lors de la connexion.');
      return;
    }

    if (results.length > 0) {
      // L'utilisateur est connecté avec succès
      //res.send('Connexion réussie !');
      res.redirect('/Dash/adminhub/index.html');
      
    } else {
      // Les informations de connexion sont incorrectes
      res.send('Email ou mot de passe incorrect.');
    }
  });
});

app.post('/connexionC', (req, res) => {
  const email = req.body.email;
  const mdp = req.body.mdp;

  // Vérifier les informations de connexion dans la base de données
  const query = 'SELECT * FROM client WHERE email = ? AND mdp = ?';
  connection.query(query, [email, mdp], (err, results) => {
    if (err) {
      console.error('Erreur lors de la requête de connexion :', err);
      res.send('Une erreur est survenue lors de la connexion.');
      return;
    }

    if (results.length > 0) {
      // L'utilisateur est connecté avec succès
      //res.send('Connexion réussie !');
      // res.redirect('/livraisoninfo.html');
      res.redirect('/infodonnee.html');
      
    } else {
      // Les informations de connexion sont incorrectes
      res.send('Email ou mot de passe incorrect.');
    }
  });
});

app.post('/enregistrerC', function(req, res) {
  const { nom, email,telephone,entreprise,mdp } = req.body;
  
  const sql = 'INSERT INTO client (nom, email, telephone, entreprise, mdp) VALUES (?, ?, ?, ?, ?)';
  const values = [nom, email,telephone,entreprise,mdp];

  connection.query(sql, values, function(err, result) {
    if (err) {
      console.error('Erreur lors de l\'enregistrement des données : ' + err.stack);
      return;
    }

    console.log('Données enregistrées avec succès.');
    //alert('Enregistrer avec succes')window.location.href='..//viewemp.php';
    
    //res.send('Données enregistrées avec succès.');
    res.redirect('/infodonnee.html');
  });
});

app.post('/forgot-password', (req, res) => {
  const email = req.body.emailL;

  
  const query = 'SELECT * FROM livreur WHERE emailL = ?';
  connection.query(query, [email], (error, results) => {
    if (error) {
      console.error('Erreur lors de la recherche de l\'email dans la base de données :', error);
      res.send('Une erreur s\'est produite. Veuillez réessayer plus tard.');
    } else {
      if (results.length > 0) {
        
        const password = results[0].mdpL; 

       
        res.send(`Votre mot de passe est : ${password}`);
      } else {
        
        res.send('Cet email n\'existe pas dans notre système.');
      }
    }
  });
});

app.post('/forgot-passwordC', (req, res) => {
  const email = req.body.email;

  
  const query = 'SELECT * FROM client WHERE email = ?';
  connection.query(query, [email], (error, results) => {
    if (error) {
      console.error('Erreur lors de la recherche de l\'email dans la base de données :', error);
      res.send('Une erreur s\'est produite. Veuillez réessayer plus tard.');
    } else {
      if (results.length > 0) {
        
        const password = results[0].mdp; 

        
        res.send(`Votre mot de passe est : ${password}`);
      } else {
        
        res.send('Cet email n\'existe pas dans notre système.');
      }
    }
  });
});

app.get('/donnees', (req, res) => {
  const query = 'SELECT nom, telephone, goods, weight, date_Info, actualLocation, deliveryLocation, transportMode FROM client c inner join info i on c.email=i.email';

  connection.query(query, (error, results) => {
    if (error) {
      console.error('Erreur lors de la récupération des données depuis la base de données :', error);
      res.status(500).json({ error: 'Une erreur s\'est produite lors de la récupération des données.' });
    } else {
      res.json(results);
    }
  });
});

app.get('/donneesClient', (req, res) => {
  const query = 'SELECT * FROM client ORDER BY nom ASC';

  connection.query(query, (error, results) => {
    if (error) {
      console.error('Erreur lors de la récupération des données depuis la base de données :', error);
      res.status(500).json({ error: 'Une erreur s\'est produite lors de la récupération des données.' });
    } else {
      res.json(results);
    }
  });
});

app.get('/donneesLivreur', (req, res) => {
  const query = 'SELECT * FROM livreur ORDER BY nomL ASC';

  connection.query(query, (error, results) => {
    if (error) {
      console.error('Erreur lors de la récupération des données depuis la base de données :', error);
      res.status(500).json({ error: 'Une erreur s\'est produite lors de la récupération des données.' });
    } else {
      res.json(results);
    }
  });
});

app.get('/donneesClientInfo', (req, res) => {
  const query = 'SELECT nom, telephone, goods, weight, actualLocation, deliveryLocation , date_Info, transportMode FROM client c inner join info i on c.email=i.email ORDER BY nom ASC';

  connection.query(query, (error, results) => {
    if (error) {
      console.error('Erreur lors de la récupération des données depuis la base de données :', error);
      res.status(500).json({ error: 'Une erreur s\'est produite lors de la récupération des données.' });
    } else {
      res.json(results);
    }
  });
});

  app.post('/modifinfo', (req, res) => {
    const email = req.body.email;
    const goods = req.body.goods;
    const weight = req.body.weight;
    const dateInfo = req.body.date_Info;
    const actualLocation = req.body.actualLocation;
    const deliveryLocation = req.body.deliveryLocation;
    const transportMode = req.body.transportMode;
  
    
    const query = 'UPDATE info SET goods = ?, weight = ?, date_Info = ?, actualLocation = ?, deliveryLocation = ?, transportMode = ? WHERE email = ?';
    connection.query(query, [goods, weight, dateInfo, actualLocation, deliveryLocation, transportMode, email], (err, result) => {
      if (err) {
        console.error('Erreur lors de la modification des données du client :', err);
        res.send('Une erreur s\'est produite lors de la modification des données.');
        return;
      }
      console.log('Données du client modifiées avec succès.');
      console.log('Nombre de lignes modifiées :', result.affectedRows);
      //res.send('Les données du client ont été modifiées avec succès.');
      res.redirect('/infodonnee.html');
    });
  });
  
  app.post('/infosupprimer', (req, res) => {
    const email = req.body.email;
  
    
    const query = 'DELETE FROM info WHERE email = ?';
    connection.query(query, [email], (err, result) => {
      if (err) {
        console.error('Erreur lors de la suppression des informations de l\'utilisateur :', err);
        res.send('Une erreur s\'est produite lors de la suppression des informations.');
        return;
      }
      //console.log('Informations de l\'utilisateur supprimées avec succès.');
      console.log('Nombre de lignes supprimées :', result.affectedRows);
      //res.send('Les informations de l\'utilisateur ont été supprimées avec succès.');
      res.redirect('/infodonnee.html');
    });
  });

  app.post('/infosupprimerC', (req, res) => {
    const idc = req.body.idc;
  
    
    const query = 'DELETE FROM client WHERE id = ?';
    connection.query(query, [idc], (err, result) => {
      if (err) {
        console.error('Erreur lors de la suppression des informations de l\'utilisateur :', err);
        res.send('Une erreur s\'est produite lors de la suppression des informations.');
        return;
      }
      //console.log('Informations de l\'utilisateur supprimées avec succès.');
      console.log('Nombre de lignes supprimées :', result.affectedRows);
      //res.send('Les informations de l\'utilisateur ont été supprimées avec succès.');
      res.redirect('Dash/Customer/client.html');
    });
  });

  app.post('/infosupprimerL', (req, res) => {
    const idl = req.body.idl;
  
    
    const query = 'DELETE FROM livreur WHERE id = ?';
    connection.query(query, [idl], (err, result) => {
      if (err) {
        console.error('Erreur lors de la suppression des informations de l\'utilisateur :', err);
        res.send('Une erreur s\'est produite lors de la suppression des informations.');
        return;
      }
      //console.log('Informations de l\'utilisateur supprimées avec succès.');
      console.log('Nombre de lignes supprimées :', result.affectedRows);
      //res.send('Les informations de l\'utilisateur ont été supprimées avec succès.');
      res.redirect('Dash/Deliverer/Livreur.html');
    });
  });

// Démarrer le serveur
app.listen(3000, () => {
  console.log('Serveur démarré sur le port 3000');
});