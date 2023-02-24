var db = require('../connection/conection')
var collection =require("../connection/collection")

module.exports =
{
    link: (data, callback) => {
        db.get().collection("azad").insertOne(data).then((data) => {
            callback(data.ops[0]._id)
        })
    },

    getallProducts : ()=>
    {
        return new Promise(async(resolve,reject)=>
        {
            var products = await db.get().collection(collection.PRODUCT).find().toArray()
            resolve(products)
        })
    }
}