const asyncHandler = (requestHandle) => {
    return function(req, res, next){
        Promise.resolve(requestHandle(req, res, next))
            .catch(function(err) {
                next(err)
            })
    }
}

export { asyncHandler }