const mongoose = require('mongoose');
const dns = require('node:dns');

dns.setServers(['8.8.8.8', '1.1.1.1']);
dns.setDefaultResultOrder('ipv4first');

const MONGODB_URI = "mongodb+srv://shakir_portfolio:x9YEM0m6B9pvDwFk@digirevolution.odaedua.mongodb.net/shakir-portfolio?appName=DigiRevolution";

async function test() {
  try {
    console.log('Attempting Satellite Link... 📡');
    await mongoose.connect(MONGODB_URI, { timeoutMS: 10000 });
    console.log('Connected! Database is Live. ✅');
    process.exit(0);
  } catch (err) {
    console.error('Link Failed! ❌');
    console.error(err.message);
    process.exit(1);
  }
}

test();
