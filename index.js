// Require the necessary discord.js classes
const {
  Client,
  Events,
  GatewayIntentBits,
  Integration,
  ApplicationCommand,
} = require("discord.js");
const Tools = require("./RoutesFinder/Tools.js");

const app = require("express")();

function attachFSLogger(filePath) {
  // remember the old log method
  const oldLog = console.log; // remove this line if you only want to log into the file

  // override console.log
  console.log = (...messages) => {
    // log the console message immediately as usual
    oldLog.apply(console, messages); // remove this line if you only want to log into the file

    // asynchronously append to the file log
    fs.appendFile(filePath, messages.join("\n") + "\n", (err) => {
      if (err) throw err;
    });
  };
}

attachFSLogger("./logs.txt");

const fs = require("fs");

app.get("/", (req, res) => {
  const data = fs.readFileSync("./logs.txt");
  res.send(data.toString());
});

const port = process.env.port || 8080;

app.listen(port, () => console.log(`logs at port http://localhost:${port}`));

// const dotenv = require("dotenv");
// dotenv.config();

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

function formatMsg(msg, i) {
  const a = `
    **TOP ${i + 1}**
    **${msg.from} ✈️ ${msg.to}
    -> ${msg.flpd} Flights/${msg.reputation}% Rep/$${msg.fuel} Fuel/$${
    msg.co2
  } CO2**

    Distance: ${msg.distance}
    Aircraft: ${msg.aircraft}, ${msg.speed}
    Mode: ${msg.mode}
  
    __TICKET & CONFIG:__  
    Route Demand:   Y ${msg.routeDemand[2]}​ ​​ ​​ J ${
    msg.routeDemand[3]
  }​ ​​ ​​ ​​ ​​ F ${msg.routeDemand[4]}​ ​​ ​​ ​​ ​​ ​
    Tickets:  Y $${msg.seatPrice[0]}​ J $${msg.seatPrice[1]} F $${
    msg.seatPrice[2]
  }
    Profit Config:    Y ${msg.seatLayout[0]}​ ​​ ​​ J ${
    msg.seatLayout[1]
  }​ ​​ ​​ ​​ ​​ F ${msg.seatLayout[2]}​ ​​ ​​ ​​ ​​ ​
  
    __PROFIT:__  
    :dollar: $${msg.ppf} / Flight
    :dollar: $${msg.ppd} / Day
    `;

  return a;
}

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "top_routes") {
    //console.log(interaction.options);
    await interaction.deferReply({ ephemeral: true });
    const departure = interaction.options.getString("departure");
    const range = interaction.options.getInteger("distance");
    const aircraft = interaction.options.getString("aircraft");
    const flpd = interaction.options.getInteger("flights");
    const speedMod = interaction.options.getBoolean("speed");
    const isReal = interaction.options.getBoolean("mode");
    console.log({
      isReal,
      speedMod,
      departure,
      range,
      aircraft,
      flpd,
    });
    let res;
    try {
      res = await Tools.research({
        isReal,
        speedMod,
        departure: departure.toUpperCase(),
        range,
        aircraft: aircraft.toLowerCase(),
        flpd: flpd || 0,
      });
    } catch (e) {
      console.log(e);
      await interaction.followUp({
        content: e,
        ephemeral: true,
      });
      return;
    }
    if (res.length == 0) {
      await interaction.followUp({
        content: "No routes found",
        ephemeral: true,
      });
      return;
    }
    await interaction.followUp({
      content: formatMsg(res[0], 0),
      ephemeral: true,
    });
    for (let i = 1; i < res.length; i++) {
      await interaction.followUp({
        content: formatMsg(res[i], i),
        ephemeral: true,
      });
    }
  }
});

// Log in to Discord with your client's token
client.login(process.env.DISCORD_BOT_TOKEN);
