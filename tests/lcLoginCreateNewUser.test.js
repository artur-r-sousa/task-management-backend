const bcrypt = require('bcrypt');
const { login_create_new_user } = require('../controllers/loginController');
const { getClient } = require('../db'); 
const asyncHandler = require('express-async-handler'); 

jest.mock('../db'); // Mocka o módulo do banco de dados
jest.mock('bcrypt'); // Mocka o módulo bcrypt

describe('Clients Controller', () => {
  let req, res, client;

  beforeEach(() => {
    req = {
      body: {
        user_first_name: 'John',
        user_last_name: 'Doe',
        user_email: 'john.doe@example.com',
        user_password: 'password123',
      },
    };

    res = {
      send: jest.fn(), 
    };

    client = {
      query: jest.fn(), 
    };

    getClient.mockReturnValue(client); 
  });

  test('deve criar um novo usuário com sucesso', async () => {
    const mockHash = 'hashed_password';
    bcrypt.hash.mockResolvedValue(mockHash); 

    const mockResult = { rows: [{ id: 1, first_name: 'John', last_name: 'Doe' }] };
    client.query.mockResolvedValue(mockResult); 

    await login_create_new_user(req, res); 

    expect(bcrypt.hash).toHaveBeenCalledWith(req.body.user_password.toString(), 10);
    expect(client.query).toHaveBeenCalledWith("INSERT INTO users (first_name, last_name, email, password_hash, role, created_at) VALUES($1, $2, $3, $4, $5, current_timestamp) RETURNING *",
      [req.body.user_first_name, req.body.user_last_name, req.body.user_email, mockHash, 'user']); 
    expect(res.send).toHaveBeenCalledWith(JSON.stringify({ status: true }));
  });

  test('deve lidar com erro ao criar usuário', async () => {
    bcrypt.hash.mockRejectedValue(new Error('Hash error'));

    await login_create_new_user(req, res); 

    expect(res.send).toHaveBeenCalledWith(JSON.stringify({ status: false }));
  });
});