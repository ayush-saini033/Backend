const jwt =require('jsonwebtoken')

const createToken = async() => {
    const token = await jwt.sign({_id:"66e6bfbd757911a0a11dffb0"},"kjckjhjknedfch,ncnckjdcdcjn,knlkjfdv,vfn",{

        expiresIn: "2 seconds"
    })


    console.log(token)

    const verified = jwt.verify(token, "kjckjhjknedfch,ncnckjdcdcjn,knlkjfdv,vfn")
    console.log(verified)
}
createToken()