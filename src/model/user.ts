import { Model, DataTypes, Sequelize, Optional } from 'sequelize'

export interface IUser {
  id: number
  username: string
  password: string
}

interface IUserCreation extends Optional<IUser, 'id'> {}

const generateUser = async (db: Sequelize) => {
  class User extends Model<IUser, IUserCreation> implements IUser {
    id!: number
    username!: string
    password!: string
  }
  
  User.init({
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    password: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
  }, {
    sequelize: db,
    freezeTableName: true
  })

  await User.sync()
  
  return User
}

export default generateUser
