const router = require('express').Router();

// Import modular routers
const notesRouter = require('./notes');

// Initialize route
router.use('/notes', notesRouter);

module.exports = router;