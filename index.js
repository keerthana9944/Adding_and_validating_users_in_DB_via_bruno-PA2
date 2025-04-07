const express = require('express');
const bcrypt = require('bcrypt');
const { resolve } = require('path');

const app = express();
app.use(express.json());
const port = 3000;

app.use(express.static('static'));


const users = [
  {
    email: "user@example.com",
    password: "$2b$10$pweZx7rllXePWbTY3nEdje0uKiERvzHdoqD2tkQiRyQbyXai6pCcS"
  }
];

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.post('/login', async(req,res) => {
  const {email, password} = req.body;

  if(!email || !password){
    return res.status(400).json({message: "Email and Password are required"});
  }

  const user = users.find(u => u.email === email);

  if(!user){
    return res.status(404).json({message: "User not found"});
  }

  try{
    const matched = await bcrypt.compare(password, user.password);
    if(matched){
      return res.status(200).json({message: "Login successful"});
    } 
    else{
      return res.status(401).json({error: "Incorrect password"});
    }
  }

  catch(error){
    res.status(500).json({message: "Something went wrong", error});
  }
});

