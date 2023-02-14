// Generic router required for all possible requests coming particularly for Toll Booth
const express = require('express')
const router = express.Router()
const { tollBoothEntry } = require("../controllers/tollBooth.controller");
const { tollBoothEntryValidator } = require ('../validators/tollBooth.validator')
const { entryFieldsFormatChecking } = require('../middlewares/tollBooth.middleware')
// localhost:3000/api/tollBooth/add
router.post('/add', tollBoothEntryValidator, entryFieldsFormatChecking, tollBoothEntry);

module.exports = router;