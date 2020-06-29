const express = require('express')
const app = express()
const port = 3000

let students = [
    { name: "Sally Struthers", studentId: 1, grades: ["A", "B", "C"] },
    { name: "Gunther", studentId: 2, grades: ["Q", "Q"] },
    { name: "Sammy Sossa", studentId: 3, grades: ["Z", "Z","Z"]
}
];

    app.use(express.json());

app.get('/', (req, res) => {

    res.send('Hello World!')}
)

app.get('/students', (req, res) => {
    let search = req.query.search;
    if (search) {
        let foundStudents = [];
        students.forEach(student => {
            if (student.name.includes(search)) {
                foundStudents.push(student);
            }
        })
        res.send(foundStudents);
    }
    else
    {
        res.send(students);
    }
})

app.get('/students/:studentId', (req, res) => {
    let foundStudent = students.find(student =>  student.studentId === Number.parseInt(req.params.studentId));
        res.send(foundStudent);
})

app.get('/grades/:studentId', (req, res) => {
    let foundStudent = students.find(student =>  student.studentId === Number.parseInt(req.params.studentId));
        res.send(foundStudent.grades);
})

app.post('/grades', (req, res) => 
{
    const grade = req.body.grade;
    const studentId = req.body.studentId
    let errorMessage = "";
    if(!grade){errorMessage += "No grade was passed"
    }
    if(!studentId)
    {
        if(errorMessage=== "") errorMessage+= "No studentId was passed";
        else errorMessage += " and no studentId was passed."
    }

    if(errorMessage)
    {
        res.status(400).send(errorMessage);
    }
    else
    {    
    res.send(`Student ${studentId} Grade ${grade} recorded.`).status(200);
    }
}
)

app.post('/register', (req, res) => 
{
    const userName = req.body.userName;
    const email = req.body.email
    let errorMessage = "";
    if(!userName){errorMessage += "No userName was passed"
    }
    if(!email)
    {
        if(errorMessage=== "") errorMessage+= "No email was passed";
        else errorMessage += " and no email was passed."
    }

    if(errorMessage)
    {
        res.status(400).send(errorMessage);
    }
    else
    {    
    res.send(`Username ${userName} E-mail ${email} recorded.`).status(200);
    }
}
)

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))