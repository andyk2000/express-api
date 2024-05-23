const config = require("../app.config");
const jwt = require("jsonwebtoken");

const getStores = async (request, response) => {

    await config.db.connect()
    try {
        config.db.query('SELECT * FROM stores', (error, results) => {
            
            return response.status(200).json(results.rows)
        })
    } catch (error) {
        
    }
    
}

const getStoresByID = async (request, response) =>{
    await config.db.connect()
    try {
        const id = parseInt(request.params.id)
  
        config.db.query('SELECT * FROM stores WHERE id = $1 ORDER BY id ASC', [id], (error, results) => {
          
          response.status(200).json(results.rows)
        })   
    } catch (error) {
        
    }
}

const updateStores = async (request, response) => {
    await config.db.connect()
    const {storeName, owner_id, category} = request.body;
    const id = parseInt(request.params.id);
    console.log([storeName, owner_id, category, id])
    try {

        config.db.query('UPDATE stores SET storeName = $1, owner_id = $2, category = $3 WHERE id = $4',
            [storeName, owner_id, category, id],
            (error, results) => {
            
            return response.status(200).send(`Store modified with ID: ${id}`)
            }
        )
    } catch (error) {
        return response.status(400).json("failed to update")
    }
}

const deleteStores = (request, response) => {
    const id =parseInt(request.params.id)

    config.db.query('DELETE FROM stores WHERE id = $1', [id], (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`store deleted with ID: ${id}`)
      })
}

const createStores = async (request, response) => {

    await config.db.connect();
    try {
        const {storeName, owner_id, category} = request.body;
        console.log([storeName, owner_id, category]);
        config.db.query('INSERT INTO stores (storeName, owner_id, category) VALUES ($1, $2, $3) RETURNING *', [storeName, owner_id, category], (error, results) => {
            return response.status(200).json(`new service added with id:${results.rows[0].id}`)
        })
    } catch (error) {
        
    }
}

module.exports = {
    getStores,
    getStoresByID,
    updateStores,
    deleteStores,
    createStores
}