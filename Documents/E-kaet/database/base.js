var db = require('../connection/conection')

module.exports =
{
    link: (data, callback) => {
        db.get().collection("azad").insertOne(data).then((data) => {
            callback(data.ops[0]._id)
        })
    }
}