/*
const embed = {
"title": "title",
"description": "desc",
"color": 1041866,
"image": {
"url": "https://cdn.discordapp.com/embed/avatars/0.png"
}
};
message.channel.send({ embed });

const embed = {
"title": "title",
"description": "desc",
"color": 1041866,
"author": {
"name": message.author.username,
"icon_url": message.author.avatarURL
}
};
client.channels.get("").send({ embed });

const embed = {
"title": "コマンドが実行されました！",
"description": "実行されたコマンド\n```"+message.content+"```\n実行されたサーバー名\n```"+message.guild.name+"```\n実行されたサーバーのid\n```"+message.guild.id+"```\n実行されたチャンネル名\n```"+message.channel.name+"```\n実行されたチャンネルid\n```"+message.channel.id+"```\nメッセージid\n```"+message.id+"```\nメッセージurl\n[message link](https://discord.com/channels/"+message.guild.id+"/"+message.channel.id+"/"+message.id+")",
"color": 1041866,
"author": {
"name": message.author.username,
"icon_url": message.author.avatarURL
}
};
client.channels.get("773035867894972416").send({ embed });



*/
const http = require("http");
http
  .createServer(function(request, response) {
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.end("Discord bot is active now \n");
  })
  .listen(3000);
require("date-utils");
var startuplog = "";
startuplog = "起動ログ\n```モジュールのロード:";
var hrstart = process.hrtime();
const discord = require("discord.js");
const client = new discord.Client();
const mysql = require("mysql");
startuplog = startuplog + process.hrtime(hrstart)[1] / 1000000 + "ms\n";
var hrstart1 = process.hrtime();
startuplog = startuplog + "discordへの接続:";
client.on("ready", message => {
  startuplog = startuplog + process.hrtime(hrstart1)[1] / 1000000 + "ms\n";
  var hrstart2 = process.hrtime();
  startuplog = startuplog + "DBへの接続:";
  console.log("bot is ready!");
  const connection = mysql.createConnection({
    host: "freedb.tech",
    user: "freedbtech_oneworld",
    password: "oneworld",
    database: "freedbtech_oneworld"
  });
  connection.connect(err => {
    if (err) {
      console.log("error connecting: " + err.stack);
      startuplog =
        startuplog +
        "失敗\n DBへの接続に失敗しました。起動を完了できません。```";
      client.channels.get("772426804526317578").send(startuplog);
      client.channels
        .get("772602458983366657")
        .send(
          "<@661793849001246721>データベースへの接続に失敗しました！\n```" +
            err.stack +
            "```"
        );
      return;
    }
    startuplog = startuplog + process.hrtime(hrstart2)[1] / 1000000 + "ms\n";
    startuplog = startuplog + "総合起動時間:";
    startuplog = startuplog + process.hrtime(hrstart)[1] / 1000000 + "ms\n";
    startuplog = startuplog + "起動完了しました。```";
    connection.query("SELECT * FROM channel", async (error, results) => {
      for (const id of results.map(obj => obj.id)) {
        connection.query(
          "UPDATE channel SET progress = 0 WHERE id = '" + id + "';",
          (error, results) => {}
        );
      }
    });
    client.channels.get("772426804526317578").send(startuplog);
    console.log("success");
  });

  client.on("message", async message => {
    var expmagni = 1;
    if (message.content.startsWith(";;")) {
      var maintenance = false;
      if (maintenance && message.author.id != 661793849001246721) {
        var reply = await message.reply(
          "メンテナンス中です。メンテ終了までおまちください。"
        );
        reply.delete(3000);
        return;
      }
      var a = Math.floor(Math.random() * 20);
      if (a == 0) {
        const embed = {
          title: "公式サーバーにはもう入りましたか？",
          description:
            "現在このBOTは「仮公開」中です。\nバグなど気づいたことがあったら[このサーバー](https://discord.gg/HKX6hMEYYn)でお知らせください！\n\n～～このBOTを導入してくださっているサーバーの管理者様へ～～\n重要なお知らせなどはすべて[このサーバー](https://discord.gg/HKX6hMEYYn)の「全体お知らせ」というチャンネルでお知らせします。\nこのサーバーにお知らせを受け取る用のチャンネルを作成し、チャンネルのフォローをしていただけると幸いです。",
          color: 1041866,
          image: {
            url:
              "https://cdn.discordapp.com/attachments/772953562702938143/773054733882753064/image0.png"
          }
        };
        message.channel.send({ embed });
      }
      connection.query(
        "SELECT count(*) FROM user WHERE id = '" + message.author.id + "'",
        (error, results) => {
          console.log(results);
          if (error) {
            client.channels
              .get("772602458983366657")
              .send(
                "<@661793849001246721>データベースへの接続に失敗しました！\n```" +
                  error +
                  "```"
              );
            return;
          }
          if (results[0]["count(*)"] == 0 && message.content != ";;register") {
            message.reply(
              '```diff\n -最初に";;register"でアカウントを作成しましょう！```'
            );
            connection.query(
              "UPDATE channel SET progress = 0 WHERE id = '" +
                message.channel.id +
                "';",
              (error, results) => {}
            );
            return;
          } else {
            try {
              if (message.content.startsWith(";;gcreate ")) {
                const embed = {
                  title: "コマンドが実行されました！",
                  description:
                    "実行されたコマンド\n```" +
                    message.content +
                    "```\n実行されたサーバー名\n```" +
                    message.guild.name +
                    "```\n実行されたサーバーのid\n```" +
                    message.guild.id +
                    "```\n実行されたチャンネル名\n```" +
                    message.channel.name +
                    "```\n実行されたチャンネルid\n```" +
                    message.channel.id +
                    "```\nメッセージid\n```" +
                    message.id +
                    "```\nメッセージurl\n[message link](https://discord.com/channels/" +
                    message.guild.id +
                    "/" +
                    message.channel.id +
                    "/" +
                    message.id +
                    ")",
                  color: 1041866,
                  author: {
                    name: message.author.username,
                    icon_url: message.author.avatarURL
                  }
                };
                client.channels.get("773035867894972416").send({ embed });
                var args = message.content.split(" ");
                connection.query(
                  "SELECT count(*) FROM guild WHERE name = '" + args[1] + "'",
                  (error, results) => {
                    if (results[0]["count(*)"] != 0) {
                      message.reply(
                        "```そのギルド名はすでに使用されています！```"
                      );
                    } else {
                      connection.query(
                        "SELECT * FROM user WHERE id = '" +
                          message.author.id +
                          "'",
                        (error, results) => {
                          if (results[0]["guild"] !== null) {
                            message.reply(
                              "```あなたはもうすでにギルドに加入しています。```"
                            );
                          } else {
                            connection.query(
                              "INSERT INTO guild(name,master,gexp) VALUES ('" +
                                args[1] +
                                "'," +
                                message.author.id +
                                ",0)",
                              (error, results) => {
                                if (error) {
                                  client.channels
                                    .get("772602458983366657")
                                    .send(
                                      "<@661793849001246721>データベースへの接続に失敗しました！\n```" +
                                        error +
                                        "```"
                                    );
                                  return;
                                }
                                connection.query(
                                  "UPDATE user SET guild = '" +
                                    args[1] +
                                    "' WHERE id = '" +
                                    message.author.id +
                                    "';",
                                  (error, results) => {}
                                );
                                message.reply(
                                  "```diff\n +ギルドの作成が完了しました！\n```"
                                );
                                const embed = {
                                  title: "ギルドが作成されました！",
                                  description: "ギルド名:" + args[1],
                                  color: 1041866,
                                  author: {
                                    name: message.author.username,
                                    icon_url: message.author.avatarURL
                                  }
                                };
                                client.channels
                                  .get("773035988314226709")
                                  .send({ embed });
                              }
                            );
                          }
                        }
                      );
                    }
                  }
                );
                return;
              }
              if (message.content.startsWith(";;gjoin ")) {
                const embed = {
                  title: "コマンドが実行されました！",
                  description:
                    "実行されたコマンド\n```" +
                    message.content +
                    "```\n実行されたサーバー名\n```" +
                    message.guild.name +
                    "```\n実行されたサーバーのid\n```" +
                    message.guild.id +
                    "```\n実行されたチャンネル名\n```" +
                    message.channel.name +
                    "```\n実行されたチャンネルid\n```" +
                    message.channel.id +
                    "```\nメッセージid\n```" +
                    message.id +
                    "```\nメッセージurl\n[message link](https://discord.com/channels/" +
                    message.guild.id +
                    "/" +
                    message.channel.id +
                    "/" +
                    message.id +
                    ")",
                  color: 1041866,
                  author: {
                    name: message.author.username,
                    icon_url: message.author.avatarURL
                  }
                };
                client.channels.get("773035867894972416").send({ embed });
                var args = message.content.split(" ");
                connection.query(
                  "SELECT count(*) FROM guild WHERE name = '" + args[1] + "'",
                  (error, results) => {
                    if (results[0]["count(*)"] == 0) {
                      message.reply("```そのギルドは存在しません！```");
                    } else {
                      connection.query(
                        "SELECT * FROM user WHERE id = '" +
                          message.author.id +
                          "'",
                        (error, results) => {
                          if (results[0]["guild"] !== null) {
                            message.reply(
                              "```あなたはもうすでにギルドに加入しています。```"
                            );
                          } else {
                            connection.query(
                              "SELECT * FROM guild WHERE name = '" +
                                args[1] +
                                "'",
                              (error, results) => {
                                if (results[0]["canjoin"] == 0) {
                                  message.reply(
                                    "```このギルドは加入を拒否する設定にされています。```"
                                  );
                                } else {
                                  connection.query(
                                    "UPDATE user SET guild = '" +
                                      args[1] +
                                      "' WHERE id = '" +
                                      message.author.id +
                                      "';",
                                    (error, results) => {}
                                  );
                                  message.reply(
                                    "```diff\n +ギルドへの加入が完了しました！\n```"
                                  );
                                  const embed = {
                                    title: "ギルドに参加した人がいます！",
                                    description: "ギルド名:" + args[1],
                                    color: 1041866,
                                    author: {
                                      name: message.author.username,
                                      icon_url: message.author.avatarURL
                                    }
                                  };
                                  client.channels
                                    .get("773036061349380096")
                                    .send({ embed });
                                }
                              }
                            );
                          }
                        }
                      );
                    }
                  }
                );
                return;
              }
              if (message.content.startsWith(";;gleave")) {
                const embed = {
                  title: "コマンドが実行されました！",
                  description:
                    "実行されたコマンド\n```" +
                    message.content +
                    "```\n実行されたサーバー名\n```" +
                    message.guild.name +
                    "```\n実行されたサーバーのid\n```" +
                    message.guild.id +
                    "```\n実行されたチャンネル名\n```" +
                    message.channel.name +
                    "```\n実行されたチャンネルid\n```" +
                    message.channel.id +
                    "```\nメッセージid\n```" +
                    message.id +
                    "```\nメッセージurl\n[message link](https://discord.com/channels/" +
                    message.guild.id +
                    "/" +
                    message.channel.id +
                    "/" +
                    message.id +
                    ")",
                  color: 1041866,
                  author: {
                    name: message.author.username,
                    icon_url: message.author.avatarURL
                  }
                };
                client.channels.get("773035867894972416").send({ embed });
                connection.query(
                  "SELECT count(*) FROM guild WHERE master = '" +
                    message.author.id +
                    "'",
                  (error, results) => {
                    if (results[0]["count(*)"] != 0) {
                      message.reply(
                        "```あなたはギルドのマスターなので脱退することはできません！```"
                      );
                    } else {
                      connection.query(
                        "SELECT * FROM user WHERE id = '" +
                          message.author.id +
                          "'",
                        (error, results) => {
                          if (results[0]["guild"] === null) {
                            message.reply(
                              "```あなたはギルドに加入していません。```"
                            );
                          } else {
                            connection.query(
                              "UPDATE user SET guild = null WHERE id = '" +
                                message.author.id +
                                "';",
                              (error, results) => {}
                            );
                            message.reply(
                              "```diff\n +ギルドから退会しました！\n```"
                            );
                          }
                        }
                      );
                    }
                  }
                );
                return;
              }
              if (message.content.startsWith(";;gpromotion ")) {
                const embed = {
                  title: "コマンドが実行されました！",
                  description:
                    "実行されたコマンド\n```" +
                    message.content +
                    "```\n実行されたサーバー名\n```" +
                    message.guild.name +
                    "```\n実行されたサーバーのid\n```" +
                    message.guild.id +
                    "```\n実行されたチャンネル名\n```" +
                    message.channel.name +
                    "```\n実行されたチャンネルid\n```" +
                    message.channel.id +
                    "```\nメッセージid\n```" +
                    message.id +
                    "```\nメッセージurl\n[message link](https://discord.com/channels/" +
                    message.guild.id +
                    "/" +
                    message.channel.id +
                    "/" +
                    message.id +
                    ")",
                  color: 1041866,
                  author: {
                    name: message.author.username,
                    icon_url: message.author.avatarURL
                  }
                };
                client.channels.get("773035867894972416").send({ embed });
                connection.query(
                  "SELECT * FROM user WHERE id = '" + message.author.id + "'",
                  (error, results) => {
                    if (results[0]["guild"] === null) {
                      message.reply("```あなたはギルドに加入していません。```");
                    } else {
                      var gname = results[0]["guild"];
                      connection.query(
                        "SELECT count(*) FROM guild WHERE name = '" +
                          gname +
                          "' AND master = '" +
                          message.author.id +
                          "'",
                        (error, results) => {
                          if (results[0]["count(*)"] == 0) {
                            message.reply(
                              "```そのギルドはあなたがマスターであるギルドではありません！```"
                            );
                          } else {
                            if (message.mentions.users.size !== 1)
                              return message.channel.send(
                                "メンバーを1人指定してください"
                              );
                            connection.query(
                              "UPDATE guild SET submaster = '" +
                                message.mentions.users.first().id +
                                "' WHERE name = '" +
                                gname +
                                "';",
                              (error, results) => {
                                if (error) {
                                  client.channels
                                    .get("772602458983366657")
                                    .send(
                                      "<@661793849001246721>データベースへの接続に失敗しました！\n```" +
                                        error +
                                        "```"
                                    );
                                  return;
                                }
                                message.reply(
                                  "```diff\n +" +
                                    message.mentions.users.first().username +
                                    "さんを幹部にしました！\n※幹部にできるのは一人だけです。既に設定されていた幹部は幹部から外されます。かわいそうに...\n```"
                                );
                              }
                            );
                          }
                        }
                      );
                    }
                  }
                );
                return;
              }
              if (message.content.startsWith(";;gchange")) {
                const embed = {
                  title: "コマンドが実行されました！",
                  description:
                    "実行されたコマンド\n```" +
                    message.content +
                    "```\n実行されたサーバー名\n```" +
                    message.guild.name +
                    "```\n実行されたサーバーのid\n```" +
                    message.guild.id +
                    "```\n実行されたチャンネル名\n```" +
                    message.channel.name +
                    "```\n実行されたチャンネルid\n```" +
                    message.channel.id +
                    "```\nメッセージid\n```" +
                    message.id +
                    "```\nメッセージurl\n[message link](https://discord.com/channels/" +
                    message.guild.id +
                    "/" +
                    message.channel.id +
                    "/" +
                    message.id +
                    ")",
                  color: 1041866,
                  author: {
                    name: message.author.username,
                    icon_url: message.author.avatarURL
                  }
                };
                client.channels.get("773035867894972416").send({ embed });
                connection.query(
                  "SELECT * FROM user WHERE id = '" + message.author.id + "'",
                  (error, results) => {
                    if (results[0]["guild"] === null) {
                      message.reply("```あなたはギルドに加入していません。```");
                    } else {
                      var gname = results[0]["guild"];
                      connection.query(
                        "SELECT count(*) FROM guild WHERE name = '" +
                          gname +
                          "' AND master = '" +
                          message.author.id +
                          "'",
                        (error, results) => {
                          if (results[0]["count(*)"] == 0) {
                            message.reply(
                              "```そのギルドはあなたがマスターであるギルドではありません！```"
                            );
                          } else {
                            connection.query(
                              "SELECT * FROM guild WHERE name = '" +
                                gname +
                                "'",
                              (error, results) => {
                                if (results[0]["canjoin"]) {
                                  connection.query(
                                    "UPDATE guild SET canjoin = '0' WHERE name = '" +
                                      gname +
                                      "';",
                                    (error, results) => {
                                      if (error) {
                                        client.channels
                                          .get("772602458983366657")
                                          .send(
                                            "<@661793849001246721>データベースへの接続に失敗しました！\n```" +
                                              error +
                                              "```"
                                          );
                                        return;
                                      }
                                      message.reply(
                                        "```\nギルドの状態を「加入不可」に設定しました\n```"
                                      );
                                    }
                                  );
                                } else {
                                  connection.query(
                                    "UPDATE guild SET canjoin = '1' WHERE name = '" +
                                      gname +
                                      "';",
                                    (error, results) => {
                                      if (error) {
                                        client.channels
                                          .get("772602458983366657")
                                          .send(
                                            "<@661793849001246721>データベースへの接続に失敗しました！\n```" +
                                              error +
                                              "```"
                                          );
                                        return;
                                      }
                                      message.reply(
                                        "```\nギルドの状態を「加入可能」に設定しました\n```"
                                      );
                                    }
                                  );
                                }
                              }
                            );
                          }
                        }
                      );
                    }
                  }
                );
                return;
              }

              if (message.content == ";;rank c") {
                const embed = {
                  title: "コマンドが実行されました！",
                  description:
                    "実行されたコマンド\n```" +
                    message.content +
                    "```\n実行されたサーバー名\n```" +
                    message.guild.name +
                    "```\n実行されたサーバーのid\n```" +
                    message.guild.id +
                    "```\n実行されたチャンネル名\n```" +
                    message.channel.name +
                    "```\n実行されたチャンネルid\n```" +
                    message.channel.id +
                    "```\nメッセージid\n```" +
                    message.id +
                    "```\nメッセージurl\n[message link](https://discord.com/channels/" +
                    message.guild.id +
                    "/" +
                    message.channel.id +
                    "/" +
                    message.id +
                    ")",
                  color: 1041866,
                  author: {
                    name: message.author.username,
                    icon_url: message.author.avatarURL
                  }
                };
                client.channels.get("773035867894972416").send({ embed });
                var text = "";
                connection.query(
                  "SELECT * FROM channel ORDER BY lv DESC LIMIT 10",
                  (error, results) => {
                    if (error) {
                      client.channels
                        .get("772602458983366657")
                        .send(
                          "<@661793849001246721>データベースへの接続に失敗しました！\n```" +
                            error +
                            "```"
                        );
                      return;
                    }
                    var i = 1;
                    for (const result of results) {
                      var servername = client.guilds.get(
                        result.guild.toString()
                      );
                      if (
                        servername === null ||
                        servername === undefined ||
                        servername === ""
                      ) {
                        servername = "[Deleted or I cant Find]";
                      } else {
                        servername = servername.name;
                      }
                      var channelname = client.channels.get(
                        result.id.toString()
                      );
                      if (
                        channelname === null ||
                        channelname === undefined ||
                        channelname === ""
                      ) {
                        channelname = "[Deleted or I cant Find]";
                      } else {
                        channelname = channelname.name;
                      }
                      text =
                        text +
                        i +
                        "位:" +
                        servername +
                        "の" +
                        channelname +
                        "(" +
                        result["lv"] +
                        ")\n";
                      i++;
                    }
                    const embed = {
                      title: "チャンネルランキング！",
                      description: text,
                      color: 1041866,
                      author: {
                        name: message.author.username,
                        icon_url: message.author.avatarURL
                      }
                    };
                    message.channel.send({ embed });
                  }
                );
              }
              if (message.content == ";;guse exp") {
                const embed = {
                  title: "コマンドが実行されました！",
                  description:
                    "実行されたコマンド\n```" +
                    message.content +
                    "```\n実行されたサーバー名\n```" +
                    message.guild.name +
                    "```\n実行されたサーバーのid\n```" +
                    message.guild.id +
                    "```\n実行されたチャンネル名\n```" +
                    message.channel.name +
                    "```\n実行されたチャンネルid\n```" +
                    message.channel.id +
                    "```\nメッセージid\n```" +
                    message.id +
                    "```\nメッセージurl\n[message link](https://discord.com/channels/" +
                    message.guild.id +
                    "/" +
                    message.channel.id +
                    "/" +
                    message.id +
                    ")",
                  color: 1041866,
                  author: {
                    name: message.author.username,
                    icon_url: message.author.avatarURL
                  }
                };
                client.channels.get("773035867894972416").send({ embed });
                connection.query(
                  "SELECT * FROM user WHERE id = '" + message.author.id + "'",
                  (error, results) => {
                    if (results[0]["guild"] !== null) {
                      var gname = results[0]["guild"];
                      connection.query(
                        "SELECT count(*) FROM guild WHERE name = '" +
                          gname +
                          "' AND (master = '" +
                          message.author.id +
                          "' OR submaster = '" +
                          message.author.id +
                          "')",
                        (error, results) => {
                          if (error) {
                            client.channels
                              .get("772602458983366657")
                              .send(
                                "<@661793849001246721>データベースへの接続に失敗しました！\n```" +
                                  error +
                                  "```"
                              );
                            return;
                          }
                          if (results[0]["count(*)"] == 0) {
                            message.reply(
                              "```そのギルドはあなたがマスターであるギルドではありません！```"
                            );
                            return;
                          }
                          connection.query(
                            "SELECT * FROM guild WHERE name = '" + gname + "'",
                            (error, results) => {
                              var gexp = results[0]["gexp"];
                              var expvalue = results[0]["exp"];
                              var requiregexp = expvalue * 30000000;
                              if (expvalue > 99) {
                                requiregexp = requiregexp * 2;

                                if (expvalue > 199) {
                                  requiregexp = requiregexp * 2;

                                  if (expvalue > 299) {
                                    requiregexp = requiregexp * 2;

                                    if (expvalue > 399) {
                                      requiregexp = requiregexp * 2;

                                      if (expvalue > 499) {
                                        requiregexp = requiregexp * 2;

                                        if (expvalue > 599) {
                                          requiregexp = requiregexp * 2;

                                          if (expvalue > 699) {
                                            requiregexp = requiregexp * 2;

                                            if (expvalue > 799) {
                                              requiregexp = requiregexp * 2;

                                              if (expvalue > 899) {
                                                requiregexp = requiregexp * 2;

                                                if (expvalue > 999) {
                                                  requiregexp = requiregexp * 2;
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }

                              if (gexp < requiregexp) {
                                message.reply(
                                  "expが足りていません。\n現在のギルド経験値:\n" +
                                    gexp +
                                    "\n必要ギルド経験値:\n" +
                                    requiregexp
                                );
                                return;
                              }
                              connection.query(
                                "UPDATE guild SET exp ='" +
                                  (expvalue + 1) +
                                  "' WHERE name = '" +
                                  gname +
                                  "';",
                                (error, results) => {
                                  connection.query(
                                    "UPDATE guild SET gexp ='" +
                                      (gexp - requiregexp) +
                                      "' WHERE name = '" +
                                      gname +
                                      "';",
                                    (error, results) => {
                                      const embed = {
                                        title:
                                          "経験値段階を上げたギルドがあります！",
                                        description:
                                          "ギルド名:\n" +
                                          gname +
                                          "\n経験値段階:\n" +
                                          (expvalue + 1) +
                                          "\n使用したギルド経験値\n" +
                                          requiregexp +
                                          "\n残りのギルド経験値\n" +
                                          (gexp - requiregexp),
                                        color: 1041866,
                                        author: {
                                          name: message.author.username,
                                          icon_url: message.author.avatarURL
                                        }
                                      };
                                      client.channels
                                        .get("773889804412256267")
                                        .send({ embed });

                                      message.reply(
                                        "成功！exp獲得倍率が1上がりました！\n残りのギルド経験値:\n" +
                                          (gexp - requiregexp)
                                      );
                                    }
                                  );
                                }
                              );
                            }
                          );
                        }
                      );
                    }
                  }
                );
              }

              if (message.content == ";;guse atk") {
                const embed = {
                  title: "コマンドが実行されました！",
                  description:
                    "実行されたコマンド\n```" +
                    message.content +
                    "```\n実行されたサーバー名\n```" +
                    message.guild.name +
                    "```\n実行されたサーバーのid\n```" +
                    message.guild.id +
                    "```\n実行されたチャンネル名\n```" +
                    message.channel.name +
                    "```\n実行されたチャンネルid\n```" +
                    message.channel.id +
                    "```\nメッセージid\n```" +
                    message.id +
                    "```\nメッセージurl\n[message link](https://discord.com/channels/" +
                    message.guild.id +
                    "/" +
                    message.channel.id +
                    "/" +
                    message.id +
                    ")",
                  color: 1041866,
                  author: {
                    name: message.author.username,
                    icon_url: message.author.avatarURL
                  }
                };
                client.channels.get("773035867894972416").send({ embed });
                connection.query(
                  "SELECT * FROM user WHERE id = '" + message.author.id + "'",
                  (error, results) => {
                    if (results[0]["guild"] !== null) {
                      var gname = results[0]["guild"];
                      connection.query(
                        "SELECT count(*) FROM guild WHERE name = '" +
                          gname +
                          "' AND master = '" +
                          message.author.id +
                          "'",
                        (error, results) => {
                          if (results[0]["count(*)"] == 0) {
                            message.reply(
                              "```そのギルドはあなたがマスターであるギルドではありません！```"
                            );
                            return;
                          }
                          connection.query(
                            "SELECT * FROM guild WHERE name = '" + gname + "'",
                            async (error, results) => {
                              var gexp = results[0]["gexp"];
                              var attackvalue = results[0]["attack"];
                              var requiregexp = attackvalue * 50000000;
                              if (attackvalue > 99) {
                                requiregexp = requiregexp * 2;

                                if (attackvalue > 199) {
                                  requiregexp = requiregexp * 2;

                                  if (attackvalue > 299) {
                                    requiregexp = requiregexp * 2;

                                    if (attackvalue > 399) {
                                      requiregexp = requiregexp * 2;

                                      if (attackvalue > 499) {
                                        requiregexp = requiregexp * 2;

                                        if (attackvalue > 599) {
                                          requiregexp = requiregexp * 2;

                                          if (attackvalue > 699) {
                                            requiregexp = requiregexp * 2;

                                            if (attackvalue > 799) {
                                              requiregexp = requiregexp * 2;

                                              if (attackvalue > 899) {
                                                requiregexp = requiregexp * 2;

                                                if (attackvalue > 999) {
                                                  requiregexp = requiregexp * 2;
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }

                              if (gexp < requiregexp) {
                                message.reply(
                                  "expが足りていません。\n現在のギルド経験値:\n" +
                                    gexp +
                                    "\n必要ギルド経験値:\n" +
                                    requiregexp
                                );
                                return;
                              }
                              connection.query(
                                "UPDATE guild SET attack ='" +
                                  (attackvalue + 1) +
                                  "' WHERE name = '" +
                                  gname +
                                  "';",
                                (error, results) => {
                                  connection.query(
                                    "UPDATE guild SET gexp ='" +
                                      (gexp - requiregexp) +
                                      "' WHERE name = '" +
                                      gname +
                                      "';",
                                    (error, results) => {
                                      const embed = {
                                        title:
                                          "攻撃力増加段階を上げたギルドがあります！",
                                        description:
                                          "ギルド名:\n" +
                                          gname +
                                          "\n攻撃力増加段階:\n" +
                                          (attackvalue + 1) +
                                          "\n使用したギルド経験値\n" +
                                          requiregexp +
                                          "\n残りのギルド経験値\n" +
                                          (gexp - requiregexp),
                                        color: 1041866,
                                        author: {
                                          name: message.author.username,
                                          icon_url: message.author.avatarURL
                                        }
                                      };
                                      client.channels
                                        .get("773889892090511380")
                                        .send({ embed });

                                      message.reply(
                                        "成功！攻撃力増加段階が1上がりました！\n残りのギルド経験値:\n" +
                                          (gexp - requiregexp)
                                      );
                                    }
                                  );
                                }
                              );
                            }
                          );
                        }
                      );
                    }
                  }
                );
              }

              if (message.content == ";;ginfo") {
                const embed = {
                  title: "コマンドが実行されました！",
                  description:
                    "実行されたコマンド\n```" +
                    message.content +
                    "```\n実行されたサーバー名\n```" +
                    message.guild.name +
                    "```\n実行されたサーバーのid\n```" +
                    message.guild.id +
                    "```\n実行されたチャンネル名\n```" +
                    message.channel.name +
                    "```\n実行されたチャンネルid\n```" +
                    message.channel.id +
                    "```\nメッセージid\n```" +
                    message.id +
                    "```\nメッセージurl\n[message link](https://discord.com/channels/" +
                    message.guild.id +
                    "/" +
                    message.channel.id +
                    "/" +
                    message.id +
                    ")",
                  color: 1041866,
                  author: {
                    name: message.author.username,
                    icon_url: message.author.avatarURL
                  }
                };
                client.channels.get("773035867894972416").send({ embed });
                connection.query(
                  "SELECT * FROM user WHERE id = '" + message.author.id + "'",
                  (error, results) => {
                    if (results[0]["guild"] !== null) {
                      var gname = results[0]["guild"];
                      connection.query(
                        "SELECT * FROM guild WHERE name = '" + gname + "'",
                        async (error, results) => {
                          var gexp = results[0]["gexp"];
                          var expvalue = results[0]["exp"];
                          var requiregexp = expvalue * 30000000;
                          if (expvalue > 99) {
                            requiregexp = requiregexp * 2;

                            if (expvalue > 199) {
                              requiregexp = requiregexp * 2;

                              if (expvalue > 299) {
                                requiregexp = requiregexp * 2;

                                if (expvalue > 399) {
                                  requiregexp = requiregexp * 2;

                                  if (expvalue > 499) {
                                    requiregexp = requiregexp * 2;

                                    if (expvalue > 599) {
                                      requiregexp = requiregexp * 2;

                                      if (expvalue > 699) {
                                        requiregexp = requiregexp * 2;

                                        if (expvalue > 799) {
                                          requiregexp = requiregexp * 2;

                                          if (expvalue > 899) {
                                            requiregexp = requiregexp * 2;

                                            if (expvalue > 999) {
                                              requiregexp = requiregexp * 2;
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }

                          var attackvalue = results[0]["attack"];
                          var requireatkgexp = attackvalue * 50000000;
                          if (attackvalue > 99) {
                            requireatkgexp = requireatkgexp * 2;

                            if (attackvalue > 199) {
                              requireatkgexp = requireatkgexp * 2;

                              if (attackvalue > 299) {
                                requireatkgexp = requireatkgexp * 2;

                                if (attackvalue > 399) {
                                  requireatkgexp = requireatkgexp * 2;

                                  if (attackvalue > 499) {
                                    requireatkgexp = requireatkgexp * 2;

                                    if (attackvalue > 599) {
                                      requireatkgexp = requireatkgexp * 2;

                                      if (attackvalue > 699) {
                                        requireatkgexp = requireatkgexp * 2;

                                        if (attackvalue > 799) {
                                          requireatkgexp = requireatkgexp * 2;

                                          if (attackvalue > 899) {
                                            requireatkgexp = requireatkgexp * 2;

                                            if (attackvalue > 999) {
                                              requireatkgexp =
                                                requireatkgexp * 2;
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }

                          const embed = {
                            title: gname + "のギルド情報",
                            description:
                              "所有gexp:\n```" +
                              gexp +
                              "```\n現在の経験値増加段階:\n```" +
                              expvalue +
                              "```\n経験値増加段階を次の段階に上げるために必要なギルド経験値:\n```" +
                              requiregexp +
                              "```\n現在の攻撃力増加段階:\n```" +
                              attackvalue +
                              "```\n攻撃力増加段階を次の段階に上げるために必要なギルド経験値:\n```" +
                              requireatkgexp +
                              "```",
                            color: 1041866,
                            author: {
                              name: message.author.username,
                              icon_url: message.author.avatarURL
                            }
                          };
                          message.channel.send({ embed });
                        }
                      );
                    }
                  }
                );
              }
              if (message.content == ";;re") {
                const embed = {
                  title: "コマンドが実行されました！",
                  description:
                    "実行されたコマンド\n```" +
                    message.content +
                    "```\n実行されたサーバー名\n```" +
                    message.guild.name +
                    "```\n実行されたサーバーのid\n```" +
                    message.guild.id +
                    "```\n実行されたチャンネル名\n```" +
                    message.channel.name +
                    "```\n実行されたチャンネルid\n```" +
                    message.channel.id +
                    "```\nメッセージid\n```" +
                    message.id +
                    "```\nメッセージurl\n[message link](https://discord.com/channels/" +
                    message.guild.id +
                    "/" +
                    message.channel.id +
                    "/" +
                    message.id +
                    ")",
                  color: 1041866,
                  author: {
                    name: message.author.username,
                    icon_url: message.author.avatarURL
                  }
                };
                client.channels.get("773035867894972416").send({ embed });
                connection.query(
                  "SELECT * FROM user WHERE id = '" + message.author.id + "'",
                  (error, results) => {
                    if (
                      results[0]["joinchannel"] !== null &&
                      results[0]["joinchannel"] == message.channel.id
                    ) {
                      connection.query(
                        "SELECT * FROM channel WHERE id = '" +
                          message.channel.id +
                          "'",
                        (error, results) => {
                          console.log(results);
                          var nextenemyid = results[0]["enemyid"];
                          var nextlv = results[0]["lv"];
                          connection.query(
                            "SELECT * FROM enemy WHERE id = '" +
                              nextenemyid +
                              "'",
                            (error, results) => {
                              console.log(results);
                              var zokusei = results[0]["attribute"];
                              var nexthp = results[0]["hp"] * nextlv;
                              var nextname = results[0]["name"];
                              var nexturl = results[0]["url"];
                              connection.query(
                                "SELECT * FROM attribute WHERE id = '" +
                                  zokusei +
                                  "'",
                                (error, results) => {
                                  var zokuseitxt = results[0]["name"];
                                  connection.query(
                                    "SELECT id FROM user WHERE joinchannel = '" +
                                      message.channel.id +
                                      "'",
                                    (error, results) => {
                                      console.log(results);
                                      if (error) {
                                        client.channels
                                          .get("772602458983366657")
                                          .send(
                                            "<@661793849001246721>データベースへの接続に失敗しました！\n```" +
                                              error +
                                              "```"
                                          );
                                        return;
                                      }
                                      console.log(results.map(obj => obj.id));
                                      for (const id of results.map(
                                        obj => obj.id
                                      )) {
                                        connection.query(
                                          "SELECT * FROM user WHERE id = '" +
                                            id +
                                            "'",
                                          (error, results) => {
                                            var playerlv = Math.floor(
                                              Math.sqrt(
                                                results[0][
                                                  "job" + results[0]["nowjob"]
                                                ]
                                              )
                                            );
                                            console.log(nexthp);
                                            var nextphp = playerlv * 10;
                                            var nowlv = nextlv - 1;
                                            connection.query(
                                              "UPDATE channel SET hp = '" +
                                                nexthp +
                                                "' WHERE id = '" +
                                                message.channel.id +
                                                "';",
                                              (error, results) => {
                                                connection.query(
                                                  "UPDATE user SET hp = '" +
                                                    nextphp +
                                                    "' WHERE id = '" +
                                                    id +
                                                    "';",
                                                  (error, results) => {
                                                    connection.query(
                                                      "UPDATE user SET joinchannel = null WHERE id = '" +
                                                        id +
                                                        "';",
                                                      (error, results) => {
                                                        if (error) {
                                                          client.channels
                                                            .get(
                                                              "772602458983366657"
                                                            )
                                                            .send(
                                                              "<@661793849001246721>データベースへの接続に失敗しました！\n```" +
                                                                error +
                                                                "```"
                                                            );
                                                          return;
                                                        }
                                                      }
                                                    );
                                                  }
                                                );
                                              }
                                            );
                                          }
                                        );
                                      }
                                    }
                                  );
                                  connection.query(
                                    "UPDATE channel SET joinmember = null WHERE id = '" +
                                      message.channel.id +
                                      "';",
                                    (error, results) => {}
                                  );
                                  const embed = {
                                    title:
                                      "レア度[通常] 属性[" +
                                      zokuseitxt +
                                      "]\n" +
                                      nextname +
                                      "が待ち構えている...\nLv:" +
                                      nextlv +
                                      " HP:" +
                                      nexthp,
                                    color: 1041866,
                                    image: { url: nexturl }
                                  };
                                  message.channel.send({ embed });
                                }
                              );
                            }
                          );
                        }
                      );
                    } else {
                      message.reply(
                        "```あなたはこのチャンネルで戦闘に参加していませんよ？```"
                      );
                    }
                  }
                );
              }
              if (message.content.startsWith(";;role")) {
                const embed = {
                  title: "コマンドが実行されました！",
                  description:
                    "実行されたコマンド\n```" +
                    message.content +
                    "```\n実行されたサーバー名\n```" +
                    message.guild.name +
                    "```\n実行されたサーバーのid\n```" +
                    message.guild.id +
                    "```\n実行されたチャンネル名\n```" +
                    message.channel.name +
                    "```\n実行されたチャンネルid\n```" +
                    message.channel.id +
                    "```\nメッセージid\n```" +
                    message.id +
                    "```\nメッセージurl\n[message link](https://discord.com/channels/" +
                    message.guild.id +
                    "/" +
                    message.channel.id +
                    "/" +
                    message.id +
                    ")",
                  color: 1041866,
                  author: {
                    name: message.author.username,
                    icon_url: message.author.avatarURL
                  }
                };
                client.channels.get("773035867894972416").send({ embed });
                var args = message.content.split(" ");
                if (args[1] == 0 || args[1] == 1 || args[1] == 2) {
                  connection.query(
                    "UPDATE user SET nowjob = '" +
                      args[1] +
                      "' WHERE id = '" +
                      message.author.id +
                      "';",
                    (error, results) => {
                      switch (args[1]) {
                        case "0":
                          var name = "冒険者";
                          break;
                        case "1":
                          var name = "戦士";
                          break;
                        case "2":
                          var name = "魔術師";
                          break;
                      }
                      if (!error) {
                        const embed = {
                          description:
                            "職業の変更が完了しました！\nあなたの現在の職業は" +
                            name +
                            "です！",
                          color: 1041866
                        };
                        message.channel.send({ embed });
                      }
                    }
                  );
                } else {
                  message.channel.send(
                    "```__職業のリスト__\n0:冒険者\n1:戦士\n2:魔術師\n\nコマンドの使用方法\n;;role number```"
                  );
                }
              }
              if (
                message.content == ";;change" &&
                message.author.username == "yus10124"
              ) {
                const embed = {
                  title: "コマンドが実行されました！",
                  description:
                    "実行されたコマンド\n```" +
                    message.content +
                    "```\n実行されたサーバー名\n```" +
                    message.guild.name +
                    "```\n実行されたサーバーのid\n```" +
                    message.guild.id +
                    "```\n実行されたチャンネル名\n```" +
                    message.channel.name +
                    "```\n実行されたチャンネルid\n```" +
                    message.channel.id +
                    "```\nメッセージid\n```" +
                    message.id +
                    "```\nメッセージurl\n[message link](https://discord.com/channels/" +
                    message.guild.id +
                    "/" +
                    message.channel.id +
                    "/" +
                    message.id +
                    ")",
                  color: 1041866,
                  author: {
                    name: message.author.username,
                    icon_url: message.author.avatarURL
                  }
                };
                client.channels.get("773035867894972416").send({ embed });
                connection.query(
                  "UPDATE user SET job0 = '100000000000000' WHERE id = '" +
                    message.author.id +
                    "';",
                  (error, results) => {}
                );
              }
              if (message.content == ";;sinka") {
                const embed = {
                  title: "コマンドが実行されました！",
                  description:
                    "実行されたコマンド\n```" +
                    message.content +
                    "```\n実行されたサーバー名\n```" +
                    message.guild.name +
                    "```\n実行されたサーバーのid\n```" +
                    message.guild.id +
                    "```\n実行されたチャンネル名\n```" +
                    message.channel.name +
                    "```\n実行されたチャンネルid\n```" +
                    message.channel.id +
                    "```\nメッセージid\n```" +
                    message.id +
                    "```\nメッセージurl\n[message link](https://discord.com/channels/" +
                    message.guild.id +
                    "/" +
                    message.channel.id +
                    "/" +
                    message.id +
                    ")",
                  color: 1041866,
                  author: {
                    name: message.author.username,
                    icon_url: message.author.avatarURL
                  }
                };
                client.channels.get("773035867894972416").send({ embed });
                connection.query(
                  "SELECT * FROM user WHERE id = '" + message.author.id + "'",
                  (error, results) => {
                    console.log(results);
                    if (error) {
                      client.channels
                        .get("772602458983366657")
                        .send(
                          "<@661793849001246721>データベースへの接続に失敗しました！\n```" +
                            error +
                            "```"
                        );
                      return;
                    }
                    var nowjob = "job" + results[0]["nowjob"];
                    var nowexp = results[0]["job" + results[0]["nowjob"]];
                    var playerlv = Math.floor(
                      Math.sqrt(results[0]["job" + results[0]["nowjob"]])
                    );
                    if (
                      playerlv >
                      results[0]["job" + results[0]["nowjob"] + "id"] *
                        results[0]["job" + results[0]["nowjob"] + "id"] *
                        results[0]["job" + results[0]["nowjob"] + "id"]
                    ) {
                      connection.query(
                        "UPDATE user SET job" +
                          results[0]["nowjob"] +
                          "id = '" +
                          (results[0]["job" + results[0]["nowjob"] + "id"] +
                            1) +
                          "' WHERE id = '" +
                          message.author.id +
                          "';",
                        (error, results) => {
                          if (error) {
                            console.log(error);
                          }
                        }
                      );
                    }
                    connection.query(
                      "SELECT * FROM user WHERE id = '" +
                        message.author.id +
                        "'",
                      (error, results) => {
                        console.log(results);
                        if (error) {
                          client.channels
                            .get("772602458983366657")
                            .send(
                              "<@661793849001246721>データベースへの接続に失敗しました！\n```" +
                                error +
                                "```"
                            );
                          return;
                        }
                        var nowjob = "job" + results[0]["nowjob"];
                        var nowexp = results[0]["job" + results[0]["nowjob"]];
                        var playerlv = Math.floor(
                          Math.sqrt(results[0]["job" + results[0]["nowjob"]])
                        );
                        message.channel.send(
                          "```\n現在のあなたのレベルは" +
                            playerlv +
                            "です。\nあなたの役職熟練度は" +
                            results[0]["job" + results[0]["nowjob"] + "id"] +
                            "です。\n```"
                        );
                        const embed = {
                          title: "進化コマンドが実行されました！",
                          description:
                            "レベル:\n" +
                            playerlv +
                            "\n職業熟練度:\n" +
                            results[0]["job" + results[0]["nowjob"] + "id"],
                          color: 1041866,
                          author: {
                            name: message.author.username,
                            icon_url: message.author.avatarURL
                          }
                        };
                        client.channels
                          .get("773035922546491432")
                          .send({ embed });
                      }
                    );
                  }
                );
              }
              if (message.content == ";;unlock") {
                const embed = {
                  title: "コマンドが実行されました！",
                  description:
                    "実行されたコマンド\n```" +
                    message.content +
                    "```\n実行されたサーバー名\n```" +
                    message.guild.name +
                    "```\n実行されたサーバーのid\n```" +
                    message.guild.id +
                    "```\n実行されたチャンネル名\n```" +
                    message.channel.name +
                    "```\n実行されたチャンネルid\n```" +
                    message.channel.id +
                    "```\nメッセージid\n```" +
                    message.id +
                    "```\nメッセージurl\n[message link](https://discord.com/channels/" +
                    message.guild.id +
                    "/" +
                    message.channel.id +
                    "/" +
                    message.id +
                    ")",
                  color: 1041866,
                  author: {
                    name: message.author.username,
                    icon_url: message.author.avatarURL
                  }
                };
                client.channels.get("773035867894972416").send({ embed });
                connection.query(
                  "UPDATE channel SET progress = 0 WHERE id = '" +
                    message.channel.id +
                    "';",
                  (error, results) => {}
                );
                connection.query(
                  "UPDATE raidchannel SET progress = 0 WHERE id = '" +
                    message.channel.id +
                    "';",
                  (error, results) => {}
                );
                message.delete(100);
              }
              if (message.content.startsWith(";;register")) {
                const embed = {
                  title: "コマンドが実行されました！",
                  description:
                    "実行されたコマンド\n```" +
                    message.content +
                    "```\n実行されたサーバー名\n```" +
                    message.guild.name +
                    "```\n実行されたサーバーのid\n```" +
                    message.guild.id +
                    "```\n実行されたチャンネル名\n```" +
                    message.channel.name +
                    "```\n実行されたチャンネルid\n```" +
                    message.channel.id +
                    "```\nメッセージid\n```" +
                    message.id +
                    "```\nメッセージurl\n[message link](https://discord.com/channels/" +
                    message.guild.id +
                    "/" +
                    message.channel.id +
                    "/" +
                    message.id +
                    ")",
                  color: 1041866,
                  author: {
                    name: message.author.username,
                    icon_url: message.author.avatarURL
                  }
                };
                client.channels.get("773035867894972416").send({ embed });
                connection.query(
                  "INSERT INTO user(id,haveweapon,item) VALUES (" +
                    message.author.id +
                    ",'{}','{}')",
                  (error, results) => {
                    if (error) {
                      client.channels
                        .get("772602458983366657")
                        .send(
                          "<@661793849001246721>データベースへの接続に失敗しました！\n```" +
                            error +
                            "```"
                        );
                      message.reply(
                        "```diff\n -あなたはもうすでにアカウントを作成しています！\n```"
                      );
                      return;
                    }
                    message.reply(
                      "```diff\n +アカウントの作成が完了しました！\n```"
                    );
                    const embed = {
                      title: "アカウントが作成されました！",
                      description:
                        "ユーザー名\n" +
                        message.author.username +
                        "\nアカウント作成日時\n" +
                        message.author.createdAt,
                      color: 1041866,
                      author: {
                        name: message.author.username,
                        icon_url: message.author.avatarURL
                      }
                    };
                    client.channels.get("773038096391864350").send({ embed });
                  }
                );
                return;
              }
              if (message.content.startsWith(";;prepare")) {
                const embed = {
                  title: "コマンドが実行されました！",
                  description:
                    "実行されたコマンド\n```" +
                    message.content +
                    "```\n実行されたサーバー名\n```" +
                    message.guild.name +
                    "```\n実行されたサーバーのid\n```" +
                    message.guild.id +
                    "```\n実行されたチャンネル名\n```" +
                    message.channel.name +
                    "```\n実行されたチャンネルid\n```" +
                    message.channel.id +
                    "```\nメッセージid\n```" +
                    message.id +
                    "```\nメッセージurl\n[message link](https://discord.com/channels/" +
                    message.guild.id +
                    "/" +
                    message.channel.id +
                    "/" +
                    message.id +
                    ")",
                  color: 1041866,
                  author: {
                    name: message.author.username,
                    icon_url: message.author.avatarURL
                  }
                };
                client.channels.get("773035867894972416").send({ embed });
                connection.query(
                  "INSERT INTO channel(id,guild) VALUES ('" +
                    message.channel.id +
                    "','" +
                    message.guild.id +
                    "')",
                  (error, results) => {
                    if (error) {
                      message.reply(
                        "```diff\n -このチャンネルはすでに登録されています！\n```"
                      );
                      return;
                    }
                    message.reply(
                      "```diff\n +このチャンネルをOneWorldの冒険チャンネルとして登録しました！\n```"
                    );
                    var embed = {
                      title: "チャンネルが登録されました！",
                      description:
                        "チャンネル名:\n" +
                        message.channel.name +
                        "\nサーバー名:\n" +
                        message.guild.name +
                        "\nチャンネルid:\n" +
                        message.channel.id,
                      color: 1041866,
                      author: {
                        name: message.author.username,
                        icon_url: message.author.avatarURL
                      }
                    };
                    client.channels.get("773038137320538143").send({ embed });
                    var embed = {
                      title:
                        "レア度[通常]　属性[無]\n練習用ロボットが待ち構えている...\nLv.1 HP:10",
                      color: 1041866,
                      image: {
                        url:
                          "https://media.discordapp.net/attachments/772953562702938143/772953856954859530/image0.png"
                      }
                    };
                    message.channel.send({ embed });
                  }
                );
                return;
              }
              if (
                message.content.startsWith(";;atk") ||
                message.content.startsWith(";;attack")
              ) {
                const embed = {
                  title: "コマンドが実行されました！",
                  description:
                    "実行されたコマンド\n```" +
                    message.content +
                    "```\n実行されたサーバー名\n```" +
                    message.guild.name +
                    "```\n実行されたサーバーのid\n```" +
                    message.guild.id +
                    "```\n実行されたチャンネル名\n```" +
                    message.channel.name +
                    "```\n実行されたチャンネルid\n```" +
                    message.channel.id +
                    "```\nメッセージid\n```" +
                    message.id +
                    "```\nメッセージurl\n[message link](https://discord.com/channels/" +
                    message.guild.id +
                    "/" +
                    message.channel.id +
                    "/" +
                    message.id +
                    ")",
                  color: 1041866,
                  author: {
                    name: message.author.username,
                    icon_url: message.author.avatarURL
                  }
                };
                client.channels.get("773035867894972416").send({ embed });
                connection.query(
                  "SELECT joinchannel FROM user WHERE id = '" +
                    message.author.id +
                    "'",
                  (error, results) => {
                    if (results[0] !== null && results[0] !== undefined) {
                      if (
                        results[0].joinchannel != message.channel.id &&
                        results[0].joinchannel !== null
                      ) {
                        message.reply(
                          "> あなたは<#" +
                            results[0].joinchannel +
                            ">ですでに戦闘中です。"
                        );
                        return;
                      }
                    }
                    connection.query(
                      "SELECT count(*) FROM channel WHERE id = '" +
                        message.channel.id +
                        "'",
                      (error, results) => {
                        if (error) {
                          client.channels
                            .get("772602458983366657")
                            .send(
                              "<@661793849001246721>データベースへの接続に失敗しました！\n```" +
                                error +
                                "```"
                            );
                          return;
                        }
                        if (results[0]["count(*)"] == 0) {
                          message.reply(
                            '```diff\n -最初に";;prepare"でチャンネルを登録しましょう！```'
                          );
                        }
                      }
                    );
                    connection.query(
                      "SELECT * FROM channel WHERE id = '" +
                        message.channel.id +
                        "'",
                      async (error, results) => {
                        if (error) {
                          client.channels
                            .get("772602458983366657")
                            .send(
                              "<@661793849001246721>データベースへの接続に失敗しました！\n```" +
                                error +
                                "```"
                            );
                          return;
                        }
                        if (results[0]["progress"]) {
                          var reply = await message.reply(
                            "```diff\n -前の処理が進行中です。\n```"
                          );
                          reply.delete(5000);
                          return false;
                        } else {
                          connection.query(
                            "UPDATE channel SET progress = 1 WHERE id = '" +
                              message.channel.id +
                              "';",
                            (error, results) => {}
                          );
                          connection.query(
                            "SELECT * FROM user WHERE id = '" +
                              message.author.id +
                              "'",
                            (error, results) => {
                              if (error) {
                                client.channels
                                  .get("772602458983366657")
                                  .send(
                                    "<@661793849001246721>データベースへの接続に失敗しました！\n```" +
                                      error +
                                      "```"
                                  );
                                return;
                              }
                              if (results[0]["hp"] == 0) {
                                message.reply(
                                  "```diff\n -あなたはもうやられています...！```"
                                );
                                connection.query(
                                  "UPDATE channel SET progress = 0 WHERE id = '" +
                                    message.channel.id +
                                    "';",
                                  (error, results) => {}
                                );
                                return;
                              } else {
                                connection.query(
                                  "UPDATE user SET joinchannel = '" +
                                    message.channel.id +
                                    "' WHERE id = '" +
                                    message.author.id +
                                    "';",
                                  (error, results) => {
                                    if (error) {
                                      client.channels
                                        .get("772602458983366657")
                                        .send(
                                          "<@661793849001246721>データベースへの接続に失敗しました！\n```" +
                                            error +
                                            "```"
                                        );
                                      return;
                                    }
                                  }
                                );
                                connection.query(
                                  "SELECT * FROM user WHERE id = '" +
                                    message.author.id +
                                    "'",
                                  (error, results) => {
                                    if (error) {
                                      client.channels
                                        .get("772602458983366657")
                                        .send(
                                          "<@661793849001246721>データベースへの接続に失敗しました！\n```" +
                                            error +
                                            "```"
                                        );
                                      return;
                                    }
                                    var php = results[0]["hp"];
                                    var atkmagni = 1;
                                    switch (results[0]["nowjob"]) {
                                      case 0:
                                      case 3:
                                        break;
                                      case 2:
                                        atkmagni = 0.5;
                                        break;
                                      case 1:
                                        atkmagni = 5;
                                        break;
                                    }
                                    var damage =
                                      Math.floor(
                                        Math.sqrt(
                                          results[0][
                                            "job" + results[0]["nowjob"]
                                          ]
                                        )
                                      ) *
                                      atkmagni *
                                      results[0][
                                        "job" + results[0]["nowjob"] + "id"
                                      ];
                                    var nowjob = "job" + results[0]["nowjob"];
                                    var nowexp =
                                      results[0]["job" + results[0]["nowjob"]];
                                    var playerlv = Math.floor(
                                      Math.sqrt(
                                        results[0]["job" + results[0]["nowjob"]]
                                      )
                                    );
                                    if (results[0]["guild"] !== null) {
                                      var gname = results[0]["guild"];
                                      connection.query(
                                        "SELECT * FROM guild WHERE name = '" +
                                          gname +
                                          "'",
                                        (error, results) => {
                                          damage =
                                            damage +
                                            damage *
                                              (results[0]["attack"] * 0.075);
                                        }
                                      );
                                    }

                                    connection.query(
                                      "SELECT * FROM channel WHERE id = '" +
                                        message.channel.id +
                                        "'",
                                      (error, results) => {
                                        var clv = results[0]["lv"];
                                        var enemyhp = results[0]["hp"];
                                        connection.query(
                                          "SELECT * FROM enemy WHERE id = '" +
                                            results[0]["enemyid"] +
                                            "'",
                                          (error, results) => {
                                            var magni = results[0]["magni"];
                                            damage =
                                              damage / results[0]["defend"];
                                            var getdamage =
                                              results[0]["attack"];
                                            getdamage = Math.ceil(
                                              getdamage * clv
                                            );
                                            if (php - getdamage < 1) {
                                              var playerhp = 0;
                                            } else {
                                              var playerhp = php - getdamage;
                                            }
                                            connection.query(
                                              "UPDATE user SET hp = '" +
                                                playerhp +
                                                "' WHERE id = '" +
                                                message.author.id +
                                                "';",
                                              (error, results) => {
                                                if (enemyhp - damage < 1) {
                                                  var kill = true;
                                                  var enemy = 0;
                                                } else {
                                                  var kill = false;
                                                  var enemy = enemyhp - damage;
                                                }
                                                connection.query(
                                                  "UPDATE channel SET hp = '" +
                                                    enemy +
                                                    "' WHERE id = '" +
                                                    message.channel.id +
                                                    "';",
                                                  (error, results) => {
                                                    console.log(results);
                                                    if (enemy != 0) {
                                                      message.channel.send(
                                                        "```\n" +
                                                          message.author
                                                            .username +
                                                          "は敵に" +
                                                          damage +
                                                          "ダメージ与えた\n敵の残りHP:" +
                                                          enemy +
                                                          "\n" +
                                                          message.author
                                                            .username +
                                                          "は敵から" +
                                                          getdamage +
                                                          "ダメージ受けた\nあなたの残りHP:" +
                                                          playerhp +
                                                          "```"
                                                      );
                                                    } else {
                                                      message.channel.send(
                                                        "```\n" +
                                                          message.author
                                                            .username +
                                                          "は敵に" +
                                                          damage +
                                                          "ダメージ与えた\n敵の残りHP:" +
                                                          enemy +
                                                          "\n敵を倒した！```"
                                                      );
                                                    }
                                                    if (kill) {
                                                      connection.query(
                                                        "SELECT * FROM enemy ORDER BY RAND() LIMIT 1",
                                                        (error, results) => {
                                                          var nexturl =
                                                            results[0]["url"];
                                                          var zokusei =
                                                            results[0][
                                                              "attribute"
                                                            ];
                                                          var nexthp =
                                                            results[0]["hp"];
                                                          var nextname =
                                                            results[0]["name"];
                                                          var nextenemyid =
                                                            results[0]["id"];
                                                          connection.query(
                                                            "SELECT * FROM channel WHERE id = '" +
                                                              message.channel
                                                                .id +
                                                              "'",
                                                            (
                                                              error,
                                                              results
                                                            ) => {
                                                              nexthp =
                                                                nexthp *
                                                                results[0][
                                                                  "lv"
                                                                ];
                                                              var nextlv =
                                                                results[0][
                                                                  "lv"
                                                                ] + 1;
                                                              connection.query(
                                                                "UPDATE channel SET lv = '" +
                                                                  (results[0][
                                                                    "lv"
                                                                  ] +
                                                                    1) +
                                                                  "', enemyid = '" +
                                                                  nextenemyid +
                                                                  "' WHERE id = '" +
                                                                  message
                                                                    .channel
                                                                    .id +
                                                                  "';",
                                                                (
                                                                  error,
                                                                  results
                                                                ) => {
                                                                  connection.query(
                                                                    "SELECT * FROM attribute WHERE id = '" +
                                                                      zokusei +
                                                                      "'",
                                                                    (
                                                                      error,
                                                                      results
                                                                    ) => {
                                                                      var zokuseitxt =
                                                                        results[0][
                                                                          "name"
                                                                        ];
                                                                      connection.query(
                                                                        "SELECT id FROM user WHERE joinchannel = '" +
                                                                          message
                                                                            .channel
                                                                            .id +
                                                                          "'",
                                                                        (
                                                                          error,
                                                                          results
                                                                        ) => {
                                                                          if (
                                                                            error
                                                                          ) {
                                                                            client.channels
                                                                              .get(
                                                                                "772602458983366657"
                                                                              )
                                                                              .send(
                                                                                "<@661793849001246721>データベースへの接続に失敗しました！\n```" +
                                                                                  error +
                                                                                  "```"
                                                                              );
                                                                            return;
                                                                          }
                                                                          console.log(
                                                                            results.map(
                                                                              obj =>
                                                                                obj.id
                                                                            )
                                                                          );
                                                                          promise = new Promise(
                                                                            (
                                                                              resolve,
                                                                              reject
                                                                            ) => {
                                                                              for (const id of results.map(
                                                                                obj =>
                                                                                  obj.id
                                                                              )) {
                                                                                connection.query(
                                                                                  "SELECT * FROM user WHERE id = '" +
                                                                                    id +
                                                                                    "'",
                                                                                  (
                                                                                    error,
                                                                                    results
                                                                                  ) => {
                                                                                    var playerlv = Math.floor(
                                                                                      Math.sqrt(
                                                                                        results[0][
                                                                                          "job" +
                                                                                            results[0][
                                                                                              "nowjob"
                                                                                            ]
                                                                                        ]
                                                                                      )
                                                                                    );
                                                                                    var nowjob =
                                                                                      "job" +
                                                                                      results[0][
                                                                                        "nowjob"
                                                                                      ];
                                                                                    var nowexp =
                                                                                      results[0][
                                                                                        "job" +
                                                                                          results[0][
                                                                                            "nowjob"
                                                                                          ]
                                                                                      ];
                                                                                    var playerlv = Math.floor(
                                                                                      Math.sqrt(
                                                                                        results[0][
                                                                                          "job" +
                                                                                            results[0][
                                                                                              "nowjob"
                                                                                            ]
                                                                                        ]
                                                                                      )
                                                                                    );
                                                                                    var nextphp =
                                                                                      playerlv *
                                                                                      10;
                                                                                    var nowlv =
                                                                                      nextlv -
                                                                                      1;
                                                                                    var getexp =
                                                                                      nowlv *
                                                                                        magni +
                                                                                      nowexp;
                                                                                    var getguildexp =
                                                                                      nowlv *
                                                                                      magni;
                                                                                    connection.query(
                                                                                      "SELECT * FROM user WHERE id = '" +
                                                                                        message
                                                                                          .author
                                                                                          .id +
                                                                                        "'",
                                                                                      (
                                                                                        error,
                                                                                        results
                                                                                      ) => {
                                                                                        if (
                                                                                          results[0][
                                                                                            "guild"
                                                                                          ] !==
                                                                                          null
                                                                                        ) {
                                                                                          var gname =
                                                                                            results[0][
                                                                                              "guild"
                                                                                            ];
                                                                                          connection.query(
                                                                                            "SELECT * FROM guild WHERE name = '" +
                                                                                              gname +
                                                                                              "'",
                                                                                            (
                                                                                              error,
                                                                                              results
                                                                                            ) => {
                                                                                              var getgexp = getguildexp;
                                                                                              expmagni =
                                                                                                results[0][
                                                                                                  "exp"
                                                                                                ];
                                                                                              getexp =
                                                                                                nowlv *
                                                                                                  magni *
                                                                                                  (expmagni *
                                                                                                    0.075) +
                                                                                                nowlv *
                                                                                                  magni +
                                                                                                nowexp;
                                                                                              getgexp =
                                                                                                parseInt(
                                                                                                  getgexp *
                                                                                                    expmagni
                                                                                                ) +
                                                                                                parseInt(
                                                                                                  results[0][
                                                                                                    "gexp"
                                                                                                  ]
                                                                                                );
                                                                                              const embed = {
                                                                                                title:
                                                                                                  "ギルドに経験値が入りました！",
                                                                                                description:
                                                                                                  "ギルド名:\n" +
                                                                                                  gname +
                                                                                                  "\n取得経験値:\n" +
                                                                                                  (nowlv *
                                                                                                    magni *
                                                                                                    (expmagni *
                                                                                                      0.075) +
                                                                                                    nowlv *
                                                                                                      magni) +
                                                                                                  "\n現在の" +
                                                                                                  gname +
                                                                                                  "ギルドの経験値:\n" +
                                                                                                  getgexp +
                                                                                                  "\nギルド経験値の取得方法:\n敵の討伐",
                                                                                                color: 1041866
                                                                                              };
                                                                                              client.channels
                                                                                                .get(
                                                                                                  "773036531413680169"
                                                                                                )
                                                                                                .send(
                                                                                                  {
                                                                                                    embed
                                                                                                  }
                                                                                                );
                                                                                              connection.query(
                                                                                                "UPDATE guild SET gexp = '" +
                                                                                                  getgexp +
                                                                                                  "' WHERE name = '" +
                                                                                                  gname +
                                                                                                  "';",
                                                                                                (
                                                                                                  error,
                                                                                                  results
                                                                                                ) => {
                                                                                                  if (
                                                                                                    error
                                                                                                  ) {
                                                                                                    client.channels
                                                                                                      .get(
                                                                                                        "772602458983366657"
                                                                                                      )
                                                                                                      .send(
                                                                                                        "<@661793849001246721>データベースへの接続に失敗しました！\n```" +
                                                                                                          error +
                                                                                                          "```"
                                                                                                      );
                                                                                                    return;
                                                                                                  }
                                                                                                  connection.query(
                                                                                                    "UPDATE user SET " +
                                                                                                      nowjob +
                                                                                                      " = '" +
                                                                                                      getexp +
                                                                                                      "' WHERE id = '" +
                                                                                                      id +
                                                                                                      "';",
                                                                                                    (
                                                                                                      error,
                                                                                                      results
                                                                                                    ) => {
                                                                                                      var embed = {
                                                                                                        title:
                                                                                                          "ユーザーに経験値が入りました！",
                                                                                                        description:
                                                                                                          "ユーザーid:\n" +
                                                                                                          id +
                                                                                                          "\n取得経験値:\n" +
                                                                                                          (nowlv *
                                                                                                            magni *
                                                                                                            (expmagni *
                                                                                                              0.075) +
                                                                                                            nowlv *
                                                                                                              magni) +
                                                                                                          "\n現在の所持経験値:\n" +
                                                                                                          getexp +
                                                                                                          "\n経験値の取得方法:\n敵の討伐",
                                                                                                        color: 1041866
                                                                                                      };
                                                                                                      client.channels
                                                                                                        .get(
                                                                                                          "773036483703472129"
                                                                                                        )
                                                                                                        .send(
                                                                                                          {
                                                                                                            embed
                                                                                                          }
                                                                                                        );
                                                                                                      var embed = {
                                                                                                        description:
                                                                                                          "<@" +
                                                                                                          id +
                                                                                                          ">さんは経験値を獲得しました！\n獲得した経験値:\n" +
                                                                                                          (nowlv *
                                                                                                            magni *
                                                                                                            (expmagni *
                                                                                                              0.075) +
                                                                                                            nowlv *
                                                                                                              magni),
                                                                                                        color: 1041866
                                                                                                      };
                                                                                                      message.channel.send(
                                                                                                        {
                                                                                                          embed
                                                                                                        }
                                                                                                      );
                                                                                                      connection.query(
                                                                                                        "UPDATE channel SET hp = '" +
                                                                                                          nexthp +
                                                                                                          "' WHERE id = '" +
                                                                                                          message
                                                                                                            .channel
                                                                                                            .id +
                                                                                                          "';",
                                                                                                        (
                                                                                                          error,
                                                                                                          results
                                                                                                        ) => {
                                                                                                          connection.query(
                                                                                                            "UPDATE user SET hp = '" +
                                                                                                              nextphp +
                                                                                                              "' WHERE id = '" +
                                                                                                              id +
                                                                                                              "';",
                                                                                                            (
                                                                                                              error,
                                                                                                              results
                                                                                                            ) => {
                                                                                                              connection.query(
                                                                                                                "UPDATE user SET joinchannel = null WHERE id = '" +
                                                                                                                  id +
                                                                                                                  "';",
                                                                                                                (
                                                                                                                  error,
                                                                                                                  results
                                                                                                                ) => {
                                                                                                                  if (
                                                                                                                    error
                                                                                                                  ) {
                                                                                                                    client.channels
                                                                                                                      .get(
                                                                                                                        "772602458983366657"
                                                                                                                      )
                                                                                                                      .send(
                                                                                                                        "<@661793849001246721>データベースへの接続に失敗しました！\n```" +
                                                                                                                          error +
                                                                                                                          "```"
                                                                                                                      );
                                                                                                                    return;
                                                                                                                  }
                                                                                                                  resolve();
                                                                                                                }
                                                                                                              );
                                                                                                            }
                                                                                                          );
                                                                                                        }
                                                                                                      );
                                                                                                    }
                                                                                                  );
                                                                                                }
                                                                                              );
                                                                                            }
                                                                                          );
                                                                                        }
                                                                                      }
                                                                                    );
                                                                                  }
                                                                                );
                                                                              }
                                                                            }
                                                                          );
                                                                          promise.then(
                                                                            () => {
                                                                              var embed = {
                                                                                title:
                                                                                  "レア度[通常] 属性[" +
                                                                                  zokuseitxt +
                                                                                  "]\n" +
                                                                                  nextname +
                                                                                  "が待ち構えている...\nLv:" +
                                                                                  nextlv +
                                                                                  " HP:" +
                                                                                  nexthp,
                                                                                color: 1041866,
                                                                                image: {
                                                                                  url: nexturl
                                                                                }
                                                                              };
                                                                              message.channel.send(
                                                                                {
                                                                                  embed
                                                                                }
                                                                              );
                                                                            }
                                                                          );
                                                                        }
                                                                      );
                                                                    }
                                                                  );
                                                                }
                                                              );
                                                            }
                                                          );
                                                        }
                                                      );
                                                    }
                                                    connection.query(
                                                      "UPDATE channel SET progress = 0 WHERE id = '" +
                                                        message.channel.id +
                                                        "';",
                                                      (error, results) => {}
                                                    );
                                                    0;
                                                  }
                                                );
                                              }
                                            );
                                          }
                                        );
                                      }
                                    );
                                  }
                                );
                              }
                            }
                          );
                        }
                      }
                    );
                  }
                );
              }
              if (
                message.content.startsWith(";;fire") ||
                message.content.startsWith(";;f")
              ) {
                const embed = {
                  title: "コマンドが実行されました！",
                  description:
                    "実行されたコマンド\n```" +
                    message.content +
                    "```\n実行されたサーバー名\n```" +
                    message.guild.name +
                    "```\n実行されたサーバーのid\n```" +
                    message.guild.id +
                    "```\n実行されたチャンネル名\n```" +
                    message.channel.name +
                    "```\n実行されたチャンネルid\n```" +
                    message.channel.id +
                    "```\nメッセージid\n```" +
                    message.id +
                    "```\nメッセージurl\n[message link](https://discord.com/channels/" +
                    message.guild.id +
                    "/" +
                    message.channel.id +
                    "/" +
                    message.id +
                    ")",
                  color: 1041866,
                  author: {
                    name: message.author.username,
                    icon_url: message.author.avatarURL
                  }
                };
                client.channels.get("773035867894972416").send({ embed });
                connection.query(
                  "SELECT joinchannel FROM user WHERE id = '" +
                    message.author.id +
                    "'",
                  (error, results) => {
                    console.log(results);
                    if (results[0] !== null && results[0] !== undefined) {
                      if (
                        results[0].joinchannel != message.channel.id &&
                        results[0].joinchannel !== null
                      ) {
                        message.reply(
                          "> あなたは<#" +
                            results[0].joinchannel +
                            ">ですでに戦闘中です。"
                        );
                        return;
                      }
                    }
                    connection.query(
                      "SELECT count(*) FROM channel WHERE id = '" +
                        message.channel.id +
                        "'",
                      (error, results) => {
                        if (error) {
                          client.channels
                            .get("772602458983366657")
                            .send(
                              "<@661793849001246721>データベースへの接続に失敗しました！\n```" +
                                error +
                                "```"
                            );
                          return;
                        }
                        if (results[0]["count(*)"] == 0) {
                          message.reply(
                            '```diff\n -最初に";;prepare"でチャンネルを登録しましょう！```'
                          );
                        }
                      }
                    );
                    connection.query(
                      "SELECT * FROM channel WHERE id = '" +
                        message.channel.id +
                        "'",
                      async (error, results) => {
                        if (results[0]["progress"]) {
                          var reply = await message.reply(
                            "```diff\n -前の処理が進行中です。\n```"
                          );
                          reply.delete(5000);
                          return false;
                        } else {
                          connection.query(
                            "UPDATE channel SET progress = 1 WHERE id = '" +
                              message.channel.id +
                              "';",
                            (error, results) => {
                              console.log(results);
                            }
                          );
                          connection.query(
                            "SELECT * FROM user WHERE id = '" +
                              message.author.id +
                              "'",
                            (error, results) => {
                              if (error) {
                                client.channels
                                  .get("772602458983366657")
                                  .send(
                                    "<@661793849001246721>データベースへの接続に失敗しました！\n```" +
                                      error +
                                      "```"
                                  );
                                return;
                              }
                              if (results[0]["hp"] == 0) {
                                message.reply(
                                  "```diff\n -あなたはもうやられています...！```"
                                );
                                connection.query(
                                  "UPDATE channel SET progress = 0 WHERE id = '" +
                                    message.channel.id +
                                    "';",
                                  (error, results) => {}
                                );
                                return;
                              } else {
                                connection.query(
                                  "UPDATE user SET joinchannel = '" +
                                    message.channel.id +
                                    "' WHERE id = '" +
                                    message.author.id +
                                    "';",
                                  (error, results) => {
                                    console.log(results);
                                    if (error) {
                                      client.channels
                                        .get("772602458983366657")
                                        .send(
                                          "<@661793849001246721>データベースへの接続に失敗しました！\n```" +
                                            error +
                                            "```"
                                        );
                                      return;
                                    }
                                  }
                                );
                                connection.query(
                                  "SELECT * FROM user WHERE id = '" +
                                    message.author.id +
                                    "'",
                                  (error, results) => {
                                    console.log(results);
                                    if (error) {
                                      client.channels
                                        .get("772602458983366657")
                                        .send(
                                          "<@661793849001246721>データベースへの接続に失敗しました！\n```" +
                                            error +
                                            "```"
                                        );
                                      return;
                                    }
                                    var php = results[0]["hp"];
                                    var atkmagni = 0.5;
                                    switch (results[0]["nowjob"]) {
                                      case 0:
                                      case 3:
                                        break;
                                      case 1:
                                        atkmagni = 0.25;
                                        break;
                                      case 2:
                                        atkmagni = 2.5;
                                        break;
                                    }
                                    var damage =
                                      Math.floor(
                                        Math.sqrt(
                                          results[0][
                                            "job" + results[0]["nowjob"]
                                          ]
                                        )
                                      ) *
                                      atkmagni *
                                      Math.ceil(
                                        results[0][
                                          "job" + results[0]["nowjob"] + "id"
                                        ] / 5
                                      );
                                    var nowjob = "job" + results[0]["nowjob"];
                                    var nowexp =
                                      results[0]["job" + results[0]["nowjob"]];
                                    var playerlv = Math.floor(
                                      Math.sqrt(
                                        results[0]["job" + results[0]["nowjob"]]
                                      )
                                    );
                                    if (results[0]["guild"] !== null) {
                                      var gname = results[0]["guild"];
                                      connection.query(
                                        "SELECT * FROM guild WHERE name = '" +
                                          gname +
                                          "'",
                                        (error, results) => {
                                          damage =
                                            damage +
                                            damage *
                                              (results[0]["attack"] * 0.075);
                                        }
                                      );
                                    }

                                    connection.query(
                                      "SELECT * FROM channel WHERE id = '" +
                                        message.channel.id +
                                        "'",
                                      (error, results) => {
                                        console.log(results);
                                        var clv = results[0]["lv"] / 10;
                                        var enemyhp = results[0]["hp"];
                                        connection.query(
                                          "SELECT * FROM enemy WHERE id = '" +
                                            results[0]["enemyid"] +
                                            "'",
                                          (error, results) => {
                                            var magni = results[0]["magni"];
                                            damage =
                                              damage / results[0]["defend"];
                                            var getdamage =
                                              results[0]["attack"];
                                            getdamage = Math.ceil(
                                              getdamage * clv
                                            );
                                            if (php - getdamage < 1) {
                                              var playerhp = 0;
                                            } else {
                                              var playerhp = php - getdamage;
                                            }
                                            connection.query(
                                              "UPDATE user SET hp = '" +
                                                playerhp +
                                                "' WHERE id = '" +
                                                message.author.id +
                                                "';",
                                              (error, results) => {
                                                console.log(results);
                                                if (enemyhp - damage < 1) {
                                                  var kill = true;
                                                  var enemy = 0;
                                                } else {
                                                  var kill = false;
                                                  var enemy = enemyhp - damage;
                                                }
                                                connection.query(
                                                  "UPDATE channel SET hp = '" +
                                                    enemy +
                                                    "' WHERE id = '" +
                                                    message.channel.id +
                                                    "';",
                                                  (error, results) => {
                                                    if (enemy != 0) {
                                                      message.channel.send(
                                                        "```\n" +
                                                          message.author
                                                            .username +
                                                          "は敵に" +
                                                          damage +
                                                          "ダメージ与えた\n敵の残りHP:" +
                                                          enemy +
                                                          "\n" +
                                                          message.author
                                                            .username +
                                                          "は敵から" +
                                                          getdamage +
                                                          "ダメージ受けた\nあなたの残りHP:" +
                                                          playerhp +
                                                          "```"
                                                      );
                                                    } else {
                                                      message.channel.send(
                                                        "```\n" +
                                                          message.author
                                                            .username +
                                                          "は敵に" +
                                                          damage +
                                                          "ダメージ与えた\n敵の残りHP:" +
                                                          enemy +
                                                          "\n敵を倒した！```"
                                                      );
                                                    }
                                                    if (kill) {
                                                      connection.query(
                                                        "SELECT * FROM enemy ORDER BY RAND() LIMIT 1",
                                                        (error, results) => {
                                                          console.log(results);
                                                          var nexturl =
                                                            results[0]["url"];
                                                          var zokusei =
                                                            results[0][
                                                              "attribute"
                                                            ];
                                                          var nexthp =
                                                            results[0]["hp"];
                                                          var nextname =
                                                            results[0]["name"];
                                                          var nextenemyid =
                                                            results[0]["id"];
                                                          connection.query(
                                                            "SELECT * FROM channel WHERE id = '" +
                                                              message.channel
                                                                .id +
                                                              "'",
                                                            (
                                                              error,
                                                              results
                                                            ) => {
                                                              console.log(
                                                                results
                                                              );
                                                              nexthp =
                                                                nexthp *
                                                                results[0][
                                                                  "lv"
                                                                ];
                                                              var nextlv =
                                                                results[0][
                                                                  "lv"
                                                                ] + 1;
                                                              connection.query(
                                                                "UPDATE channel SET lv = '" +
                                                                  (results[0][
                                                                    "lv"
                                                                  ] +
                                                                    1) +
                                                                  "', enemyid = '" +
                                                                  nextenemyid +
                                                                  "' WHERE id = '" +
                                                                  message
                                                                    .channel
                                                                    .id +
                                                                  "';",
                                                                (
                                                                  error,
                                                                  results
                                                                ) => {
                                                                  console.log(
                                                                    results
                                                                  );
                                                                  connection.query(
                                                                    "SELECT * FROM attribute WHERE id = '" +
                                                                      zokusei +
                                                                      "'",
                                                                    (
                                                                      error,
                                                                      results
                                                                    ) => {
                                                                      var zokuseitxt =
                                                                        results[0][
                                                                          "name"
                                                                        ];
                                                                      connection.query(
                                                                        "SELECT id FROM user WHERE joinchannel = '" +
                                                                          message
                                                                            .channel
                                                                            .id +
                                                                          "'",
                                                                        (
                                                                          error,
                                                                          results
                                                                        ) => {
                                                                          if (
                                                                            error
                                                                          ) {
                                                                            client.channels
                                                                              .get(
                                                                                "772602458983366657"
                                                                              )
                                                                              .send(
                                                                                "<@661793849001246721>データベースへの接続に失敗しました！\n```" +
                                                                                  error +
                                                                                  "```"
                                                                              );
                                                                            return;
                                                                          }
                                                                          console.log(
                                                                            results.map(
                                                                              obj =>
                                                                                obj.id
                                                                            )
                                                                          );

                                                                          promise = new Promise(
                                                                            (
                                                                              resolve,
                                                                              reject
                                                                            ) => {
                                                                              for (const id of results.map(
                                                                                obj =>
                                                                                  obj.id
                                                                              )) {
                                                                                connection.query(
                                                                                  "SELECT * FROM user WHERE id = '" +
                                                                                    id +
                                                                                    "'",
                                                                                  (
                                                                                    error,
                                                                                    results
                                                                                  ) => {
                                                                                    var playerlv = Math.floor(
                                                                                      Math.sqrt(
                                                                                        results[0][
                                                                                          "job" +
                                                                                            results[0][
                                                                                              "nowjob"
                                                                                            ]
                                                                                        ]
                                                                                      )
                                                                                    );
                                                                                    var nowjob =
                                                                                      "job" +
                                                                                      results[0][
                                                                                        "nowjob"
                                                                                      ];
                                                                                    var nowexp =
                                                                                      results[0][
                                                                                        "job" +
                                                                                          results[0][
                                                                                            "nowjob"
                                                                                          ]
                                                                                      ];
                                                                                    var playerlv = Math.floor(
                                                                                      Math.sqrt(
                                                                                        results[0][
                                                                                          "job" +
                                                                                            results[0][
                                                                                              "nowjob"
                                                                                            ]
                                                                                        ]
                                                                                      )
                                                                                    );
                                                                                    var nextphp =
                                                                                      playerlv *
                                                                                      10;
                                                                                    var nowlv =
                                                                                      nextlv -
                                                                                      1;
                                                                                    var getexp =
                                                                                      nowlv *
                                                                                        magni +
                                                                                      nowexp;
                                                                                    var getguildexp =
                                                                                      nowlv *
                                                                                      magni;
                                                                                    connection.query(
                                                                                      "SELECT * FROM user WHERE id = '" +
                                                                                        message
                                                                                          .author
                                                                                          .id +
                                                                                        "'",
                                                                                      (
                                                                                        error,
                                                                                        results
                                                                                      ) => {
                                                                                        if (
                                                                                          results[0][
                                                                                            "guild"
                                                                                          ] !==
                                                                                          null
                                                                                        ) {
                                                                                          var gname =
                                                                                            results[0][
                                                                                              "guild"
                                                                                            ];
                                                                                          connection.query(
                                                                                            "SELECT * FROM guild WHERE name = '" +
                                                                                              gname +
                                                                                              "'",
                                                                                            (
                                                                                              error,
                                                                                              results
                                                                                            ) => {
                                                                                              var getgexp = getguildexp;
                                                                                              expmagni =
                                                                                                results[0][
                                                                                                  "exp"
                                                                                                ];
                                                                                              getexp =
                                                                                                nowlv *
                                                                                                  magni *
                                                                                                  (expmagni *
                                                                                                    0.075) +
                                                                                                nowlv *
                                                                                                  magni +
                                                                                                nowexp;
                                                                                              getgexp =
                                                                                                parseInt(
                                                                                                  getgexp *
                                                                                                    expmagni
                                                                                                ) +
                                                                                                parseInt(
                                                                                                  results[0][
                                                                                                    "gexp"
                                                                                                  ]
                                                                                                );
                                                                                              const embed = {
                                                                                                title:
                                                                                                  "ギルドに経験値が入りました！",
                                                                                                description:
                                                                                                  "ギルド名:\n" +
                                                                                                  gname +
                                                                                                  "\n取得経験値:\n" +
                                                                                                  (nowlv *
                                                                                                    magni *
                                                                                                    (expmagni *
                                                                                                      0.075) +
                                                                                                    nowlv *
                                                                                                      magni) +
                                                                                                  "\n現在の" +
                                                                                                  gname +
                                                                                                  "ギルドの経験値:\n" +
                                                                                                  getgexp +
                                                                                                  "\nギルド経験値の取得方法:\n敵の討伐",
                                                                                                color: 1041866
                                                                                              };
                                                                                              client.channels
                                                                                                .get(
                                                                                                  "773036531413680169"
                                                                                                )
                                                                                                .send(
                                                                                                  {
                                                                                                    embed
                                                                                                  }
                                                                                                );
                                                                                              connection.query(
                                                                                                "UPDATE guild SET gexp = '" +
                                                                                                  getgexp +
                                                                                                  "' WHERE name = '" +
                                                                                                  gname +
                                                                                                  "';",
                                                                                                (
                                                                                                  error,
                                                                                                  results
                                                                                                ) => {
                                                                                                  if (
                                                                                                    error
                                                                                                  ) {
                                                                                                    client.channels
                                                                                                      .get(
                                                                                                        "772602458983366657"
                                                                                                      )
                                                                                                      .send(
                                                                                                        "<@661793849001246721>データベースへの接続に失敗しました！\n```" +
                                                                                                          error +
                                                                                                          "```"
                                                                                                      );
                                                                                                    return;
                                                                                                  }
                                                                                                  connection.query(
                                                                                                    "UPDATE user SET " +
                                                                                                      nowjob +
                                                                                                      " = '" +
                                                                                                      getexp +
                                                                                                      "' WHERE id = '" +
                                                                                                      id +
                                                                                                      "';",
                                                                                                    (
                                                                                                      error,
                                                                                                      results
                                                                                                    ) => {
                                                                                                      var embed = {
                                                                                                        title:
                                                                                                          "ユーザーに経験値が入りました！",
                                                                                                        description:
                                                                                                          "ユーザーid:\n" +
                                                                                                          id +
                                                                                                          "\n取得経験値:\n" +
                                                                                                          (nowlv *
                                                                                                            magni *
                                                                                                            (expmagni *
                                                                                                              0.075) +
                                                                                                            nowlv *
                                                                                                              magni) +
                                                                                                          "\n現在の所持経験値:\n" +
                                                                                                          getexp +
                                                                                                          "\n経験値の取得方法:\n敵の討伐",
                                                                                                        color: 1041866
                                                                                                      };
                                                                                                      client.channels
                                                                                                        .get(
                                                                                                          "773036483703472129"
                                                                                                        )
                                                                                                        .send(
                                                                                                          {
                                                                                                            embed
                                                                                                          }
                                                                                                        );
                                                                                                      var embed = {
                                                                                                        description:
                                                                                                          "<@" +
                                                                                                          id +
                                                                                                          ">さんは経験値を獲得しました！\n獲得した経験値:\n" +
                                                                                                          (nowlv *
                                                                                                            magni *
                                                                                                            (expmagni *
                                                                                                              0.075) +
                                                                                                            nowlv *
                                                                                                              magni),
                                                                                                        color: 1041866
                                                                                                      };
                                                                                                      message.channel.send(
                                                                                                        {
                                                                                                          embed
                                                                                                        }
                                                                                                      );
                                                                                                      connection.query(
                                                                                                        "UPDATE channel SET hp = '" +
                                                                                                          nexthp +
                                                                                                          "' WHERE id = '" +
                                                                                                          message
                                                                                                            .channel
                                                                                                            .id +
                                                                                                          "';",
                                                                                                        (
                                                                                                          error,
                                                                                                          results
                                                                                                        ) => {
                                                                                                          connection.query(
                                                                                                            "UPDATE user SET hp = '" +
                                                                                                              nextphp +
                                                                                                              "' WHERE id = '" +
                                                                                                              id +
                                                                                                              "';",
                                                                                                            (
                                                                                                              error,
                                                                                                              results
                                                                                                            ) => {
                                                                                                              connection.query(
                                                                                                                "UPDATE user SET joinchannel = null WHERE id = '" +
                                                                                                                  id +
                                                                                                                  "';",
                                                                                                                (
                                                                                                                  error,
                                                                                                                  results
                                                                                                                ) => {
                                                                                                                  if (
                                                                                                                    error
                                                                                                                  ) {
                                                                                                                    client.channels
                                                                                                                      .get(
                                                                                                                        "772602458983366657"
                                                                                                                      )
                                                                                                                      .send(
                                                                                                                        "<@661793849001246721>データベースへの接続に失敗しました！\n```" +
                                                                                                                          error +
                                                                                                                          "```"
                                                                                                                      );
                                                                                                                    return;
                                                                                                                  }
                                                                                                                  resolve();
                                                                                                                }
                                                                                                              );
                                                                                                            }
                                                                                                          );
                                                                                                        }
                                                                                                      );
                                                                                                    }
                                                                                                  );
                                                                                                }
                                                                                              );
                                                                                            }
                                                                                          );
                                                                                        }
                                                                                      }
                                                                                    );
                                                                                  }
                                                                                );
                                                                              }
                                                                            }
                                                                          );
                                                                          promise.then(
                                                                            () => {
                                                                              var embed = {
                                                                                title:
                                                                                  "レア度[通常] 属性[" +
                                                                                  zokuseitxt +
                                                                                  "]\n" +
                                                                                  nextname +
                                                                                  "が待ち構えている...\nLv:" +
                                                                                  nextlv +
                                                                                  " HP:" +
                                                                                  nexthp,
                                                                                color: 1041866,
                                                                                image: {
                                                                                  url: nexturl
                                                                                }
                                                                              };
                                                                              message.channel.send(
                                                                                {
                                                                                  embed
                                                                                }
                                                                              );
                                                                            }
                                                                          );
                                                                        }
                                                                      );
                                                                    }
                                                                  );
                                                                }
                                                              );
                                                            }
                                                          );
                                                        }
                                                      );
                                                    }
                                                    connection.query(
                                                      "UPDATE channel SET progress = 0 WHERE id = '" +
                                                        message.channel.id +
                                                        "';",
                                                      (error, results) => {}
                                                    );
                                                  }
                                                );
                                              }
                                            );
                                          }
                                        );
                                      }
                                    );
                                  }
                                );
                              }
                            }
                          );
                        }
                      }
                    );
                  }
                );
              }
              if (
                message.content.startsWith(";;ratk") ||
                message.content.startsWith(";;rattack")
              ) {
                const embed = {
                  title: "コマンドが実行されました！",
                  description:
                    "実行されたコマンド\n```" +
                    message.content +
                    "```\n実行されたサーバー名\n```" +
                    message.guild.name +
                    "```\n実行されたサーバーのid\n```" +
                    message.guild.id +
                    "```\n実行されたチャンネル名\n```" +
                    message.channel.name +
                    "```\n実行されたチャンネルid\n```" +
                    message.channel.id +
                    "```\nメッセージid\n```" +
                    message.id +
                    "```\nメッセージurl\n[message link](https://discord.com/channels/" +
                    message.guild.id +
                    "/" +
                    message.channel.id +
                    "/" +
                    message.id +
                    ")",
                  color: 1041866,
                  author: {
                    name: message.author.username,
                    icon_url: message.author.avatarURL
                  }
                };
                client.channels.get("773035867894972416").send({ embed });
                connection.query(
                  "SELECT joinchannel FROM user WHERE id = '" +
                    message.author.id +
                    "'",
                  (error, results) => {
                    if (results[0] !== null && results[0] !== undefined) {
                      if (
                        results[0].joinchannel != message.channel.id &&
                        results[0].joinchannel !== null
                      ) {
                        message.reply(
                          "> あなたは<#" +
                            results[0].joinchannel +
                            ">ですでに戦闘中です。"
                        );
                        return;
                      }
                    }
                    connection.query(
                      "SELECT count(*) FROM raidchannel WHERE id = '" +
                        message.channel.id +
                        "'",
                      (error, results) => {
                        if (error) {
                          client.channels
                            .get("772602458983366657")
                            .send(
                              "<@661793849001246721>データベースへの接続に失敗しました！\n```" +
                                error +
                                "```"
                            );
                          return;
                        }
                        if (results[0]["count(*)"] == 0) {
                          message.reply(
                            "```diff\n -ここはレイドチャンネルではありません！```"
                          );
                        }
                      }
                    );
                    connection.query(
                      "SELECT * FROM raidchannel WHERE id = '" +
                        message.channel.id +
                        "'",
                      async (error, results) => {
                        if (error) {
                          client.channels
                            .get("772602458983366657")
                            .send(
                              "<@661793849001246721>データベースへの接続に失敗しました！\n```" +
                                error +
                                "```"
                            );
                          return;
                        }
                        if (results[0]["progress"]) {
                          var reply = await message.reply(
                            "```diff\n -前の処理が進行中です。\n```"
                          );
                          reply.delete(5000);
                          return false;
                        } else {
                          connection.query(
                            "UPDATE raidchannel SET progress = 1 WHERE id = '" +
                              message.channel.id +
                              "';",
                            (error, results) => {}
                          );
                          connection.query(
                            "SELECT * FROM user WHERE id = '" +
                              message.author.id +
                              "'",
                            (error, results) => {
                              if (error) {
                                client.channels
                                  .get("772602458983366657")
                                  .send(
                                    "<@661793849001246721>データベースへの接続に失敗しました！\n```" +
                                      error +
                                      "```"
                                  );
                                return;
                              }
                              if (results[0]["hp"] == 0) {
                                message.reply(
                                  "```diff\n -あなたはもうやられています...！```"
                                );
                                connection.query(
                                  "UPDATE raidchannel SET progress = 0 WHERE id = '" +
                                    message.channel.id +
                                    "';",
                                  (error, results) => {}
                                );
                                return;
                              } else {
                                connection.query(
                                  "UPDATE user SET joinchannel = '" +
                                    message.channel.id +
                                    "' WHERE id = '" +
                                    message.author.id +
                                    "';",
                                  (error, results) => {
                                    if (error) {
                                      client.channels
                                        .get("772602458983366657")
                                        .send(
                                          "<@661793849001246721>データベースへの接続に失敗しました！\n```" +
                                            error +
                                            "```"
                                        );
                                      return;
                                    }
                                  }
                                );
                                connection.query(
                                  "SELECT * FROM user WHERE id = '" +
                                    message.author.id +
                                    "'",
                                  (error, results) => {
                                    if (error) {
                                      client.channels
                                        .get("772602458983366657")
                                        .send(
                                          "<@661793849001246721>データベースへの接続に失敗しました！\n```" +
                                            error +
                                            "```"
                                        );
                                      return;
                                    }
                                    var php = results[0]["hp"];
                                    var atkmagni = 1;
                                    switch (results[0]["nowjob"]) {
                                      case 0:
                                      case 3:
                                        break;
                                      case 2:
                                        atkmagni = 0.5;
                                        break;
                                      case 1:
                                        atkmagni = 5;
                                        break;
                                    }
                                    var damage =
                                      Math.floor(
                                        Math.sqrt(
                                          results[0][
                                            "job" + results[0]["nowjob"]
                                          ]
                                        )
                                      ) *
                                      atkmagni *
                                      results[0][
                                        "job" + results[0]["nowjob"] + "id"
                                      ];
                                    var nowjob = "job" + results[0]["nowjob"];
                                    var nowexp =
                                      results[0]["job" + results[0]["nowjob"]];
                                    var playerlv = Math.floor(
                                      Math.sqrt(
                                        results[0]["job" + results[0]["nowjob"]]
                                      )
                                    );
                                    if (results[0]["guild"] !== null) {
                                      var gname = results[0]["guild"];
                                      connection.query(
                                        "SELECT * FROM guild WHERE name = '" +
                                          gname +
                                          "'",
                                        (error, results) => {
                                          damage =
                                            damage +
                                            damage *
                                              (results[0]["attack"] * 0.075);
                                        }
                                      );
                                    }

                                    connection.query(
                                      "SELECT * FROM raidchannel WHERE id = '" +
                                        message.channel.id +
                                        "'",
                                      (error, results) => {
                                        var clv = results[0]["lv"];
                                        var enemyhp = results[0]["hp"];
                                        connection.query(
                                          "SELECT * FROM raidenemy WHERE id = '" +
                                            results[0]["enemyid"] +
                                            "'",
                                          (error, results) => {
                                            var magni = results[0]["magni"];
                                            damage =
                                              damage / results[0]["defend"];
                                            var getdamage =
                                              results[0]["attack"];
                                            getdamage = Math.ceil(
                                              getdamage * clv
                                            );
                                            if (php - getdamage < 1) {
                                              var playerhp = 0;
                                            } else {
                                              var playerhp = php - getdamage;
                                            }
                                            connection.query(
                                              "UPDATE user SET hp = '" +
                                                playerhp +
                                                "' WHERE id = '" +
                                                message.author.id +
                                                "';",
                                              (error, results) => {
                                                if (enemyhp - damage < 1) {
                                                  var kill = true;
                                                  var enemy = 0;
                                                } else {
                                                  var kill = false;
                                                  var enemy = enemyhp - damage;
                                                }
                                                connection.query(
                                                  "UPDATE raidchannel SET hp = '" +
                                                    enemy +
                                                    "' WHERE id = '" +
                                                    message.channel.id +
                                                    "';",
                                                  (error, results) => {
                                                    console.log(results);
                                                    if (enemy != 0) {
                                                      message.channel.send(
                                                        "```\n" +
                                                          message.author
                                                            .username +
                                                          "は敵に" +
                                                          damage +
                                                          "ダメージ与えた\n敵の残りHP:" +
                                                          enemy +
                                                          "\n" +
                                                          message.author
                                                            .username +
                                                          "は敵から" +
                                                          getdamage +
                                                          "ダメージ受けた\nあなたの残りHP:" +
                                                          playerhp +
                                                          "```"
                                                      );
                                                    } else {
                                                      message.channel.send(
                                                        "```\n" +
                                                          message.author
                                                            .username +
                                                          "は敵に" +
                                                          damage +
                                                          "ダメージ与えた\n敵の残りHP:" +
                                                          enemy +
                                                          "\n敵を倒した！```"
                                                      );
                                                    }
                                                    if (kill) {
                                                      connection.query(
                                                        "SELECT * FROM raidenemy ORDER BY RAND() LIMIT 1",
                                                        (error, results) => {
                                                          var nexturl =
                                                            results[0]["url"];
                                                          var zokusei =
                                                            results[0][
                                                              "attribute"
                                                            ];
                                                          var nexthp =
                                                            results[0]["hp"];
                                                          var nextname =
                                                            results[0]["name"];
                                                          var nextenemyid =
                                                            results[0]["id"];
                                                          connection.query(
                                                            "SELECT * FROM raidchannel WHERE id = '" +
                                                              message.channel
                                                                .id +
                                                              "'",
                                                            (
                                                              error,
                                                              results
                                                            ) => {
                                                              nexthp =
                                                                nexthp *
                                                                results[0][
                                                                  "lv"
                                                                ];
                                                              var nextlv =
                                                                results[0][
                                                                  "lv"
                                                                ] + 1;
                                                              connection.query(
                                                                "UPDATE raidchannel SET lv = '" +
                                                                  (results[0][
                                                                    "lv"
                                                                  ] +
                                                                    1) +
                                                                  "', enemyid = '" +
                                                                  nextenemyid +
                                                                  "' WHERE id = '" +
                                                                  message
                                                                    .channel
                                                                    .id +
                                                                  "';",
                                                                (
                                                                  error,
                                                                  results
                                                                ) => {
                                                                  connection.query(
                                                                    "SELECT * FROM attribute WHERE id = '" +
                                                                      zokusei +
                                                                      "'",
                                                                    (
                                                                      error,
                                                                      results
                                                                    ) => {
                                                                      var zokuseitxt =
                                                                        results[0][
                                                                          "name"
                                                                        ];
                                                                      connection.query(
                                                                        "SELECT id FROM user WHERE joinchannel = '" +
                                                                          message
                                                                            .channel
                                                                            .id +
                                                                          "'",
                                                                        (
                                                                          error,
                                                                          results
                                                                        ) => {
                                                                          if (
                                                                            error
                                                                          ) {
                                                                            client.channels
                                                                              .get(
                                                                                "772602458983366657"
                                                                              )
                                                                              .send(
                                                                                "<@661793849001246721>データベースへの接続に失敗しました！\n```" +
                                                                                  error +
                                                                                  "```"
                                                                              );
                                                                            return;
                                                                          }
                                                                          promise = new Promise(
                                                                            (
                                                                              resolve,
                                                                              reject
                                                                            ) => {
                                                                              for (const id of results.map(
                                                                                obj =>
                                                                                  obj.id
                                                                              )) {
                                                                                connection.query(
                                                                                  "SELECT * FROM user WHERE id = '" +
                                                                                    id +
                                                                                    "'",
                                                                                  (
                                                                                    error,
                                                                                    results
                                                                                  ) => {
                                                                                    var playerlv = Math.floor(
                                                                                      Math.sqrt(
                                                                                        results[0][
                                                                                          "job" +
                                                                                            results[0][
                                                                                              "nowjob"
                                                                                            ]
                                                                                        ]
                                                                                      )
                                                                                    );
                                                                                    var nowjob =
                                                                                      "job" +
                                                                                      results[0][
                                                                                        "nowjob"
                                                                                      ];
                                                                                    var nowexp =
                                                                                      results[0][
                                                                                        "job" +
                                                                                          results[0][
                                                                                            "nowjob"
                                                                                          ]
                                                                                      ];
                                                                                    var playerlv = Math.floor(
                                                                                      Math.sqrt(
                                                                                        results[0][
                                                                                          "job" +
                                                                                            results[0][
                                                                                              "nowjob"
                                                                                            ]
                                                                                        ]
                                                                                      )
                                                                                    );
                                                                                    var nextphp =
                                                                                      playerlv *
                                                                                      10;
                                                                                    var nowlv =
                                                                                      nextlv -
                                                                                      1;
                                                                                    var getexp =
                                                                                      nowlv *
                                                                                        magni +
                                                                                      nowexp;
                                                                                    var getguildexp =
                                                                                      nowlv *
                                                                                      magni;
                                                                                    connection.query(
                                                                                      "SELECT * FROM user WHERE id = '" +
                                                                                        message
                                                                                          .author
                                                                                          .id +
                                                                                        "'",
                                                                                      (
                                                                                        error,
                                                                                        results
                                                                                      ) => {
                                                                                        if (
                                                                                          results[0][
                                                                                            "guild"
                                                                                          ] !==
                                                                                          null
                                                                                        ) {
                                                                                          var gname =
                                                                                            results[0][
                                                                                              "guild"
                                                                                            ];
                                                                                          connection.query(
                                                                                            "SELECT * FROM guild WHERE name = '" +
                                                                                              gname +
                                                                                              "'",
                                                                                            (
                                                                                              error,
                                                                                              results
                                                                                            ) => {
                                                                                              var getgexp = getguildexp;
                                                                                              expmagni =
                                                                                                results[0][
                                                                                                  "exp"
                                                                                                ];
                                                                                              getexp =
                                                                                                nowlv *
                                                                                                  magni *
                                                                                                  (expmagni *
                                                                                                    0.075) +
                                                                                                nowlv *
                                                                                                  magni +
                                                                                                nowexp;
                                                                                              getgexp =
                                                                                                parseInt(
                                                                                                  getgexp *
                                                                                                    expmagni
                                                                                                ) +
                                                                                                parseInt(
                                                                                                  results[0][
                                                                                                    "gexp"
                                                                                                  ]
                                                                                                );
                                                                                              const embed = {
                                                                                                title:
                                                                                                  "ギルドに経験値が入りました！",
                                                                                                description:
                                                                                                  "ギルド名:\n" +
                                                                                                  gname +
                                                                                                  "\n取得経験値:\n" +
                                                                                                  (nowlv *
                                                                                                    magni *
                                                                                                    (expmagni *
                                                                                                      0.075) +
                                                                                                    nowlv *
                                                                                                      magni) +
                                                                                                  "\n現在の" +
                                                                                                  gname +
                                                                                                  "ギルドの経験値:\n" +
                                                                                                  getgexp +
                                                                                                  "\nギルド経験値の取得方法:\n敵の討伐",
                                                                                                color: 1041866
                                                                                              };
                                                                                              client.channels
                                                                                                .get(
                                                                                                  "773036531413680169"
                                                                                                )
                                                                                                .send(
                                                                                                  {
                                                                                                    embed
      
                                                                                                  }
                                                                                                );

                                                                                              connection.query(
                                                                                                "UPDATE guild SET gexp = '" +
                                                                                                  getgexp +
                                                                                                  "' WHERE name = '" +
                                                                                                  gname +
                                                                                                  "';",
                                                                                                (
                                                                                                  error,
                                                                                                  results
                                                                                                ) => {
                                                                                                  connection.query(
                                                                                                    "UPDATE user SET " +
                                                                                                      nowjob +
                                                                                                      " = '" +
                                                                                                      getexp +
                                                                                                      "' WHERE id = '" +
                                                                                                      id +
                                                                                                      "';",
                                                                                                    (
                                                                                                      error,
                                                                                                      results
                                                                                                    ) => {
                                                                                                      var embed = {
                                                                                                        title:
                                                                                                          "ユーザーに経験値が入りました！",
                                                                                                        description:
                                                                                                          "ユーザーid:\n" +
                                                                                                          id +
                                                                                                          "\n取得経験値:\n" +
                                                                                                          (nowlv *
                                                                                                            magni *
                                                                                                            (expmagni *
                                                                                                              0.075) +
                                                                                                            nowlv *
                                                                                                              magni) +
                                                                                                          "\n現在の所持経験値:\n" +
                                                                                                          getexp +
                                                                                                          "\n経験値の取得方法:\n敵の討伐",
                                                                                                        color: 1041866
                                                                                                      };
                                                                                                      client.channels
                                                                                                        .get(
                                                                                                          "773036483703472129"
                                                                                                        )
                                                                                                        .send(
                                                                                                          {
                                                                                                            embed
                                                                                                          }
                                                                                                        );
                                                                                                      var embed = {
                                                                                                        description:
                                                                                                          "<@" +
                                                                                                          id +
                                                                                                          ">さんは経験値を獲得しました！\n獲得した経験値:\n" +
                                                                                                          (nowlv *
                                                                                                            magni *
                                                                                                            (expmagni *
                                                                                                              0.075) +
                                                                                                            nowlv *
                                                                                                              magni),
                                                                                                        color: 1041866
                                                                                                      };
                                                                                                      message.channel.send(
                                                                                                        {
                                                                                                          embed
                                                                                                        }
                                                                                                      );
                                                                                                      connection.query(
                                                                                                        "UPDATE raidchannel SET hp = '" +
                                                                                                          nexthp +
                                                                                                          "' WHERE id = '" +
                                                                                                          message
                                                                                                            .channel
                                                                                                            .id +
                                                                                                          "';",
                                                                                                        (
                                                                                                          error,
                                                                                                          results
                                                                                                        ) => {
                                                                                                          connection.query(
                                                                                                            "UPDATE user SET hp = '" +
                                                                                                              nextphp +
                                                                                                              "' WHERE id = '" +
                                                                                                              id +
                                                                                                              "';",
                                                                                                            (
                                                                                                              error,
                                                                                                              results
                                                                                                            ) => {
                                                                                                              connection.query(
                                                                                                                "UPDATE user SET joinchannel = null WHERE id = '" +
                                                                                                                  id +
                                                                                                                  "';",
                                                                                                                (
                                                                                                                  error,
                                                                                                                  results
                                                                                                                ) => {
                                                                                                                  if (
                                                                                                                    error
                                                                                                                  ) {
                                                                                                                    client.channels
                                                                                                                      .get(
                                                                                                                        "772602458983366657"
                                                                                                                      )
                                                                                                                      .send(
                                                                                                                        "<@661793849001246721>データベースへの接続に失敗しました！\n```" +
                                                                                                                          error +
                                                                                                                          "```"
                                                                                                                      );
                                                                                                                    return;
                                                                                                                  }
                                                                                                                  resolve();
                                                                                                                }
                                                                                                              );
                                                                                                            }
                                                                                                          );
                                                                                                        }
                                                                                                      );
                                                                                                    }
                                                                                                  );
                                                                                                }
                                                                                              );
                                                                                            }
                                                                                          );
                                                                                        }
                                                                                        promise.then(
                                                                                          () => {
                                                                                            var embed = {
                                                                                              title:
                                                                                                "レア度[通常] 属性[" +
                                                                                                zokuseitxt +
                                                                                                "]\n" +
                                                                                                nextname +
                                                                                                "が待ち構えている...\nLv:" +
                                                                                                nextlv +
                                                                                                " HP:" +
                                                                                                nexthp,
                                                                                              color: 1041866,
                                                                                              image: {
                                                                                                url: nexturl
                                                                                              }
                                                                                            };
                                                                                            message.channel.send(
                                                                                              {
                                                                                                embed
                                                                                              }
                                                                                            );
                                                                                          }
                                                                                        );
                                                                                      }
                                                                                    );
                                                                                  }
                                                                                );
                                                                              }
                                                                            }
                                                                          );
                                                                        }
                                                                      );
                                                                    }
                                                                  );
                                                                }
                                                              );
                                                            }
                                                          );
                                                        }
                                                      );
                                                    }
                                                    connection.query(
                                                      "UPDATE raidchannel SET progress = 0 WHERE id = '" +
                                                        message.channel.id +
                                                        "';",
                                                      (error, results) => {}
                                                    );
                                                    0;
                                                  }
                                                );
                                              }
                                            );
                                          }
                                        );
                                      }
                                    );
                                  }
                                );
                              }
                            }
                          );
                        }
                      }
                    );
                  }
                );
              }
              if (
                message.content.startsWith(";;rfire") ||
                message.content.startsWith(";;rf")
              ) {
                const embed = {
                  title: "コマンドが実行されました！",
                  description:
                    "実行されたコマンド\n```" +
                    message.content +
                    "```\n実行されたサーバー名\n```" +
                    message.guild.name +
                    "```\n実行されたサーバーのid\n```" +
                    message.guild.id +
                    "```\n実行されたチャンネル名\n```" +
                    message.channel.name +
                    "```\n実行されたチャンネルid\n```" +
                    message.channel.id +
                    "```\nメッセージid\n```" +
                    message.id +
                    "```\nメッセージurl\n[message link](https://discord.com/channels/" +
                    message.guild.id +
                    "/" +
                    message.channel.id +
                    "/" +
                    message.id +
                    ")",
                  color: 1041866,
                  author: {
                    name: message.author.username,
                    icon_url: message.author.avatarURL
                  }
                };
                client.channels.get("773035867894972416").send({ embed });
                connection.query(
                  "SELECT joinchannel FROM user WHERE id = '" +
                    message.author.id +
                    "'",
                  (error, results) => {
                    console.log(results);
                    if (results[0] !== null && results[0] !== undefined) {
                      if (
                        results[0].joinchannel != message.channel.id &&
                        results[0].joinchannel !== null
                      ) {
                        message.reply(
                          "> あなたは<#" +
                            results[0].joinchannel +
                            ">ですでに戦闘中です。"
                        );
                        return;
                      }
                    }
                    connection.query(
                      "SELECT count(*) FROM raidchannel WHERE id = '" +
                        message.channel.id +
                        "'",
                      (error, results) => {
                        if (error) {
                          client.channels
                            .get("772602458983366657")
                            .send(
                              "<@661793849001246721>データベースへの接続に失敗しました！\n```" +
                                error +
                                "```"
                            );
                          return;
                        }
                        if (results[0]["count(*)"] == 0) {
                          message.reply(
                            "```diff\n ここはレイドチャンネルではありません！```"
                          );
                        }
                      }
                    );
                    connection.query(
                      "SELECT * FROM raidchannel WHERE id = '" +
                        message.channel.id +
                        "'",
                      async (error, results) => {
                        if (results[0]["progress"]) {
                          var reply = await message.reply(
                            "```diff\n -前の処理が進行中です。\n```"
                          );
                          reply.delete(5000);
                          return false;
                        } else {
                          connection.query(
                            "UPDATE raidchannel SET progress = 1 WHERE id = '" +
                              message.channel.id +
                              "';",
                            (error, results) => {
                              console.log(results);
                            }
                          );
                          connection.query(
                            "SELECT * FROM user WHERE id = '" +
                              message.author.id +
                              "'",
                            (error, results) => {
                              if (error) {
                                client.channels
                                  .get("772602458983366657")
                                  .send(
                                    "<@661793849001246721>データベースへの接続に失敗しました！\n```" +
                                      error +
                                      "```"
                                  );
                                return;
                              }
                              if (results[0]["hp"] == 0) {
                                message.reply(
                                  "```diff\n -あなたはもうやられています...！```"
                                );
                                connection.query(
                                  "UPDATE channel SET progress = 0 WHERE id = '" +
                                    message.channel.id +
                                    "';",
                                  (error, results) => {}
                                );
                                return;
                              } else {
                                connection.query(
                                  "UPDATE user SET joinchannel = '" +
                                    message.channel.id +
                                    "' WHERE id = '" +
                                    message.author.id +
                                    "';",
                                  (error, results) => {
                                    console.log(results);
                                    if (error) {
                                      client.channels
                                        .get("772602458983366657")
                                        .send(
                                          "<@661793849001246721>データベースへの接続に失敗しました！\n```" +
                                            error +
                                            "```"
                                        );
                                      return;
                                    }
                                  }
                                );
                                connection.query(
                                  "SELECT * FROM user WHERE id = '" +
                                    message.author.id +
                                    "'",
                                  (error, results) => {
                                    console.log(results);
                                    if (error) {
                                      client.channels
                                        .get("772602458983366657")
                                        .send(
                                          "<@661793849001246721>データベースへの接続に失敗しました！\n```" +
                                            error +
                                            "```"
                                        );
                                      return;
                                    }
                                    var php = results[0]["hp"];
                                    var atkmagni = 0.5;
                                    switch (results[0]["nowjob"]) {
                                      case 0:
                                      case 3:
                                        break;
                                      case 1:
                                        atkmagni = 0.25;
                                        break;
                                      case 2:
                                        atkmagni = 2.5;
                                        break;
                                    }
                                    var damage =
                                      Math.floor(
                                        Math.sqrt(
                                          results[0][
                                            "job" + results[0]["nowjob"]
                                          ]
                                        )
                                      ) *
                                      atkmagni *
                                      Math.ceil(
                                        results[0][
                                          "job" + results[0]["nowjob"] + "id"
                                        ] / 5
                                      );
                                    var nowjob = "job" + results[0]["nowjob"];
                                    var nowexp =
                                      results[0]["job" + results[0]["nowjob"]];
                                    var playerlv = Math.floor(
                                      Math.sqrt(
                                        results[0]["job" + results[0]["nowjob"]]
                                      )
                                    );
                                    if (results[0]["guild"] !== null) {
                                      var gname = results[0]["guild"];
                                      connection.query(
                                        "SELECT * FROM guild WHERE name = '" +
                                          gname +
                                          "'",
                                        (error, results) => {
                                          damage =
                                            damage +
                                            damage *
                                              (results[0]["attack"] * 0.075);
                                        }
                                      );
                                    }

                                    connection.query(
                                      "SELECT * FROM raidchannel WHERE id = '" +
                                        message.channel.id +
                                        "'",
                                      (error, results) => {
                                        console.log(results);
                                        var clv = results[0]["lv"] / 10;
                                        var enemyhp = results[0]["hp"];
                                        connection.query(
                                          "SELECT * FROM raidenemy WHERE id = '" +
                                            results[0]["enemyid"] +
                                            "'",
                                          (error, results) => {
                                            var magni = results[0]["magni"];
                                            damage =
                                              damage / results[0]["defend"];
                                            var getdamage =
                                              results[0]["attack"];
                                            getdamage = Math.ceil(
                                              getdamage * clv
                                            );
                                            if (php - getdamage < 1) {
                                              var playerhp = 0;
                                            } else {
                                              var playerhp = php - getdamage;
                                            }
                                            connection.query(
                                              "UPDATE user SET hp = '" +
                                                playerhp +
                                                "' WHERE id = '" +
                                                message.author.id +
                                                "';",
                                              (error, results) => {
                                                console.log(results);
                                                if (enemyhp - damage < 1) {
                                                  var kill = true;
                                                  var enemy = 0;
                                                } else {
                                                  var kill = false;
                                                  var enemy = enemyhp - damage;
                                                }
                                                connection.query(
                                                  "UPDATE raidchannel SET hp = '" +
                                                    enemy +
                                                    "' WHERE id = '" +
                                                    message.channel.id +
                                                    "';",
                                                  (error, results) => {
                                                    if (enemy != 0) {
                                                      message.channel.send(
                                                        "```\n" +
                                                          message.author
                                                            .username +
                                                          "は敵に" +
                                                          damage +
                                                          "ダメージ与えた\n敵の残りHP:" +
                                                          enemy +
                                                          "\n" +
                                                          message.author
                                                            .username +
                                                          "は敵から" +
                                                          getdamage +
                                                          "ダメージ受けた\nあなたの残りHP:" +
                                                          playerhp +
                                                          "```"
                                                      );
                                                    } else {
                                                      message.channel.send(
                                                        "```\n" +
                                                          message.author
                                                            .username +
                                                          "は敵に" +
                                                          damage +
                                                          "ダメージ与えた\n敵の残りHP:" +
                                                          enemy +
                                                          "\n敵を倒した！```"
                                                      );
                                                    }
                                                    if (kill) {
                                                      connection.query(
                                                        "SELECT * FROM raidenemy ORDER BY RAND() LIMIT 1",
                                                        (error, results) => {
                                                          console.log(results);
                                                          var nexturl =
                                                            results[0]["url"];
                                                          var zokusei =
                                                            results[0][
                                                              "attribute"
                                                            ];
                                                          var nexthp =
                                                            results[0]["hp"];
                                                          var nextname =
                                                            results[0]["name"];
                                                          var nextenemyid =
                                                            results[0]["id"];
                                                          connection.query(
                                                            "SELECT * FROM raidchannel WHERE id = '" +
                                                              message.channel
                                                                .id +
                                                              "'",
                                                            (
                                                              error,
                                                              results
                                                            ) => {
                                                              console.log(
                                                                results
                                                              );
                                                              nexthp =
                                                                nexthp *
                                                                results[0][
                                                                  "lv"
                                                                ];
                                                              var nextlv =
                                                                results[0][
                                                                  "lv"
                                                                ] + 1;
                                                              connection.query(
                                                                "UPDATE raidchannel SET lv = '" +
                                                                  (results[0][
                                                                    "lv"
                                                                  ] +
                                                                    1) +
                                                                  "', enemyid = '" +
                                                                  nextenemyid +
                                                                  "' WHERE id = '" +
                                                                  message
                                                                    .channel
                                                                    .id +
                                                                  "';",
                                                                (
                                                                  error,
                                                                  results
                                                                ) => {
                                                                  console.log(
                                                                    results
                                                                  );
                                                                  connection.query(
                                                                    "SELECT * FROM attribute WHERE id = '" +
                                                                      zokusei +
                                                                      "'",
                                                                    (
                                                                      error,
                                                                      results
                                                                    ) => {
                                                                      var zokuseitxt =
                                                                        results[0][
                                                                          "name"
                                                                        ];
                                                                      connection.query(
                                                                        "SELECT id FROM user WHERE joinchannel = '" +
                                                                          message
                                                                            .channel
                                                                            .id +
                                                                          "'",
                                                                        (
                                                                          error,
                                                                          results
                                                                        ) => {
                                                                          if (
                                                                            error
                                                                          ) {
                                                                            client.channels
                                                                              .get(
                                                                                "772602458983366657"
                                                                              )
                                                                              .send(
                                                                                "<@661793849001246721>データベースへの接続に失敗しました！\n```" +
                                                                                  error +
                                                                                  "```"
                                                                              );
                                                                            return;
                                                                          }
                                                                          console.log(
                                                                            results.map(
                                                                              obj =>
                                                                                obj.id
                                                                            )
                                                                          );
                                                                          promise = new Promise(
                                                                            (
                                                                              resolve,
                                                                              reject
                                                                            ) => {
                                                                              for (const id of results.map(
                                                                                obj =>
                                                                                  obj.id
                                                                              )) {
                                                                                connection.query(
                                                                                  "SELECT * FROM user WHERE id = '" +
                                                                                    id +
                                                                                    "'",
                                                                                  (
                                                                                    error,
                                                                                    results
                                                                                  ) => {
                                                                                    var playerlv = Math.floor(
                                                                                      Math.sqrt(
                                                                                        results[0][
                                                                                          "job" +
                                                                                            results[0][
                                                                                              "nowjob"
                                                                                            ]
                                                                                        ]
                                                                                      )
                                                                                    );
                                                                                    var nowjob =
                                                                                      "job" +
                                                                                      results[0][
                                                                                        "nowjob"
                                                                                      ];
                                                                                    var nowexp =
                                                                                      results[0][
                                                                                        "job" +
                                                                                          results[0][
                                                                                            "nowjob"
                                                                                          ]
                                                                                      ];
                                                                                    var playerlv = Math.floor(
                                                                                      Math.sqrt(
                                                                                        results[0][
                                                                                          "job" +
                                                                                            results[0][
                                                                                              "nowjob"
                                                                                            ]
                                                                                        ]
                                                                                      )
                                                                                    );
                                                                                    var nextphp =
                                                                                      playerlv *
                                                                                      10;
                                                                                    var nowlv =
                                                                                      nextlv -
                                                                                      1;
                                                                                    var getexp =
                                                                                      nowlv *
                                                                                        magni +
                                                                                      nowexp;
                                                                                    var getguildexp =
                                                                                      nowlv *
                                                                                      magni;
                                                                                    connection.query(
                                                                                      "SELECT * FROM user WHERE id = '" +
                                                                                        message
                                                                                          .author
                                                                                          .id +
                                                                                        "'",
                                                                                      (
                                                                                        error,
                                                                                        results
                                                                                      ) => {
                                                                                        if (
                                                                                          results[0][
                                                                                            "guild"
                                                                                          ] !==
                                                                                          null
                                                                                        ) {
                                                                                          var gname =
                                                                                            results[0][
                                                                                              "guild"
                                                                                            ];
                                                                                          connection.query(
                                                                                            "SELECT * FROM guild WHERE name = '" +
                                                                                              gname +
                                                                                              "'",
                                                                                            (
                                                                                              error,
                                                                                              results
                                                                                            ) => {
                                                                                              var getgexp = getguildexp;
                                                                                              expmagni =
                                                                                                results[0][
                                                                                                  "exp"
                                                                                                ];
                                                                                              getexp =
                                                                                                nowlv *
                                                                                                  magni *
                                                                                                  (expmagni *
                                                                                                    0.075) +
                                                                                                nowlv *
                                                                                                  magni +
                                                                                                nowexp;
                                                                                              getgexp =
                                                                                                parseInt(
                                                                                                  getgexp *
                                                                                                    expmagni
                                                                                                ) +
                                                                                                parseInt(
                                                                                                  results[0][
                                                                                                    "gexp"
                                                                                                  ]
                                                                                                );
                                                                                              const embed = {
                                                                                                title:
                                                                                                  "ギルドに経験値が入りました！",
                                                                                                description:
                                                                                                  "ギルド名:\n" +
                                                                                                  gname +
                                                                                                  "\n取得経験値:\n" +
                                                                                                  (nowlv *
                                                                                                    magni *
                                                                                                    (expmagni *
                                                                                                      0.075) +
                                                                                                    nowlv *
                                                                                                      magni) +
                                                                                                  "\n現在の" +
                                                                                                  gname +
                                                                                                  "ギルドの経験値:\n" +
                                                                                                  getgexp +
                                                                                                  "\nギルド経験値の取得方法:\n敵の討伐",
                                                                                                color: 1041866
                                                                                              };
                                                                                              client.channels
                                                                                                .get(
                                                                                                  "773036531413680169"
                                                                                                )
                                                                                                .send(
                                                                                                  {
                                                                                                    embed
                                                                                                  }
                                                                                                );
                                                                                              connection.query(
                                                                                                "UPDATE guild SET gexp = '" +
                                                                                                  getgexp +
                                                                                                  "' WHERE name = '" +
                                                                                                  gname +
                                                                                                  "';",
                                                                                                (
                                                                                                  error,
                                                                                                  results
                                                                                                ) => {
                                                                                                  connection.query(
                                                                                                    "UPDATE user SET " +
                                                                                                      nowjob +
                                                                                                      " = '" +
                                                                                                      getexp +
                                                                                                      "' WHERE id = '" +
                                                                                                      id +
                                                                                                      "';",
                                                                                                    (
                                                                                                      error,
                                                                                                      results
                                                                                                    ) => {
                                                                                                      var embed = {
                                                                                                        title:
                                                                                                          "ユーザーに経験値が入りました！",
                                                                                                        description:
                                                                                                          "ユーザーid:\n" +
                                                                                                          id +
                                                                                                          "\n取得経験値:\n" +
                                                                                                          (nowlv *
                                                                                                            magni *
                                                                                                            (expmagni *
                                                                                                              0.075) +
                                                                                                            nowlv *
                                                                                                              magni) +
                                                                                                          "\n現在の所持経験値:\n" +
                                                                                                          getexp +
                                                                                                          "\n経験値の取得方法:\n敵の討伐",
                                                                                                        color: 1041866
                                                                                                      };
                                                                                                      client.channels
                                                                                                        .get(
                                                                                                          "773036483703472129"
                                                                                                        )
                                                                                                        .send(
                                                                                                          {
                                                                                                            embed
                                                                                                          }
                                                                                                        );
                                                                                                      var embed = {
                                                                                                        description:
                                                                                                          "<@" +
                                                                                                          id +
                                                                                                          ">さんは経験値を獲得しました！\n獲得した経験値:\n" +
                                                                                                          (nowlv *
                                                                                                            magni *
                                                                                                            (expmagni *
                                                                                                              0.075) +
                                                                                                            nowlv *
                                                                                                              magni),
                                                                                                        color: 1041866
                                                                                                      };
                                                                                                      message.channel.send(
                                                                                                        {
                                                                                                          embed
                                                                                                        }
                                                                                                      );
                                                                                                      connection.query(
                                                                                                        "UPDATE raidchannel SET hp = '" +
                                                                                                          nexthp +
                                                                                                          "' WHERE id = '" +
                                                                                                          message
                                                                                                            .channel
                                                                                                            .id +
                                                                                                          "';",
                                                                                                        (
                                                                                                          error,
                                                                                                          results
                                                                                                        ) => {
                                                                                                          connection.query(
                                                                                                            "UPDATE user SET hp = '" +
                                                                                                              nextphp +
                                                                                                              "' WHERE id = '" +
                                                                                                              id +
                                                                                                              "';",
                                                                                                            (
                                                                                                              error,
                                                                                                              results
                                                                                                            ) => {
                                                                                                              connection.query(
                                                                                                                "UPDATE user SET joinchannel = null WHERE id = '" +
                                                                                                                  id +
                                                                                                                  "';",
                                                                                                                (
                                                                                                                  error,
                                                                                                                  results
                                                                                                                ) => {
                                                                                                                  if (
                                                                                                                    error
                                                                                                                  ) {
                                                                                                                    client.channels
                                                                                                                      .get(
                                                                                                                        "772602458983366657"
                                                                                                                      )
                                                                                                                      .send(
                                                                                                                        "<@661793849001246721>データベースへの接続に失敗しました！\n```" +
                                                                                                                          error +
                                                                                                                          "```"
                                                                                                                      );
                                                                                                                    return;
                                                                                                                  }
                                                                                                                  resolve();
                                                                                                                }
                                                                                                              );
                                                                                                            }
                                                                                                          );
                                                                                                        }
                                                                                                      );
                                                                                                    }
                                                                                                  );
                                                                                                }
                                                                                              );
                                                                                            }
                                                                                          );
                                                                                        }
                                                                                        promise.then(
                                                                                          () => {
                                                                                            var embed = {
                                                                                              title:
                                                                                                "レア度[通常] 属性[" +
                                                                                                zokuseitxt +
                                                                                                "]\n" +
                                                                                                nextname +
                                                                                                "が待ち構えている...\nLv:" +
                                                                                                nextlv +
                                                                                                " HP:" +
                                                                                                nexthp,
                                                                                              color: 1041866,
                                                                                              image: {
                                                                                                url: nexturl
                                                                                              }
                                                                                            };
                                                                                            message.channel.send(
                                                                                              {
                                                                                                embed
                                                                                              }
                                                                                            );
                                                                                          }
                                                                                        );
                                                                                      }
                                                                                    );
                                                                                  }
                                                                                );
                                                                              }
                                                                            }
                                                                          );
                                                                        }
                                                                      );
                                                                    }
                                                                  );
                                                                }
                                                              );
                                                            }
                                                          );
                                                        }
                                                      );
                                                    }
                                                    connection.query(
                                                      "UPDATE raidchannel SET progress = 0 WHERE id = '" +
                                                        message.channel.id +
                                                        "';",
                                                      (error, results) => {}
                                                    );
                                                  }
                                                );
                                              }
                                            );
                                          }
                                        );
                                      }
                                    );
                                  }
                                );
                              }
                            }
                          );
                        }
                      }
                    );
                  }
                );
              }
            } catch (e) {
              client.channels
                .get("772602458983366657")
                .send(
                  "<@661793849001246721>データベースへの接続に失敗しました！\n```" +
                    e +
                    "```"
                );
            }
          }
        }
      );
    }
  });
});
client.on("guildCreate", guild => {
  console.log(guild);
  const embed = {
    title: "OneWorldOnlineがサーバーに導入されました！",
    description:
      "サーバー名:\n" +
      guild.name +
      "\nサーバーid:\n" +
      guild.id +
      "\nサーバー所在地:\n" +
      guild.region,
    color: 1041866
  };
  client.channels.get("773381954631892992").send({ embed });
});
if (process.env.DISCORD_BOT_TOKEN == undefined) {
  console.log("please set ENV: DISCORD_BOT_TOKEN");
  process.exit(0);
}

client.login(process.env.DISCORD_BOT_TOKEN);

