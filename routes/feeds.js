const { getFeeds, getFeedsById, deleteFeed, updateFeed, createFeed } = require('../controller/feeds');
const express = require('express');
const router = express.Router()

router.get("/", getFeeds);
router.get("/:id", getFeedsById);
router.post("/", createFeed);
router.put("/:id", updateFeed);
router.delete("/:id", deleteFeed);


module.exports = router;

// rutas para hacer las peticiones
