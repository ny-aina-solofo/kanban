const express = require("express");
const cors = require("cors");
const routes = require("../server/app/routes/routes"); 
const app = express(); 

const urlAPI = "http://localhost:4200"; 
const portAPI = "3000"; 
const corsOptions = {origin : urlAPI};

app.use(cors(corsOptions)); // cors provides Express middleware to enable CORS with various options
app.use(express.json()); // create an Express app 
app.use('/kanban-task-api',routes);
app.listen(portAPI, ()=>{
    console.log(`app run on port ${portAPI}`);
})

const db = require('./app/models/models');
db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  }); 
// db.sequelize.sync({force : true}).then(()=>{console.log("Drop and re-sync db.");})

