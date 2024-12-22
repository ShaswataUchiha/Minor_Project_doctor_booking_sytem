import dotenv from "dotenv"
import {app} from "./app.js"
import connectDatabase from "./DB/index.js"

dotenv.config({path: "./.env"})

connectDatabase()
.then(() => {
    app.on("error", (err) => {
        console.error(`Server Error : ${err.stack}`)
        throw err
    })

    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running on port ${process.env.PORT}`)
    })
})
.catch((err) => {
    console.error(`Error connecting to database: ${err.message}`)
    process.exit(1)
})