require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');  
const userRoutes = require('./routes/userRoutes');
const app = express();


app.use(morgan('dev'));  

app.use(cors());
app.use(express.json());


app.use('/usuarios', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
