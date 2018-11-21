import express from 'express';
import mysql from 'mysql';

const connection = mysql.createConnection({
  host: '192.168.64.2', // adresse du serveur
  user: 'root', // le nom d'utilisateur
  password: 'azerty123', // le mot de passe
  database: 'express_filrouge', // le nom de la base de données
});

const router = express.Router();

//1.ALL
router.get('/api/joueurs', (req, res) => {
  connection.query('SELECT * FROM barca_players', (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send('Erreur lors de la récupération des joueurs');
    } else {
      res.json(result);
    }
  })
});

//2.PAR NOM
router.get('/api/joueurs/name', (req, res) => {
  connection.query('SELECT name FROM barca_players', (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send('Erreur lors de la récupération des noms des joueurs');
    } else {
      res.json(result);
    }
  })
});

//3.PAR AGE
router.get('/api/joueurs/age', (req, res) => {
  connection.query('SELECT age FROM barca_players', (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send('Erreur lors de la récupération des ages des joueurs');
    } else {
      res.json(result);
    }
  })
});

//4.PAR AGE = 31 ANS
router.get('/api/joueurs/birthdate/31', (req, res) => {
  connection.query('SELECT * FROM barca_players WHERE age=31', (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send('Erreur lors de la récupération des ages des joueurs');
    } else {
      res.json(result);
    }
  })
});

//5.JUSTE SUAREZ
router.get('/api/joueurs/suarez', (req, res) => {
  connection.query('SELECT * FROM barca_players WHERE name LIKE "SUAREZ"', (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send('Erreur lors de la récupération de SUAREZ');
    } else {
      res.json(result);
    }
  })
});

//6.PAR SUPERIEUR
router.get('/api/joueurs/supp', (req, res) => {
  connection.query('SELECT * FROM barca_players WHERE age>25', (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send('Erreur lors de la récupération des ages des joueurs en dessus de 25 ans');
    } else {
      res.json(result);
    }
  })
});

//7.DONNÉES ORDONNÉES
router.get('/api/joueurs/ord', (req, res) => {
  connection.query('SELECT * FROM barca_players ORDER BY name DESC', (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send('Erreur lors de la récupération des joueurs par ordre decroissant');
    } else {
      res.json(result);
    }
  })
});

//8.POST
router.post('/api/add', (req, res) => {
  const formData = req.body;
  connection.query('INSERT INTO barca_players SET ?', formData, (err, res) => {
    if (err) {
      console.log(err);
      res.status(500).send('Erreur de l ajout');
    } else {
      res.sendStatus(200).send('Joueur ajouté avec succès!');
    }
  })
});

//9.PUT MODIF
router.put('/api/joueurs/:name', (req, res) => {
  const namePlayer = req.params.name;
  const formData = req.body;
  connection.query('UPDATE barca_players SET ? WHERE name = ?', [formData, namePlayer], (err, res) => {
    if (err) {
      console.log(err);
      res.status(500).send('Erreur lors de la modification d un joueur');
    } else {
      res.sendStatus(200).send('Joueur correctement modifié!');
    }
  })
});

//10.PUT BOOLEAN
router.put('/api/joueurs/titular/:name', (req, res) => {
  const namePlayer = req.params.name;
  const formData = req.body;
  connection.query('UPDATE barca_players SET titular=1 WHERE name = ?', [formData, namePlayer], (err, res) => {
    if (err) {
      console.log(err);
      res.status(500).send('Erreur lors de la modification d un joueur titulaire');
    } else {
      res.sendStatus(200).send('Joueur titulaire correctement modifié!');
    }
  })
});

//11.DELETE ENTITÉ
router.delete('/api/joueurs/delete/:id', (req, res) => {
  const idPlayer = req.params.id;
  connection.query('DELETE FROM barca_players WHERE id = ?', idPlayer, err => {
    if (err) {
      console.log(err);
      res.status(500).send('Erreur lors de la suppresion d un joueur');
    } else {
      res.sendStatus(200);
    }
  })
});

//12.DELETE ENTITÉ = BOOLEAN FALSE
router.delete('/api/joueurs/delete/titular/:id', (req, res) => {
  const idPlayer = req.params.id;
  connection.query('DELETE FROM barca_players SET titular=0 WHERE id = ?', idPlayer, (err, res) => {
    if (err) {
      console.log(err);
      res.status(500).send('Erreur lors de la suppresion d un joueur non-titulaire');
    } else {
      res.sendStatus(200).send('Joueur non-titulaire correctement supprimé!');
    }
  })
});


export default router;