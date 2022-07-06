const express = require("express");
const cors = require("cors")
const dotenv = require("dotenv")
const app = express();
const loader = require("./loader");
const events = require("./scripts/event")
const Routes = require("./Routes");
const fileUpload = require("express-fileupload");
const helmet = require("helmet");
const path = require("path")
dotenv.config();
loader();
events();

app.use(helmet())
app.use(express.json())
app.use(fileUpload())
app.use(cors())

app.use("/images",express.static(path.join(__dirname, "/uploads")))

app.use('/api/users/',Routes.userRoute)
app.use('/api/supplier/',Routes.supplierRoute)
app.use('/api/products/',Routes.productRoute)
app.use('/api/stocks/',Routes.stockRoute)
app.use('/api/accounts/',Routes.accountRoute)

app.use((req, res, next)=>{
     return next(res.status(404).send("Hatalı istek"))
})

app.listen(process.env.APP_PORT,()=>{
    console.log("Server çalışıyor");
})
