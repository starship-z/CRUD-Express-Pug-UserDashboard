const db = require('../config/database');
const bcrypt = require("bcrypt");

const Users = {}

// Function name = (<function parameters>) => {//code}
Users.viewUsers = async () => {
    try{
        return await db.query("SELECT id, username, password from users", []);
    } catch (err) {
        console.log(err);
        return null;
    }
}

Users.userExists = async (username) => {
    let base = "SELECT username from users WHERE username = ?;"
    try{
        let check = await db.query(base, [username]);
        return !check && !check.length;
    }catch(err) {
        console.log(err);
        return false;
    }
}

// if(!check && !check.length){
//     return true;
//     // user exists
// }else{
//     return false;
// } // does not exist


Users.register = async (username, password) => {
    let base = "INSERT INTO `users` (`username`, `password`) VALUES (?, ?);"
    try{
        if(await Users.userExists(username)) return null; // check if user exists then cannot register
        password = await bcrypt.hash(password, 15);
        let [results, fields] = await db.execute(base, [username, password]);

        return results && results.length ? true : false; 
    } catch (err){
        console.log(err);
        return false;
    }
}

Users.authenticate = async (username, password) => {
    let base = "SELECT id, username, password from users WHERE username = ?";
    try{
        let [results, fields] = await db.query(base, [username]);
        if (results && results.length) {
            let check = await bcrypt.compare(password, results[0].password);
            if (check) return [true, results[0].id];
            return [false, null];
        }
    } catch(err){
        console.log(err);
        return [false, null];
    }

}
module.exports = Users;

