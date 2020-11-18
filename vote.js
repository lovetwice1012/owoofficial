const discord = require("discord.js");
const client = new discord.Client();
const mysql = require("mysql");
client.on("ready", async message => {
  const connection = mysql.createConnection({
    host: "localhost",
    user: "oneworld",
    password: "oneworld",
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
    client.channels
      .get("772426804526317578")
      .send("voteの特典用にdbへの接続を確立させました！");
  });
  var id = process.argv[2];
  var user = await client.fetchUser(id);
  if (user === undefined) {
    console.log("user is undefined");
  }
  if (user === null) {
    console.log("user is null");
  }
  if (user === undefined || user === null) {
    console.log("user " + id + "is deleted or i cant find");
    return;
  }
  connection.query(
    "SELECT * FROM user WHERE id = '" + id + "'",
    async (error, results) => {
      if (results[0] === undefined || results[0] === null) {
        console.log("user " + id + "have never create owo account.");
        return;
      }
      console.log(results[0]["money"]);
      var get = parseInt(results[0]["money"]) + 1;
      console.log(get);
      connection.query(
        "UPDATE user SET money = " + get + " WHERE id = '" + id + "';",
        async (error, results) => {
          console.error(error);
          await user.send(
            "🌟投票ありがとうございます！🌟\nあなたがvoteしたことを確認しました。\nお礼に課金クレジット×1をプレゼントしました！\n12時間後にまた投票できますのでぜひ投票お願いします。\n(このリワードは投票のたびにもらえます。)"
          );
          var owner = await client.fetchUser("661793849001246721");
          await owner.send(
            user.username +
              "さんがOneWorldOnline公式鯖か関連鯖にvoteしてくれました…\n感謝の印に課金クレジットをプレゼントしました！\nきっと喜んでくれると思います。"
          );
          connection.end();
          client.destroy();
        }
      );
    }
  );
});
client.login(process.env.DISCORD_BOT_TOKEN);
