import dotenv from "dotenv"
dotenv.config()

import server from "./src/server.js"

const port = process.env.PORT || 3000

server.listen(port, (err)=>{
    if (err) {
        console.error(err)
    }
    console.log(`Server start on ${port} port`)
})
