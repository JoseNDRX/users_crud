const db = require('../utilities/database');
const { DataTypes } = require ( 'sequelize' );

const Countries = db.define( 'countries', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(30),
    allowNull: false
  }
},
  {
    timestamps: false
  }
);

module.exports = Countries;