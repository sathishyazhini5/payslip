const multer=require("multer")

var storage=multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null,"./files/")
    },
    filename:(req, file, cb)=>{
        console.log(file.originalname);
        cb(null,`${file.originalname}`)
    }
})
    
var upload=multer({storage:storage})

module.exports=upload