//GET bucklist seed data
curl http://localhost:3003/bucketlists/seed

//GET list of users
curl http://localhost:3003/users

//create new user
curl -X POST -H "Content-Type:application/json" -d '{"username":"testuser", "password": "pw123"}' http://localhost:3003/users

//Sessions
//GET Route for Sessions:
curl http://localhost:3003/sessions/new

//POST Route for Sessions (to authenticate a user)
curl -X POST -H "Content-Type:application/json" -d '{"username":"testuser", "password": "pw123"}' http://localhost:3003/sessions