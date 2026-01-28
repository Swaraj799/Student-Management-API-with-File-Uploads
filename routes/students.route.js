const express = require("express");
// const app= express();    // we use router so dont use this
const router = express.Router();
const Student = require("../models/student.model");
const multer = require("multer");
const path = require('path');


const storage = multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,'./uploads');
  },

  filename:(req,file,cb)=>{
    const newFileName = Date.now() + path.extname(file.originalname);
    cb(null, newFileName);
  }
})

const fileFilter= (req,file,cb)=>{
  if(file.mimetype.startsWith('image/')){
    cb(null,true)
  }else{
    cb(new Error('Image only'), false);
  }
}



const upload = multer({
  storage: storage,
  fileFilter: fileFilter,

  limits: {fileSize : 1024 * 1024 * 3}
})



// get all students:
router.get("/", async (req, res) => {
         try {
                  const students = await Student.find()
                  res.json(students);
         } catch(err) {
                  res.status(500).json({ message: err.message })
         }
})


// get a single student:
router.get("/:id", async (req, res) => {
         try {
                  const student = await Student.findById(req.params.id);
                  if (!student) {
                           return res.status(404).json({ message: "stud not found" })
                  };
                  res.json(student);
         } catch (err) {
                  res.status(500).json({ message: err.message })
         }
})





router.post(
  "/",
  upload.single("profile_pic"),
  async (req, res, next) => {
    try {
      console.log("BODY:", req.body);
      console.log("FILE:", req.file);

      const student = new Student({
        ...req.body,
        profile_pic: req.file ? req.file.filename : null,
      });

      const newStudent = await student.save();
      res.status(201).json(newStudent);
    } catch (err) {
      next(err);
    }
  }
);





// Update a student:
router.put("/:id", async (req, res) => {
         try {
                  const updateStudent = await Student.findByIdAndUpdate(req.params.id, req.body,
                           { new: true });
                  if (!updateStudent) {
                           res.status(404).json({ message: "sudent not found.." })
                  }
                      res.status(200).json({
      message: "Student updated successfully",
      data: updateStudent
    });
         } catch (err) {
                  res.status(400).json({ message: err.message })
         }
})

// delete student:
router.delete("/:id", async (req, res) => {
         try {
                  const student = await Student.findByIdAndDelete(req.params.id);
                  if (!student) {
                           return res.status(400).json({ message: " stud not deleted" });
                  }
                  res.json({ message: " stud  deleted" });
         } catch (err) {
                  res.status(500).json({ message: err.message })
         }
})



module.exports = router;


