"use strict";

module.exports = (err, req, res, next) => {
    const errorStatusCode = res.errorStatusCode ?? 500
    console.log('errorHandler runned.')
    res.status(errorStatusCode).send({
        error: true, // special data
        message: err.message, // error string message
        cause: err.cause, // error option cause
        // stack: err.stack, // error details

        //? hata durumunda requesden gelen hatayı görmek için body bilgisine req.body olarak belirtilir
        body:req.body,
    })
}

