require("dotenv").config();
const express = require('express');
const app = express();
const usersRoute = require('./routes/routes');

app.use(express.json());
app.use('/', usersRoute)

const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

