const {Pool} = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "kanbantask",
  password: "postgres",
  port: 5432,
});

pool.connect(function (error) {
  if (!!error) {
    console.log(error);
  } else {
    console.log("postgres connected");
  }
});

module.exports = pool;
