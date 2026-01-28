const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
   first_name:{
         type:String,
         required:true
   },
   last_name:{
         type:String,
         required:true
   },
   address:{
         type:String,
         required:true
   },
   email:{
         type:String,
         required:true,
         unique:true
   },
   phone:{
         type:String,
         required:true
   },
   profile_pic:{
         type:String,
       
   },
   gender:{
         type:String,
         enum:["male","female","other"],
         required:true
   }

})

const Student= mongoose.model("Student", studentSchema);
module.exports = Student;
