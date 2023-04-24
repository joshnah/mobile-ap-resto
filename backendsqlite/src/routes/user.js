const express = require("express");
const router = express.Router();
const user = require("../controllers/user.js");

router.get(
  "/api/users",
  user.verifyTokenAndFindUser,
  user.verifyAdmin,
  user.getUsers
);
router.post("/api/users", user.newUser);

router.put(
  "/api/users",
  user.verifyTokenAndFindUser,
  user.updateUser
);
router.delete(
  "/api/users",
  user.verifyTokenAndFindUser,
  user.deleteUser
);

router.get(
  "/api/users/:email",
  user.verifyTokenAndFindUser,
  user.verifyAdmin,
  user.getUserByEmail
);

router.post("/login", user.login);

module.exports = router;
