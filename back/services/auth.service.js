const self={
    registration:async(o)=>{
       
          async function addDataToDB() {
            users.push(userData);
            const newUsersJSON = JSON.stringify(users);
            await client.set('users', newUsersJSON);
          }
          let users = [];
          const userData = req.body;
          log(userData);
          if (userData.password == '') {
            return res.json({
              ok: false,
              msg: 'password is required'
            })
          }
          const usersJSON = await client.get('users');
          log(usersJSON);
          if (usersJSON == null) {//відсутність поля users
            await addDataToDB()
            successfulResponse()
          } else {
            try {
              users = JSON.parse(usersJSON)
              const isExist = users.some((user) => {
                return user.username == userData.username
              })
              if (isExist) {
                unsuccessfulResponse()
              } else {
                await addDataToDB()
                successfulResponse()
              }
            } catch (error) {
              res.status(500).json({
                ok: false,
                msg: 'error on server'
              })
            }
          }
    }
}
module.exports=self;