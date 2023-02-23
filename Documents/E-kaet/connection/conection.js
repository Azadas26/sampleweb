var mongoClient=require('mongodb').MongoClient
var state=
{
    db:null
}


module.exports.connect = function(done)
{
    var dbname ="K-kaet"

    mongoClient.connect("mongodb://127.0.0.1:27017",(err,data)=>
    {
       if(err)
       {
        done(err)
       }
       else
       {
         state.db=data.db(dbname)
         done()
       }
       
    })
}

module.exports.get=function()
{
    return state.db;
}

