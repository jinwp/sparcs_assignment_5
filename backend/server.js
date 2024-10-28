import arithmeticRouter from "./arithmeticRouter";
import BankRouter from "./bankRouter";

const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();
const port = 3000;

const connection = mysql.createConnection({
    host: '143.248.234.161',
    port: '21515',
    user: 'root',
    password: '1N9OxQbS2elaHvu7U80w0p033IiM4HIE',
    database: 'assign5',
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');
});

app.use(express.json());
app.use(cors());

app.use('/arithmetic', arithmeticRouter);
app.use('/bank', BankRouter);

//TOBE REMOVED
// app.use(express.static(__dirname + '../frontend'));

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
