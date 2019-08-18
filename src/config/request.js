module.exports={
        headers:{
            "Content-Type":"application/json",
        },
        timeout: 1000,
        baseURL:process.env.NODE_ENV==="production"?"":"/api"
}