const { add_client_request } = require('../controllers/clientController');
const { getClient } = require('../db'); 
const asyncHandler = require('express-async-handler'); 

jest.mock('../db');

describe('Clients Controller', () => {
  let req, res, client;

  beforeEach(() => {
    req = {
      body: {
        client_name: 'New Client',
        client_email: 'client@example.com',
        client_phone: '123456789',
        client_address: '123 Main St',
        userId: '1',
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

  test('deve adicionar um novo cliente com sucesso', async () => {
    const mockResult = { rows: [{ id: 1, name: 'New Client' }] };
    client.query.mockResolvedValue(mockResult);

    await add_client_request(req, res); 

    expect(client.query).toHaveBeenCalledWith("INSERT INTO clients (name, email, phone, address, created_at, last_interaction, user_id) VALUES($1, $2, $3, $4, current_timestamp, current_timestamp, $5) RETURNING *",
      [req.body.client_name, req.body.client_email, req.body.client_phone, req.body.client_address, req.body.userId]); 
    expect(res.send).toHaveBeenCalledWith(JSON.stringify({ status: true })); 
  });

  test('deve lidar com erro ao adicionar cliente', async () => {
    client.query.mockRejectedValue(new Error('Database error')); 

    await add_client_request(req, res);

    expect(res.send).toHaveBeenCalledWith(JSON.stringify({ status: false })); 
  });
});