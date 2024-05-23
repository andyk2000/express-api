const config = require("../app.config");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const generateAccessToken = (email, id) => {
    return jwt.sign(
      {
        id,
        email,
      },
      "urokodaki",
      {
        expiresIn: 3600,
      }
    );
};

const encryptPassword = (password) => {
    const hash = crypto.createHash("sha256");
    hash.update(password);
    return hash.digest("hex");
};

const getUsers = (request, response) => {
    config.db.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).json(results.rows)
      })
}

const signup = async (request, response) => {
    const {email, password, names} = request.body;

    try {
        await config.db.connect();

        const encryptedPassword = encryptPassword(password);
        await config.db.query("INSERT INTO users (names, email, password) VALUES ($1, $2, $3) RETURNING *",[names, email, encryptedPassword], (error, results) => {
            return response.status(200).json("new user added")
        })
    } catch (error) {
        
    }
}

const login = async (request, response) => {
    const { email, password } = request.body;
    try {
        await config.db.connect();

        const result = await config.db.query("SELECT * FROM users WHERE email=$1", [email]);

        const ecptPassword = encryptPassword(password);

        if(ecptPassword !== result.rows[0].password){
            return response.status(401).json("failed to login");
        }

        const user = result.rows[0];
        const accessToken = generateAccessToken(user.email, user.id);
        return response.status(200).json({
            token: accessToken 
        })


    } catch (error) {
        console.log(error);
        return response.status(500).json(error);
    }
}

module.exports = {
    getUsers,
    login,
    signup
}