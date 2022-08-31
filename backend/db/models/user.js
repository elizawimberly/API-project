"use strict";
const { Model, Validator } = require("sequelize");
const bcrypt = require("bcryptjs");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    //  This method will return an object with only the User instance information that is safe to save to a JWT, like id, username, and email:
    toSafeObject() {
      const { id, username, firstName, lastName, email } = this; // context will be the User instance
      return { id, username, firstName, lastName, email };
    }
    // instance method will return true if there is a match with the User instance's hashedPassword, otherwise false:
    validatePassword(password) {
      return bcrypt.compareSync(password, this.hashedPassword.toString());
    }
    // It should use the currentUser scope to return a User with that id.
    static getCurrentUserById(id) {
      return User.scope("currentUser").findByPk(id);
    }
    //method should search for one User with the specified credential (either a username or an email). If a user is found, then the method should validate the password by passing it into the instance's .validatePassword method. If the password is valid, then the method should return the user by using the currentUser scope.
    static async login({ credential, password }) {
      const { Op } = require("sequelize");
      const user = await User.scope("loginUser").findOne({
        where: {
          [Op.or]: {
            username: credential,
            email: credential,
          },
        },
      });
      if (user && user.validatePassword(password)) {
        return await User.scope("currentUser").findByPk(user.id);
      }
    }
    // Define a static method signup that accepts an object with a username, email, and password key. Hash the password using the bcryptjs package's hashSync method. Create a User with the username, email, and hashedPassword. Return the created user using the currentUser scope.
    static async signup({ username, email, firstName, lastName, password }) {
      const hashedPassword = bcrypt.hashSync(password);
      const user = await User.create({
        username,
        email,
        firstName,
        lastName,
        hashedPassword,
      });
      return await User.scope("currentUser").findByPk(user.id);
    }
    //associations
    static associate(models) {
      // define association here
      //user hasMany spots
      User.hasMany(models.Spot, { foreignKey: "ownerId" });
      User.belongsToMany(models.Spot, {
        through: models.Booking,
      });
      User.belongsToMany(models.Spot, {
        through: models.Review,
      });
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: [4, 30],
          isNotEmail(value) {
            if (Validator.isEmail(value)) {
              throw new Error("Cannot be an email.");
            }
          },
        },
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 50],
        },
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 50],
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: [3, 256],
          isEmail: true,
        },
      },
      hashedPassword: {
        type: DataTypes.STRING.BINARY,
        allowNull: false,
        validate: {
          len: [60, 60],
        },
      },
    },
    {
      sequelize,
      modelName: "User",
      defaultScope: {
        //
        attributes: {
          exlude: ["hashedPassword", "email", "createdAt", "updatedAt"],
        },
      },
      scopes: {
        currentUser: {
          attributes: {
            exlude: ["hashedPassword"],
          },
        },
        loginUser: {
          attributes: {},
        },
      },
    }
  );
  return User;
};
