export  function onlyRol(rol){
    return async function(req,res,next){
        if(req.user.rol==rol){
            return next()
        }
        const typedError= new Error('permission denied')
        typedError['type']= "FAILED_AUTHORIZATION"
        next(typedError)
    }
}