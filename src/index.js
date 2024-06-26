
import { app } from "./app.js";
import { dbConnection } from "./db/index.js";
import dotenv from "dotenv";
import { usertable } from "./models/users.model.js";
import { photostable } from "./models/photos.model.js";
import { contactustable } from "./models/contactus.model.js";
import { registertable } from "./models/register.model.js";
import { imagetable } from "./models/image.model.js";
import { blogtable } from "./models/blog.model.js";
import { itemtable } from "./models/item.model.js";
import { texttable } from "./models/text.model.js";
import { homephotostable } from "./models/Home.model.js";
import { aboutusphotostable } from "./models/aboutphoto.model.js";
import { texttable1 } from "./models/text1.model.js";

dotenv.config({
  path: "./.env",
});

dbConnection()
  .then(() => {
    console.log("Database connected successfully");
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server is running on PORT ${process.env.PORT || 5000}`);
      usertable(); 
     photostable();
     contactustable();
     registertable();
     imagetable();
     blogtable();
     itemtable();
     texttable();
     homephotostable();
     aboutusphotostable();
     texttable1();
    });
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
    process.exit(1);
  });