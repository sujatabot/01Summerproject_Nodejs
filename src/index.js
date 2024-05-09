
import { app } from "./app.js";
import { dbConnection } from "./db/index.js";
import dotenv from "dotenv";
import { usertable } from "./models/users.model.js";

dotenv.config({
  path: "./.env",
});

dbConnection()
  .then(() => {
    console.log("Database connected successfully");
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server is running on PORT ${process.env.PORT || 5000}`);
      usertable(); 
    });
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
    process.exit(1);
  });