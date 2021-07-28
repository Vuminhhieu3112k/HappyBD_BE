const express= require('express')
const app =express()
app.use(express.json())
const courses = [
    {id: 1, name:'PHP'},
    {id: 2, name:'NodeJs'},
    {id: 3, name:'VueJS'},

]

app.get('/',(req,res)=>{
    res.send('ban dang code')
})
app.get('/api/courses',(req,res)=>{
    res.send(courses)
})
app.get('/api/courses/:id',(req,res)=>{
    const course =courses.find(courses =>courses.id ===parseInt(req.params.id))
    if(!course) res.status(404).send('id ko ton tai')
    res.send(course)
})
app.post('/api/courses/add',(req,res)=>{
    const course ={
        id : req.body.id,
        name : req.body.name
    }
    courses.push(course)
    res.send(JSON.stringify({
        success : true,
        notice:"ban da them thanh cong",
        data: courses
    }))
})
app.put('/api/courses/edit/:id',(req,res)=>{
    const course =courses.find(courses =>courses.id ===parseInt(req.params.id))
    course.name = req.body.name
    res.send(JSON.stringify({
        success : true,
        notice:"ban cap nhap thanh cong",
        data: courses
    }))
})
app.delete('/api/courses/delete/:id',(req,res)=>{
    const course =courses.find(courses =>courses.id ===parseInt(req.params.id))
    let index =courses.indexOf(course);
    courses.splice(index,1);
    res.send(JSON.stringify({
        success : true,
        notice:"ban xoa thanh cong",
        data: courses
    }))
})

const PORT = process.env.PORT ||3000;
app.listen(PORT,()=> console.log(`sever running on port ${PORT}`));