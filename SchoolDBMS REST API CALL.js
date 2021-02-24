const mysql=require('mysql')
var express = require('express')
var app = express()
const port = 7001
var bodyParser = require('body-parser');
app.use(bodyParser.json());


var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database:"School"
});

con.connect((err)=> {
    if(!err){
        console.log("DB connection success")// check the DB connection
    }else {
        console.log("DB connection Failed" +JSON.stringify(err,undefined,2))}//error in json formaT
     
});
  app.get('/',function(req,res)// Get all students in school
  {
      con.query("select ID,Student_ID,Class_ID from ClassStudents",function(err,result)
      {
          res.send(result);
      })
  })
  app.get('/classMembers/:Id',function(req,res)// give class id and get members in class
  {
      con.query("select Student.ID,Student.Name from Student join ClassStudents on ClassStudents.Student_ID=Student.ID where ClassStudents.Class_ID=?",[req.params.Id],function(err,result)
      {
          res.send(result);
      })
  })
  app.get('/mark/:Id',function(req,res)// get the specific id Marks

  {
    // "select Student.ID,Student.Name,ClassStudents.Class_ID,Subject.Name,marks.Marks FROM Student JOIN ClassStudents ON Student.ID=ClassStudents.Student_ID JOIN marks ONStudent.ID=marks.Student_ID JOIN Subject ON Subject.ID=marks.Subject_ID where Student.ID='"+ID+"'"
      con.query(" select Subject.Name,marks.Marks FROM marks JOIN Subject ON Subject.ID=marks.Subject_ID where marks.Student_ID=?",[req.params.Id],function(err,result)
      {
          res.send(result);
      })
  })
  app.get('/Attendance/:Id',function(req,res)// get the specific id result

  {
    
      con.query("select Student.ID,Student.Name,Attendance.Date,Attendance.Attendance, ClassStudents.Class_ID FROM Student JOIN ClassStudents ON Student.ID=ClassStudents.Student_ID JOIN Attendance ON Student.ID =Attendance.Student_ID WHERE Student.ID=?",[req.params.Id],function(err,result)
      {
          res.send(result);
      })
  })


  app.post('/newStudent/',function(req,res)//insert the new Student Record
  {
      let sql="insert into Student (Name,MobileNumber) values('"+req.body.Name+"','"+req.body.MobileNumber+"')";
      
      console.log('sql => ',sql)
     con.query(sql,function(err,result){
      res.send(result);
  });
});
app.post('/putattendance/',function(req,res)//insert Attendance 
  {
      let sql="insert into Attendance (Id,Student_ID,Attendance) values('"+req.body.Id+"','"+req.body.Student_ID+"','"+req.body.Attendance+"')";
      
      console.log('sql => ',sql)
      
     con.query(sql,function(err,result){
      res.send(result);
  });
});

app.post('/putMarks/',function(req,res)//Insert Marks
  {
      let sql="insert into marks (Student_ID,Subject_ID,Marks) values('"+req.body.Student_ID+"','"+req.body.Subject_ID+"','"+req.body.Marks+"')";
      
      console.log('sql => ',sql)
      
     con.query(sql,function(err,result){
      res.send(result);
  });
});

  app.listen(port, () => {
    console.log(`Running Successfully`);
      })
    