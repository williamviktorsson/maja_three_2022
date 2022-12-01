import * as crypto from "crypto";

// Creating a unique salt for a particular user
let salt = crypto.randomBytes(16).toString('hex');

// Hash the salt and password with 1000 iterations, 64 length and sha512 digest 
const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');

// store salt + hash in database 
