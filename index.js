const express = require('express')
const app = express()
const db = require('./db')
const port = 3000

app.use(express.json());

app.get('/', (req, res) => {

    res.send('Hello World!')
}
)

app.get('/students', (req, res) => {
    let search = req.query.search;
    if (search) {
        db.query(`SELECT * FROM students WHERE name LIKE '%${search}%'`, (err, results) => {
            if (err) {
                res.status(500).end()
            } else {
                res.status(200).json(results.rows)
            }
        })
    }
    else {
        db.query(`SELECT * FROM students`, (err, results) => {
            if (err) {
                res.status(500).end()
            } else {
                res.status(200).json(results.rows)
            }
        });
    }
})

app.get('/students/:studentId', (req, res) => {
    db.query(`SELECT * FROM students WHERE studentId = ${Number.parseInt(req.params.studentId)}`, (err, results) => {
        if (err) {
            res.status(500).end()
        } else {
            res.status(200).json(results.rows)
        }
    });
})

app.get('/grades/:studentId', (req, res) => {
    db.query(`SELECT * FROM students WHERE studentId = ${Number.parseInt(req.params.studentId)}`, (err, results) => {
        if (err) {
            res.status(500).end()
        } else {
            if (results.rows) { res.status(200).json(results.rows[0].grades) }
        }
    });
})

app.post('/grades', (req, res) => {
    const grade = req.body.grade;
    const studentId = Number.parseInt(req.body.studentId);
    let errorMessage = "";
    if (!grade) {
        errorMessage += "No grade was passed"
    }
    if (!studentId) {
        if (errorMessage === "") errorMessage += "No studentId was passed";
        else errorMessage += " and no studentId was passed."
    }

    if (errorMessage) {
        res.status(400).send(errorMessage);
    }
    else {
        let currentGrades = "";
        db.query(`SELECT * FROM students WHERE studentId = ${studentId}`, (err, results) => {
            if (err) {
                res.status(500).end()
            } else {
                if (results.rows) {
                    currentGrades = results.rows[0].grades;
                    console.log("0. " + currentGrades);

                    if (currentGrades !== "") {
                        currentGrades += `, ${grade}`;
                        console.log("2. Appending " + currentGrades);
                    }
                    else {
                        currentGrades = grade;
                        console.log("3. Setting " + currentGrades);
                    }
                    let queryToRun = `UPDATE students SET grades = '${currentGrades}' WHERE studentId = ${studentId}`;
                    console.log("4. " + queryToRun);
                    db.query(queryToRun, (err, results) => {
                        if (err) {
                            res.status(500).end()
                        } else {
                            if (results.rows) {
                                res.send(`Student ${studentId} Grade ${grade} recorded.`).status(200);
                            }
                        }
                    });
                }
            }
        });
        console.log("1. showing current grades" + currentGrades);

    }
}
)

app.post('/register', (req, res) => {
    const userName = req.body.userName;
    const email = req.body.email
    let errorMessage = "";
    if (!userName) {
        errorMessage += "No userName was passed"
    }
    if (!email) {
        if (errorMessage === "") errorMessage += "No email was passed";
        else errorMessage += " and no email was passed."
    }

    if (errorMessage) {
        res.status(400).send(errorMessage);
    }
    else {
        let queryToRun = `INSERT INTO students (name, email) VALUES ('${userName}', '${email}')`;
        console.log(queryToRun);
        db.query(queryToRun, (err, results) => {
            if (err) {
                res.status(500).end()
            } else {
                if (results.rows) {
                    res.send(`Username ${userName} E-mail ${email} recorded.`).status(200);
                }
            }
        });
    }
}
)

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))