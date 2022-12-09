var express = require('express');
var router = express.Router();
const vacations = require('../controllers/vacations');

router.get('/', vacations.getAll);
router.get('/:id', vacations.getItem);
router.post('/', vacations.add);
router.patch('/:id', vacations.edit);
router.delete('/:id', vacations.delete);

module.exports = router;