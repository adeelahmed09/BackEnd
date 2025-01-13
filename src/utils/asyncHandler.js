const asyncHandler = (fn) => {
    return((req,res,next) => {
        Promise.resolve(fn(req,res,req)).catch((err)=>next(err))
    })
}
export {asyncHandler}