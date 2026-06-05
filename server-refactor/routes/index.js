const express = require("express");
const favoritesRoutes = require("./favorites.routes");
const listingsRoutes = require("./listings.routes");
const messagesRoutes = require("./messages.routes");
const metaRoutes = require("./meta.routes");
const usersRoutes = require("./users.routes");

const router = express.Router();

router.use("/meta", metaRoutes);
router.use("/listings", listingsRoutes);
router.use("/favorites", favoritesRoutes);
router.use("/messages", messagesRoutes);
router.use("/users", usersRoutes);

module.exports = router;

/*
Mount in your existing Express app:

const apiRoutes = require("./server-refactor/routes");
app.use("/api", apiRoutes);
*/
