const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const userRoutes = require('../routes/userRoutes');
require('dotenv').config({ path: '.env.test' });

const app = express();
app.use(express.json());
app.use('/api/users', userRoutes);

let token;

beforeAll(async () => {
  // Crear un usuario de prueba
  const hashedPassword = await bcrypt.hash('securepassword123', 10);
  const user = await User.create({
    name: 'Admin',
    lastName: 'User',
    email: 'admin@example.com',
    password: hashedPassword,
    role: 'admin',
    birthdate: '1990-01-01',
    status: true
  });
  const jwtSecret = process.env.JWT_SECRET || 'TEST_SWIPE_MUSIC';
  // Generar un token JWT para el usuario de prueba
  token = jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    jwtSecret,
    { expiresIn: '7d' }
  );
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('User Controller', () => {
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/users/')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'securepassword123',
        role: 'user',
        birthdate: '1990-01-01',
        status: true
      });
    
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('data');
    expect(res.body.data).toHaveProperty('user');
    expect(res.body.data.user).toHaveProperty('email', 'john.doe@example.com');
  });

  it('should not register a user with an existing email', async () => {
    await User.create({
      name: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'securepassword123',
      role: 'user',
      birthdate: '1990-01-01',
      status: true
    });

    const res = await request(app)
      .post('/api/users/')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Jane',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'securepassword123',
        role: 'user',
        birthdate: '1990-01-01',
        status: true
      });

    expect(res.statusCode).toEqual(409);
    expect(res.body).toHaveProperty('message', 'There is already a user with that email');
  });

  it('should login a user', async () => {
    const hashedPassword = await bcrypt.hash('securepassword123', 10);
    await User.create({
      name: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: hashedPassword,
      role: 'user',
      birthdate: '1990-01-01',
      status: true
    });

    const res = await request(app)
      .post('/api/users/login')
      .send({
        email: 'john.doe@example.com',
        password: 'securepassword123'
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('data');
    expect(res.body.data).toHaveProperty('token');
    expect(res.body.data).toHaveProperty('user');
    expect(res.body.data.user).toHaveProperty('email', 'john.doe@example.com');
  });

  it('should not login a user with incorrect password', async () => {
    const hashedPassword = await bcrypt.hash('securepassword123', 10);
    await User.create({
      name: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: hashedPassword,
      role: 'user',
      birthdate: '1990-01-01',
      status: true
    });

    const res = await request(app)
      .post('/api/users/login')
      .send({
        email: 'john.doe@example.com',
        password: 'wrongpassword'
      });

    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty('message', 'Invalid credentials');
  });

  it('should get a list of users', async () => {
    const res = await request(app)
      .get('/api/users/')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('data');
    expect(res.body.data).toHaveProperty('users');
    expect(Array.isArray(res.body.data.users)).toBe(true);
  });
});