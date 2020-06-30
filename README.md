# RestfulApi

pull down this repo navigate to the folder from this repo and enter:

docker build -t studentsdb/devdb .
docker run -i -p 5434:5432 --name studentsDb studentsdb/devdb

then to run the express API:

node index

To check things out you can go to:
http://localhost:3000/students

to go to just one of the students:
http://localhost:3000/students/2

to search:
http://localhost:3000/students?search=S

to get grades for student 3 for example:
http://localhost:3000/grades/3

To append a grade for student 1 call post with http://localhost:3000/grades as the url and 
{
	"studentId":1,
	"grade":"A"
}

as the payload.

To add a new student call post to:
http://localhost:3000/register 
with:
{
	"userName":"InspectorSpaceTime",
	"email":"Dude@dude.dude"
}

as the payload
