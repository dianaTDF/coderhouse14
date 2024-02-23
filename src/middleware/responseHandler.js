export function responseHander(req,res,next){
    res['jsonOk'] = (payload)=>{
        res.status(200).json({status: 'success',payload})
    }
    res['created'] = (payload)=>{
        res.status(201).json({status: 'success',payload})
    }
    res['result'] = (payload)=>{
        res.status(200).json({status: 'success',payload})
    }
/*     res['cookie'] = (payload)=>{
        res.status(200).json({status: 'success',payload})
    } */
    next()
}