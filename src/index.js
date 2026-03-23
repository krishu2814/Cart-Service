const express = require('express');
const { PORT } = require('./config/serverConfig');
const connectDB = require('./config/database');
const apiRoutes = require('./routes/index');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', apiRoutes);

const setUpAndStartServer = () => {

    connectDB();
    
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

setUpAndStartServer();
