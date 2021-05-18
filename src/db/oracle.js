const oracledb = require('oracledb')
oracledb.autoCommit = true

const oracleConfig = {
  user: process.env.USERNAME,
  password: process.env.PASSWORD,
  connectionString: process.env.ORACLECONNECTIONSTRING,
}
let Connection;

async function connect() {
    try {
        if (Connection) {
            return true; 
        }
        Connection = await oracledb.getConnection(oracleConfig)
        return true;
       } catch (error) {
        return Promise.reject("error in db connection is " + error)
       }
}
async function getData(id,sortByField,sortByOrder,offsetValue,limitValue) {
    try {
        await connect()
        let query = `select * from merchants`;
        if (id) {
            query += ` where id = ${id}`; 
        } else {
            if (sortByField && sortByOrder) {
                query += ` order by ${sortByField} ${sortByOrder}`
            }
            if (offsetValue) {
                query += ` offset ${offsetValue} rows`
            }
            if (limitValue) {
                query += ` fetch next ${limitValue} rows only`
            }
        }
        const result = await Connection.execute(query);
        return result.rows;
    } catch (error) {
        return Promise.reject("error in getData function is" + error);
    }
}
async function insertData(body) {
    try {
        await connect()
        const query = `insert into merchants values (null,'${body.name}','${body.description}','${body.cashback}','${body.slug}','${body.merchant_redirection_url}','${body.country}')`;
        const result = await Connection.execute(query);
        return Promise.resolve(result);
    } catch(error) {
        return Promise.reject("error in post function is" + error)
    }
}
connect()
module.exports = {
    getData,insertData
}