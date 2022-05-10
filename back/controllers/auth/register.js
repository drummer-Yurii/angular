const level = '../../';
const { log, pro, lex } = require(`${level}my_modules/staff`);
const { error, good, bad } = require(`${level}my_modules/staff`);
const { auth } = require(`${level}services`);

module.exports = async (req, res) => {
  try {
    log('Con: Register', req.body);
    // do
    const result = await auth.registration(req.body);
    // send msg
    return (result.ok) ? good(null, req, res, 'User is registered') : bad(null, req, res, 409, result.msg);
  } catch (e) {
    log('Error:', e,);
    error(e, req, res, 500, 'Cannot register ');
  };
};

