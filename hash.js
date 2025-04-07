const bcrypt = require('bcrypt');

const plainPassword = 'mypassword';

bcrypt.hash(plainPassword, 10)
.then(hash => {
    console.log("Hashed password: ", hash);
});