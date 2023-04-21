const app=require("express")();
const bodyParser=require("body-parser")
const cors=require("cors");

app.use(bodyParser.json({extended:true}));
app.use(bodyParser.urlencoded({extended:true}))

app.use(cors());

app.use(function(req,res,next){
   res.header("Access-Control-Allow-Origin","*");
   res.header("Access-Control-Allow-Methods",'GET,POST,OPTIONS,PUT,PATCH,DELETE');
   res.header("Access-Control-Allow-Headers","Origin,X-Requested-with,Content-Type,Accept,authentication-token,application/json,charset=utf-8");
   next();
})
require("./router/route")(app)
require("./config/db")


const PORT=5500

app.listen(PORT,()=>{
    console.log(`server ${PORT} is running...`);
})