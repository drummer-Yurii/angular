const auth=require('../../services/auth.service');
module.exports=async(req,res)=>{
    function successfulResponse() {
        res.json({
          ok: true,
          msg: 'user was successful created'
        })
      }
      function unsuccessfulResponse() {
        res.json({
          ok: false,
          msg: 'user already exist pleas chose another username'
        })
      }
    try {
      await auth.registration(req.body) 
     
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'error on server.can not register'
          })
    }
};