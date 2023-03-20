var Proimse = require('promise')
var db = require('../connection/connect_db')
var consts = require('../connection/const_collection')
var bcrypt = require('bcrypt')
var objectid = require('mongodb').ObjectId
const { resolve, reject } = require('promise')

module.exports =
{
    Do_signup: (data) => {
        return new Proimse(async (resolve, reject) => {
            data.Password = await bcrypt.hash(data.Password, 10)
            db.get().collection(consts.User_base).insertOne(data).then((data) => {
                //console.log(data)
                resolve(data)
            })
        })
    },
    Do_login: (user) => {
        return new Proimse(async (resolve, reject) => {
            await db.get().collection(consts.User_base).findOne({ Email: user.Email }).then((datas) => {
                if (datas) {
                    bcrypt.compare(user.Password, datas.Password).then((data) => {
                        if (data) {
                            var state =
                            {
                                status: true,
                                user: datas
                            }
                            //console.log("login successfull...")
                            resolve(state)
                        }
                        else {
                            resolve({ status: false })
                            console.log("login faild")
                        }
                    })
                }
                else {
                    resolve({ status: false })
                    console.log("Incoorect Email address...")
                }
            })
        })
    },
    Do_cart: (userId, proId) => {
        return new Proimse(async (resolve, reject) => {
            var cartpro = await db.get().collection(consts.Cart_base).findOne({ userid: objectid(userId) })

            if (cartpro) {
                db.get().collection(consts.Cart_base).updateOne({ userid: objectid(userId) },
                    {
                        $push:
                        {
                            products: objectid(proId)
                        }
                    }).then((data) => {
                        //console.log("addeddd........")
                        resolve(data)
                    })
            }
            else {
                var state =
                {
                    userid: objectid(userId),
                    products: [objectid(proId)]
                }
                db.get().collection(consts.Cart_base).insertOne(state).then((data) => {
                    console.log(data)
                    resolve(data)
                })
            }
        })
    },
    Get_carted_pro: (userId) => {
        return new Proimse(async (resolve, reject) => {
            var cartitems = await db.get().collection(consts.Cart_base).aggregate([
                {
                    $match:
                    {
                        userid: objectid(userId)
                    },
                },
                {
                    $lookup:
                    {
                        from: consts.Admin_Base,
                        let: { proList: "$products" },
                        pipeline: [
                            {
                                $match: {
                                    $expr:
                                    {
                                        $in: ['$_id', '$$proList']
                                    }
                                }
                            }
                        ],
                        as: 'cartList'
                    }
                }

            ]).toArray()
            //console.log(cartitems)
            console.log(cartitems[0].cartList)
            resolve(cartitems[0].cartList)
        })
    }
}



