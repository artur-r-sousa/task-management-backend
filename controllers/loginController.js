const asyncHandler = require("express-async-handler");
const bcrypt = require('bcrypt');
const { getClient } = require('../db');

let data = {
  allowedUser: {
    user_email: 'artur@teste.com',
    user_password: '12345'
  },
  currUser: null
}

exports.login_create_new_user = asyncHandler(async (req, res) => {

  const client = await getClient();

  const saltRounds = 10;
  const password = req.body.user_password.toString();

  try {

    const hash_pass = await bcrypt.hash(password, saltRounds);


    const userRole = 'user'
    const result = await client.query("INSERT INTO users (first_name, last_name, email, password_hash, role, created_at) VALUES($1, $2, $3, $4, $5, current_timestamp) RETURNING *",
      [req.body.user_first_name, req.body.user_last_name, req.body.user_email, hash_pass, userRole])

    res.send(JSON.stringify({ status: true }))

  } catch (err) {

    res.send(JSON.stringify({ status: false }))

  }
})

exports.login_request = asyncHandler( async (req, res) => {

  const client = await getClient();
  const result = await client.query("SELECT email, password_hash FROM users WHERE email = $1", [req.body.user_email])

  if (result.rows.length) {
    bcrypt.compare(password = req.body.user_password, hashFromDatabase = result.rows[0].password_hash, (err, result) => {
      if (err) throw err;
      if (result) {
        res.send(JSON.stringify({ status: true }))
      } else {
        res.send(JSON.stringify({ status: false })); 
      }
    });
  } else {
    res.send(JSON.stringify({ status: false }))
  }
  
});

