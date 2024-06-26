import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

const userAuth = asyncHandler(async (req, res, nxt) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    console.log({ token });
    jwt.verify(token, "Meowmeow", (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: "Invalid token" });
      } else {
        req.user = decoded;
        console.log("decopde", req.user);
        nxt();
      }
    });
  } else {
    return res.status(401).json({ error: "Unauthorized" });
  }
});
export { userAuth };