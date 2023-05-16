const db = require ('../utilities/database')
const { DataTypes } = require('sequelize')

const Users = db.define ('users', {
  id:{
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  firstName:{
    type: DataTypes.STRING(30),
    allowNull: false
  },
  lastName:{
    type: DataTypes.STRING(30),
    allowNull: false
  },
  email:{
    type: DataTypes.STRING(50),
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  password:{
    type: DataTypes.STRING,
    allowNull: false
  }
},
  {
    timestamps: false
  }
);

module.exports = Users;