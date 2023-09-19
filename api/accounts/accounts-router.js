const router = require('express').Router();
const {
  checkAccountPayload, 
  checkAccountNameUnique, 
  checkAccountId } 
  = require('./accounts-middleware');
const {
  getAll,
  getById,
  create,
  updateById,
  deleteById,} 
  = require('./accounts-model');

router.get('/', (req, res, next) => {
  try {
      res.json('get all accounts')
  } catch (err) {
    next(err)
  }
})

router.get('/:id', (req, res, next) => {
  try {
    res.json('get account by id')
  } catch (err) {
    next(err)
  }
})

router.post('/', (req, res, next) => {
  try {
    res.json('post new account')
  } catch (err) {
    next(err)
  }
})

router.put('/:id', (req, res, next) => {
  try {
    res.json('update account')
  } catch (err) {
    next(err)
  }
});

router.delete('/:id', (req, res, next) => {
  try {
    res.json('delete account')
  } catch (err) {
    next(err)
  }
})

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message
  })
})

module.exports = router;
