/**
 * User Entity Model
 */
const { Model, DataTypes } = require('sequelize');
const { getSequelize } = require('../../bootstrap/database');
const bcrypt = require('bcrypt');

const sequelize = getSequelize();

/**
 * User model class
 */
class User extends Model {
  /**
   * Compare password with stored hash
   * @param {string} password - Plain text password to compare
   * @returns {Promise<boolean>} True if password matches
   */
  async comparePassword(password) {
    return bcrypt.compare(password, this.password);
  }
  
  /**
   * Get user profile (public data)
   * @returns {Object} User profile without sensitive data
   */
  getProfile() {
    const { password, ...profile } = this.toJSON();
    return profile;
  }
}

/**
 * Initialize User model
 */
User.init({
  // Model attributes
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
      len: [3, 50]
    }
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [8, 100]
    }
  },
  fullName: {
    type: DataTypes.STRING(100),
    allowNull: true,
    field: 'full_name'
  },
  role: {
    type: DataTypes.ENUM('user', 'admin'),
    defaultValue: 'user',
    allowNull: false
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    allowNull: false,
    field: 'is_active'
  },
  lastLoginAt: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'last_login_at'
  }
}, {
  // Model options
  sequelize,
  modelName: 'User',
  tableName: 'users',
  underscored: true,
  timestamps: true,
  paranoid: true, // Soft deletes
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at',
  defaultScope: {
    attributes: { exclude: ['password'] }
  },
  scopes: {
    withPassword: {
      attributes: { include: ['password'] }
    },
    active: {
      where: { isActive: true }
    }
  },
  hooks: {
    beforeCreate: async (user) => {
      if (user.password) {
        user.password = await bcrypt.hash(user.password, 10);
      }
    },
    beforeUpdate: async (user) => {
      if (user.changed('password')) {
        user.password = await bcrypt.hash(user.password, 10);
      }
    }
  }
});

/**
 * Define associations
 * This function will be called after all models are initialized
 */
User.associate = (models) => {
  // Example: User has many Tickets
  // User.hasMany(models.Ticket, {
  //   foreignKey: 'user_id',
  //   as: 'tickets'
  // });
};

module.exports = User;