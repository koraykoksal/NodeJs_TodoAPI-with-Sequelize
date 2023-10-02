"use strict";
/* -------------------------------------------------------
    EXPRESSJS - TODO Project with Sequelize
------------------------------------------------------- */



//? express içinde ki router import edildi.
const router = require('express').Router()

const Todo = require('./todo.model')

// LIST
router.get('/',async(req,res)=>{

    const data = await Todo.findAndCountAll()
    //send metodunun önüne get status kodu eklenmiştir. default değeri 200
    res.status(200).send({
        eror:false,
        result:data
    })
})

// CREATE
router.post('/',async(req,res)=>{

    const data = await Todo.create(req.body)
    //send metodunun önüne create status kodu eklenmiştir. default değeri 201
    res.status(201).send({
        
        error:false,
        message:'created',
        result:data
    })
})


router.get('/:id',async(req,res)=>{
    const data = await Todo.findByPk(req.params.id)
    res.status(200).send({
        error:false,
        result:data
    })
})

//? findOne özelliği ile aranacak değeri belirterek onu bulabiliriz
router.get('/isdone/:id',async(req,res)=>{
    const data = await Todo.findOne({where:{isDone:false}})
    res.status(200).send({
        error:false,
        result:data
    })
})

// UPDATE
//? güncellenecek olan veri req.body ile gönderilir.
//? güncellenecek olan datayı id bilgisine göre filtreleyip işlem yapar
router.put('/:id',async(req,res)=>{
    const isUpdate = await Todo.update(req.body,{where:{id:req.params.id}})
    //send metodunun önüne update status kodu eklenmiştir. default değeri 202
    res.status(202).send({
        error:false,
        message:'Updated',
        status:'Successfull',
        isUpdate:Boolean(isUpdate) ,
        //en güncel veriyi burada listelemiş olacak
        result:await Todo.findByPk(req.params.id)
        //true-false ve string değer gelmesi için result bilgisini boolean olarak gösterildi
    })
})

// DELETE
router.delete('/:id',async(req,res)=>{
    const isDelete = await Todo.destroy({where:{id:req.params.id}})
    //send metodunun önüne delete status kodu eklenmiştir. default değeri 204
    res.status(204).send({
        error:false,
        message:'Deleted',
        status:'Successfull',
        isDelete:Boolean(isDelete),
        
    })
})

//? router dişardan erişime açıyoruz
module.exports = router









