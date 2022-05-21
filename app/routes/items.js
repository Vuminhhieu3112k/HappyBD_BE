var express         = require('express');
const { object } = require('joi');
var router          = express.Router();
var asyncHandler    = require('../middleware/async')
var ErrorResponse   = require('../utils/ErrorResponse')


const controllerName = 'items';
const MainModel 	= require(__path_models + controllerName);
// const MainValidate	= require(__path_validates + controllerName);


router.get('/',asyncHandler( async (req,res, next) => {

        const data = await MainModel.listItems(req.query , {'task' : 'all'})
        res.status(200).json({
            success : true,
            count : data.length,
            data : data
        })
}))

router.get('/:id',asyncHandler(async (req,res, next) => {
        const data = await MainModel.listItems({'id' : req.params.id} , {'task' : 'one'})
        res.status(200).json({
            success : true,
            data : data
        })
}))

router.post('/add',asyncHandler(async (req,res, next) => {
    res.status(201).json({
        success : true,
        data : data
    })
}))

router.put('/edit/:id',asyncHandler(async (req,res, next) => {
    // let err = await validateReq(req,res, next);
    if(!err){
        const data = await MainModel.editItem({'id' : req.params.id,'body' : req.body} , {'task' : 'edit'})
        res.status(200).json({
            success : true,
            data : data
        })
    }
}))

router.delete('/delete/:id',asyncHandler(async (req,res, next) => {
        const data = await MainModel.deleteItem({'id' : req.params.id} , {'task' : 'one'})
        res.status(200).json({
            success : true,
            data : data
        })
}))

module.exports = router;

// const validateReq = async (req,res,next) => {
//     let err = await MainValidate.validator(req);
//     if(Object.keys(err).length > 0){
//         next(new ErrorResponse(400,err));
//         return true;
//     }
//     return false;
// }
