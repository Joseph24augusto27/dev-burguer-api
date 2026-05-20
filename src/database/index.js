import mongoose from 'mongoose';
import { Sequelize } from 'sequelize';
import Category from '../app/models/Category.js';
import Product from '../app/models/Product.js';
import User from '../app/models/User.js';
import databaseConfig from '../config/database.cjs';

const models = [User, Product, Category];

class Database {
  constructor() {
    this.init();
    this.mongo();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models),
      );
  }

  mongo() {
    mongoose.connection.on('connected', () =>
      console.log('MongoDB connected successfully'),
    );

    mongoose.connection.on('error', (err) =>
      console.error('MongoDB connection error:', err),
    );

    mongoose.connection.on('disconnected', () => {
      console.warn('MongoDB disconnected. Reconnecting...');
      setTimeout(() => this.mongo(), 5000);
    });

    this.mongooseConnection = mongoose.connect(
      'mongodb://127.0.0.1:27017/devburguer', // troca localhost por 127.0.0.1
      {
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
      },
    );
  }
}

export default new Database();
