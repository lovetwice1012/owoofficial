require('dotenv').config();
const discord = require("discord.js");
const client = new discord.Client();
const mysql = require("mysql");
client.on("ready", async message => {
  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "oneworld"
  });
  connection.connect(err => {
    if (err) {
      client.channels
        .get("772602458983366657")
        .send(
          "<@661793849001246721>データベースへの接続に失敗しました！\n```" +
            err.stack +
            "```"
        );
      return;
    }
  });
  var id = process.argv[2];
  var user = await client.fetchUser(id);
  if (user === undefined || user === null) {
    return;
  }
  connection.query(
    "SELECT * FROM user WHERE id = '" + id + "'",
    async (error, results) => {
      if (results[0] === undefined || results[0] === null) {
        return;
      }
      var get = parseInt(results[0]["money"]) + 5;
      connection.query(
        "UPDATE user SET money = " + get + " WHERE id = '" + id + "';",
        async (error, results) => {
          await user.send(
            "🌟投票ありがとうございます！🌟\nあなたがvoteしたことを確認しました。\nお礼に課金クレジット×5をプレゼントしました！\n12時間後にまた投票できますのでぜひ投票お願いします。\n(このリワードは投票のたびにもらえます。)\nあなたの今のクレジット残高:"+get
          );
          var owner = await client.fetchUser("661793849001246721");
          await owner.send(
            user.username +
              "さんがOneWorldOnline公式鯖か関連鯖にvoteしてくれました…\n"+user.username+"さんのクレジット残高:"+get
          );
          connection.end();
          client.destroy();
        }
      );
    }
  );
});
client.login(process.env.token);
