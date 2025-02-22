const {
  getAll,
  getById,
  create,
  updateById,
  deleteById,} 
  = require('./accounts-model');
const db = require('../../data/db-config');

exports.checkAccountPayload = (req, res, next) => {
  const err = {status: 400};
  const {name, budget} = req.body;
  if(name === undefined || budget === undefined){
    err.message = "name and budget are required"
  } else if(typeof name !== 'string'){
    err.message = 'name must be a string'
  } else if(name.trim().length < 3 || name.trim().length > 100){
    err.message = "name of account must be between 3 and 100"
  } else if(typeof budget !== 'number' || isNaN(budget)){
    err.message = "budget of account must be a number"
  } else if(budget < 0 || budget > 1000000){
    err.message = "budget of account is too large or too small"
  }
  if(err.message){
    next(err);
  }else{
    next();
  }
}

exports.checkAccountNameUnique = async (req, res, next) => {
  try {
    const nameTaken = await db('accounts')
      .where('name', req.body.name.trim())
      .first();
    if(nameTaken){
      next({status: 400, message: "that name is taken"})
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
}

exports.checkAccountId = async (req, res, next) => {
  try {
    const account = await getById(req.params.id);
    if(!account){
      next({status: 404, message: "account not found"});
    } else {
      req.account = account;
      next();
    }
  } catch (err) {
    next(err);
  }
};

