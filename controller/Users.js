const config = require("../app.config");
const jwt = require("jsonwebtoken");

const generateAccessToken = (email, id) => {
    return jwt.sign(
      {
        id,
        email,
      },
      "urokodaki"
    );
};

const getUsers = (request, response) => {
    config.db.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).json(results.rows)
      })
}

const login = async (request, response) => {
    const { email, password } = request.body;
    try {
        await config.db.connect();

        const result = await config.db.query("SELECT * FROM users WHERE email=$1", [email]);

        if(password !== result.rows[0].password){
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
    login
}