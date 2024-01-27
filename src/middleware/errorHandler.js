export function errorHandler (error, req,res,next){
    switch(error.type){
        case 'INVALID_ARGUMENT':
            res.status(400)
            break
        case 'FAILED_AUTHENTICATION':
            res.status(401)
            break
        default:
            res.status(500)
            break
    }
    res.json({
        status:'error',
        message:error.message
    })
}