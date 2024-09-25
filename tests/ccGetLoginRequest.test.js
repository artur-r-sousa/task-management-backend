const { get_clients_request } = require('../controllers/clientController');
const { getClient } = require('../db'); 
const asyncHandler = require('express-async-handler'); 

jest.mock('../db'); 

describe('Clients Controller', () => {
  let req, res, client;

  beforeEach(() => {
    req = {
      params: {
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

  test('deve retornar a lista de clientes', async () => {
    const mockClients = [{ id: 1, name: 'Client 1' }, { id: 2, name: 'Client 2' }];
    client.query.mockResolvedValue({ rows: mockClients }); 

    await get_clients_request(req, res);

    expect(client.query).toHaveBeenCalledWith("SELECT * FROM clients WHERE user_id = $1", [req.params.userId]);
    expect(res.send).toHaveBeenCalledWith(JSON.stringify(mockClients));
  });

  test('deve lidar com erro na consulta ao banco de dados', async () => {
    const errorMessage = 'Database error';
    client.query.mockRejectedValue(new Error(errorMessage)); 

    console.log = jest.fn();

    await get_clients_request(req, res);

    expect(console.log).toHaveBeenCalledWith(errorMessage);
    expect(res.send).not.toHaveBeenCalled();
  });
});