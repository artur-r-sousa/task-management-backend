const asyncHandler = require("express-async-handler");
const { getClient } = require('../db');

exports.get_clients_request = asyncHandler(async (req, res) => {
  const client = await getClient();

  try {
    const clients = await client.query("SELECT * FROM clients WHERE user_id = $1", [req.params.userId])
    res.send(JSON.stringify(clients.rows))

  } catch (err) {
    console.log(err.message)
  }

});

exports.add_client_request = asyncHandler(async (req, res) => {
  const client = await getClient();
  const data = req.body
  try {

    const result = await client.query("INSERT INTO clients (name, email, phone, address, created_at, last_interaction, user_id) VALUES($1, $2, $3, $4, current_timestamp, current_timestamp, $5) RETURNING *",
      [data.client_name, data.client_email, data.client_phone, data.client_address, data.userId])
  
    res.send(JSON.stringify({ status: true }))
  } catch (err) {

    res.send(JSON.stringify({ status: false }))
  }
})
