"use strict"

const Todo = require('../models/todo')

module.exports={

    list:async(req,res)=>{

        const data = await Todo.findAndCountAll()
        //send metodunun önüne get status kodu eklenmiştir. default değeri 200
        res.status(200).send({
            eror:false,
            result:data
        })
    },
    
}