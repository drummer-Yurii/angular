const level = '../../';
const { log, pro, lex } = require(`${level}my_modules/staff`);
const { auth } = require(`${level}services`);
error = (err, req, res, status, msg2) => {
  err = err.toString();
  // log('error Universal'.error, err, status, msg2, '\n')
  res.json({
    status,
    err,
    success: false,
    msg: 'Error in ' + req.url,
    msg2: msg2 || '',
    from: 'error Universal'
  });
};

send = (result, req, res, msg2) => {
  res.json({
    code: '200',
    result,
    ok: true,
    success: true,
    msg: 'ok',
    msg2: msg2 || '',
    from: 'send Universal'
  });
};
good = (data, req, res, msg2) => {
  res.json({
    code: '200',
    data,
    ok: true,
    success: true,
    msg: 'Good :)',
    msg2: msg2 || '',
    from: 'send Universal'
  });
};

bad = (data, req, res, msg2) => {
  res.json({
    code: '200',
    data,
    ok: false,
    success: false,
    msg: 'Not good :(',
    msg2: msg2 || '',
    from: 'send Universal'
  });
};

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

