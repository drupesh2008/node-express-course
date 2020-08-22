const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

// user details
const mockUserData=[
    {   
        userId: '0',
        name: 'Mark',
        emailId: 'mark@gmail.com'
    },
    {   
        userId: '1',
        name: 'Jill',
        emailId: 'jill@gmail.com'
    },
];

// To get userId from name to return additional details
function getUserIdFromName (name) {
    for (users in mockUserData) {
         if (mockUserData[users].name === name) {
             return mockUserData[users].userId;
         }
      }
    
    return "No such user";
}

app.get('/users',function(req,res){
	res.json({
		success: true,
		message: 'successfully got users. Nice!',
		users: mockUserData
	});
});

// colons are used as variables that be viewed in the params
app.get('/users/:id',function(req,res){
	console.log(req.params.id)
	res.json({
		success: true,
		message: 'got one user',
		user: req.params.id
	});
});

// get user details based on GET parameters
app.get('/getUserDetails',function(req,res){
    console.log(req.query.name);

    if (typeof req.query.name === 'undefined') {
        res.json({
            Error: "Required parameters are missing, or invalid"
        });
    } else {
        let id = getUserIdFromName(req.query.name);
        
        if (isNaN(id)) {
            res.json({
                Error: id
            })
        } else {
            res.json({
                success: true,
                message: 'Got the required user',
                user: mockUserData[id] 
            });
        }
    }
});

app.post('/login',function(req,res){
	// Typically passwords are encrypted using something like bcrypt before sending to database
	const username=req.body.username;
	const password=req.body.password;

	// This should come from the database
	const mockUsername="billyTheKid";
	const mockPassword="superSecret";

	if (username===mockUsername && password===mockPassword){
		// In practice, use JSON web token sign method here to make an encrypted token
		res.json({
			success: true,
			message: 'password and username match!',
			token: 'encrypted token goes here'
		});
	} else {
		res.json({
			success: false,
			message: 'password and username do not match'
		});
	}

});

app.listen(8000,function(){
    console.log('server is listening');
});