const { DataTypes } = require('sequelize');
const { sequelize } = require('../db/db');
const bcrypt = require('bcrypt');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    surname: {
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    photo: {
        type: DataTypes.BLOB,
    },
    gender: {
        type: DataTypes.STRING(1),
    },
    birth_date: {
        type: DataTypes.DATE,
        get() {
            const rawDate = this.getDataValue('birth_date');
            return rawDate ? rawDate.toISOString().split('T')[0] : null;
          },
    },
    registred_at: {
        type: DataTypes.DATE,
        allowNull: false,
        get() {
            const rawDate = this.getDataValue('registred_at');
            return rawDate ? rawDate.toISOString().split('T')[0] : null;
          },
    },
    terms_accepted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    }
}, {
    tableName: 'users',
    timestamps: false,
    hooks: {
        beforeCreate: async (user) => {
            if (user.password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
        }
        },
        beforeUpdate: async (user) => {
            if (user.changed('password')) {
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(user.password, salt);
            }
        },
    }
});

// Function to compare password hashes
User.prototype.comparePassword = async function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password); 
  };

module.exports = User;
