import * as mysql from 'promise-mysql'
const Bluebird = require('bluebird')
const SqlString = require('sqlstring')

// Direct require dotenv, see https://www.npmjs.com/package/dotenv#usage
// for more.
require('dotenv').config()

let dbname

switch (process.env.NODE_ENV) {
  case 'test':
    dbname = 'koyofea_test'
    break
  case 'development':
    dbname = 'koyofea_development'
    break
  case 'production':
    dbname = 'koyofea_development'
    break
  default:
    dbname = 'koyofea_development'
}

const dbAddress = process.env.DB_HOST || '127.0.0.1'
const dbPort = process.env.DB_PORT || 3306

let connection = mysql.createPool({
  connectionLimit: 100,
  host: dbAddress,
  port: dbPort,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: dbname
})

export let db = Bluebird.promisifyAll(connection)

export function getConnection () {
  return db.getConnection().disposer((connection) => {
    db.releaseConnection(connection)
  })
}

export let query = (sql, value) => {
  let sqlquery = SqlString.format(sql, value)
  if (process.env.NODE_ENV !== 'test') {
    console.log(sqlquery.green)
  }
  return new Bluebird((resolve, reject) => {
    Bluebird.using(getConnection(), (connection) => {
      return connection.query(sqlquery).then((rows) => {
        if (rows.length === 0) {
          resolve({})
        }
        if (rows.length === 1) {
          resolve(rows[0])
        } else {
          let data = []
          if (rows.length) {
            for (var i = 0; i < rows.length; i++) { data.push(JSON.parse(JSON.stringify(rows[i]))) }
          }
          resolve(data)
        }
      }).catch((error) => {
        console.log(error)
        reject(error.code)
      })
    })
  })
}

// export let query = (sql, value) => {
//   return new Promise((resolve, reject) => {
//     query(sql, value).then((result) => {
//       resolve(result)
//     }).catch((err) => {
//       reject(err)
//     })
//   })
// }
