var fs = require('fs');
var Chance = require('chance');
var chance = new Chance();

function generateJob() {
  return {
    _id: chance.guid(),
    name: chance.pickone(['jb_dbm', 'jb_youtube', 'jb_ga']),
    params: {},
    status: chance.pickone(['created', 'running', 'completed']),
    createdAt: chance.timestamp(),
    upatedAt: chance.timestamp(),
  };
}

var stream = fs.createWriteStream('jobs.json');
stream.once('open', function (fd) {

  stream.write('[');
  for (var i = 0; i < 50; i++) {
    i === 0 ? stream.write('') : stream.write(',');
    stream.write(JSON.stringify(generateJob()));
    stream.write('\n');
  }

  stream.write(']');
  stream.end();
});
