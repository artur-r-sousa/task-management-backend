require("dotenv").config();
const bcrypt = require('bcrypt');
const { login_request } = require('../controllers/loginController');
const { getClient } = require('../db'); 
const asyncHandler = require('express-async-handler'); 

jest.mock('../db');
jest.mock('bcrypt');

describe('Clients Controller', () => {
  let req, res, client;

  beforeEach(() => {
    req = {
      body: {
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

  test('deve autenticar um usuário com sucesso', async () => {
    const mockResult = { rows: [{ password_hash: process.env.TEST_HASH_PASSWORD }] };
    client.query.mockResolvedValue(mockResult);

    bcrypt.compare.mockImplementation((password, hash, callback) => {
      callback(null, true); 
    });

    await login_request(req, res); 

    expect(client.query).toHaveBeenCalledWith("SELECT email, password_hash FROM users WHERE email = $1", [req.body.user_email]); 
    expect(bcrypt.compare).toHaveBeenCalledWith(req.body.user_password, mockResult.rows[0].password_hash, expect.any(Function)); 
    expect(res.send).toHaveBeenCalledWith(JSON.stringify({ status: true })); 
  });

  test('deve retornar status falso quando o usuário não existe', async () => {
    const mockResult = { rows: [] }; 
    client.query.mockResolvedValue(mockResult); 

    await login_request(req, res); 

    expect(res.send).toHaveBeenCalledWith(JSON.stringify({ status: false })); 
  });

  test('deve retornar status falso quando a senha está incorreta', async () => {
    const mockResult = { rows: [{ password_hash: 'hashed_password' }] };
    client.query.mockResolvedValue(mockResult);
  
    
    bcrypt.compare.mockImplementation((password, hash, callback) => {
      callback(null, false); 
    });
  
    await login_request(req, res); 
  
    expect(client.query).toHaveBeenCalledWith("SELECT email, password_hash FROM users WHERE email = $1", [req.body.user_email]);
    expect(bcrypt.compare).toHaveBeenCalledWith(req.body.user_password, mockResult.rows[0].password_hash, expect.any(Function));
    expect(res.send).toHaveBeenCalledWith(JSON.stringify({ status: false }));
  });
});