var express = require("express");
const dbconnect = require("./dbConnect");
const path = require("path");

const app = express();
app.use(express.json());

const userRoutes = require("./routes/UsersRoutes");
const transactionsRoutes = require("./routes/TransactionsRoute");

app.use("/api/users/", userRoutes);
app.use("/api/transaction/", transactionsRoutes);
const port = process.env.PORT || 6000;

if(process.env.NODE_ENV==='production'){
    app.use('/',express.static('client/build'))

    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client/build/index.html'))
    })
}


app.listen(port, () => console.log(`Node JS server Started at port ${port}!`));
