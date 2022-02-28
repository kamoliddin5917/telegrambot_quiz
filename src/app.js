const express = require("express")
const port = require("./config/server")

const app = express()

// Controllers
const homeController = require("./controllers/index")

app.use(express.json())

app.post("/test", homeController.POST)
app.delete("/test/:testId", homeController.DELETE)


app.listen(port.PORT, ()=>console.log(`Server has been started on port: ${port.PORT}`))
