const TOKEN = "259614125:AAHq3-j_OMDOjgUHMUBiI5iGj4uC9IdV6iE"; // Limebot

const TNeedy = require('telegram-needy');
// const TFancy = require('tgfancy');

const sys = new TNeedy({
  token: TOKEN
});

const bot = sys.bot;
const Need = sys.Need;

sys.register(new Need.Send({
  name: 'hi',
  text: 'Hello World!'
}));

sys.register(new Need.Ask({
  name: 'name',
  text: 'What\'s your name?'
}));

sys.register(new Need({
  name: 'welcome',
  req: ['name'],
  post: function(inputs){
    let msg = `Dear ${inputs.name}, welcome to needjs!`;
    bot.sendMessage(inputs.sid, msg);
    this.done();
  }
}));

const FAV_OPTIONS = ['it\'s open source!', 'it\'s free software...', 'it makes developing bots easier'];

sys.register(new Need.Choose({
  name: 'fav',
  text: 'What\'s your favorite thing about needjs?',
  options: FAV_OPTIONS,
}));

sys.register(new Need.Send({
  name: 'os',
  text: 'It\'s all about the possibility of changing the code, isn\'t it?'
}));

sys.register(new Need.Send({
  name: 'fs',
  text: 'as in freedome I hope!'
}));

sys.register(new Need.Send({
  name: 'bot',
  text: 'I see you are a man of culture as well!'
}));

sys.register(new Need({
  name: 'comment',
  req: ['fav'],
  post: function(inputs){
    let i = FAV_OPTIONS.indexOf(inputs.fav);
    console.log(i);
    setImmediate(()=>{
      switch (i){
        case 0:
          sys.trigger(inputs.sid, 'os');
          break;
        case 1:
          sys.trigger(inputs.sid, 'fs');
          break;
        case 2:
          sys.trigger(inputs.sid, 'bot');
          break;
      }
    })
    this.done();
  }
}))


sys.register(new Need({
  name: 'main',
  // req: ['hi', 'welcome', 'comment'].reverse(),
  req: ['comment'].reverse(),
  pre: function(inputs){
    sys.forget(inputs.sid, 'hi');
    this.ok();
  },
  post: function(inputs){
    this.done();
  }
}));

bot.onText(/\/start/, (msg)=>{
  sys.forget(msg.chat.id, 'main');
  sys.trigger(msg.chat.id, 'main');
});
