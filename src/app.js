const express = require("express");
const db = require( './utilities/database');
/* const Countries = require('./models/countries.models')
 */
const Users = require ('./models/users.models');
const cors = require ('cors')

require('dotenv').config();
const PORT = process.env.PORT || 8000;

db.authenticate()
  .then( () => console.log( 'DB conectada' ) )
  .catch( ( err ) => console.log( err ) );

db.sync()
  .then( () => console.log( 'DB sincronizada' ) )
  .catch( ( err ) => console.log( err ) );

const app = express ();
app.use(cors());
app.use(express.json());

/* app.get ( '/', (req, res) => {
  res.send('OK')
}); */

/* app.get ('/countries', async (req, res, next) => {
  try {
    const countries = await Countries.findAll();
    res.json(countries);
  } catch (error) {
    next(error);    
  }
}) */
app.get ('/users', async (req, res, next) => {
  try {
    const users= await Users.findAll({
      attributes: {
        exclude: ['password']
      }
    });
    res.json(users);
  } catch (error) {
    res.status(400).json(error);   
  }
});

app.get ('/users/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const users= await Users.findByPk(id, {
      attributes: {
        exclude: ['password']
      }
    })
    res.json(users)
  } catch (error) {
    res.status(400).json(error);    
  }
});

app.get ('/users/lastName/:lastName', async (req, res, next) => {
  try {
    const { lastName } = req.params
    const users= await Users.findOne( {
      where: { lastName },
      attributes: { exclude: ['password'] }
    })
    res.json(users)
  } catch (error) {
    res.status(400).json(error);    
  }
});


app.post ('/users', async (req, res, next) => {
  try {
    const newUser = req.body;
    await Users.create(newUser);
    res.status(201).send();
  } catch (error) {
    res.status(400).json(error);    
  }
});

app.put ('/users/:id', async ( req, res , next ) => {
  try {
    const { id } = req.params
    const { firstName, lastName } = req.body
    await Users.update (
      { firstName, lastName },
      {
        where: { id }
      }
    )
    res.status(204).send()
  } catch (error) {
    res.status(400).json(error);    
  }
});

app.delete ('/users/:id', async ( req, res , next ) => {
  try {
    const { id } = req.params
    await Users.destroy ( {
      where: { id }
    })
    res.status(204).send()
  } catch (error) {
    res.status(400).json(error);    
  }
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`)
});
