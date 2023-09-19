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

router.get('/', async (req, res, next) => {
  try {
    const accounts = await getAll()
      res.json(accounts)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', 
checkAccountId, (req, res, next) => {
    res.json(req.account)
})

router.post('/', 
checkAccountNameUnique, 
checkAccountPayload, async (req, res, next) => {
  try {
    const newAccount = await create({name: req.body.name.trim(), budget: req.body.budget});
    res.status(201).json(newAccount)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', 
checkAccountId,  
checkAccountPayload, async (req, res, next) => {
  try {
    const updatedAccount = await updateById(req.params.id, req.body);
    res.json(updatedAccount);
  } catch (err) {
    next(err)
  }
});

router.delete('/:id', 
checkAccountId, async (req, res, next) => {
  try {
    await deleteById(req.params.id);
    res.json(req.account);
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
