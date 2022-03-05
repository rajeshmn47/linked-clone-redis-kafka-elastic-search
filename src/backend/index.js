const cron = require("node-cron");
const express = require("express");
  
app = express(); // Initializing app
  
// Creating a cron job which runs on every 10 second
cron.schedule("*/0.1 * * * * *", function() {
    console.log("running a task every 10 second");
});
  
app.listen(8000)