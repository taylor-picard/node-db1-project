exports.checkAccountPayload = (req, res, next) => {
  console.log('payload middleware');
  next();
}

exports.checkAccountNameUnique = (req, res, next) => {
  console.log('name middleware');
  next();
}

exports.checkAccountId = (req, res, next) => {
  console.log('id middleware');
  next();
}
