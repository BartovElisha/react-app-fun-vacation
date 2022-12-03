var express = require('express');
var router = express.Router();
const vacations = require('../controllers/vacations');

router.get('/', vacations.getAll);
router.post('/', vacations.add);
router.put('/:id', vacations.edit);
router.delete('/:id', vacations.delete);

module.exports = router;