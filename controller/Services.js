const config = require("../app.config");
const jwt = require("jsonwebtoken");

const getServices = async (request, response) => {

    await config.db.connect()
    try {
        config.db.query('SELECT * FROM services', (error, results) => {
            
            return response.status(200).json(results.rows)
        })
    } catch (error) {
        
    }
    
}

const getServicesByID = async (request, response) =>{
    await config.db.connect()
    try {
        const id = parseInt(request.params.id)
  
        config.db.query('SELECT * FROM services WHERE id = $1 ORDER BY id ASC', [id], (error, results) => {
          
          response.status(200).json(results.rows)
        })   
    } catch (error) {
        
    }
}

const updateServices = async (request, response) => {
    await config.db.connect()
    const {name, price, ingredients} = request.body;
    const id = parseInt(request.params.id);
    console.log([name, price, ingredients, id])
    try {

        config.db.query('UPDATE services SET name = $1, price = $2, ingredients = $3 WHERE id = $4',
            [name, price, ingredients, id],
            (error, results) => {
            
            return response.status(200).send(`User modified with ID: ${id}`)
            }
        )
    } catch (error) {
        return response.status(400).json("failed to update")
    }
}

const deleteServices = (request, response) => {
    const id =parseInt(request.params.id)

    config.db.query('DELETE FROM services WHERE id = $1', [id], (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`service deleted with ID: ${id}`)
      })
}

const createServices = async (request, response) => {

    await config.db.connect();
    try {
        const {name, price, ingredients} = request.body;
        config.db.query('INSERT INTO services (name, price, ingredients) VALUES ($1, $2, $3) RETURNING *', [name, price, ingredients], (error, results) => {
            return response.status(200).json(`new service added with id:${results.rows[0].id}`)
        })
    } catch (error) {
        
    }
}

const getServicesByOwner = async (request, response) => {
    await config.db.connect();
    try {
        const storeId = request.params.sid;
        const page = parseInt(request.query.page);
        const limit = parseInt(request.query.limit);

        let offset = 0;
        if(page>1){
            offset= (page-1)*limit;
        }
        config.db.query('SELECT * FROM services WHERE store_id = $1 ORDER BY id ASC LIMIT $2 OFFSET $3',[storeId,limit,offset], (error, results) => {
            response.status(200).json(results.rows);
        })
    } catch (error) {
        
    }
}

module.exports = {
    getServices,
    getServicesByID,
    updateServices,
    deleteServices,
    createServices,
    getServicesByOwner
}