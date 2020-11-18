function evali() {
  const mysql = require("mysql");
  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "oneworld"
  });
  connection.connect(err => {
    if (err) {
      console.error(err);
    }

    var id = process.argv[2];
    connection.query(
      "SELECT * FROM user WHERE id = '" + id + "'",
      async (error, results) => {
        if (results[0]["trycount"] >= 5) {
          return;
        }
        if (results[0]["self"]) {
          connection.query(
            "UPDATE user SET self = 0 WHERE id = '" + id + "';",
            (error, results) => {
              connection.query(
                "UPDATE user SET samecommand = 0 WHERE id = '" + id + "';",
                (error, results) => {
                  console.error(error);
                  connection.query(
                    "UPDATE user SET trycount = 0 WHERE id = '" + id + "';",
                    (error, results) => {
                      console.error(error);
                      connection.end();
                    }
                  );
                }
              );
            }
          );
        }
      }
    );
  });
}
setTimeout(evali, 2000);
