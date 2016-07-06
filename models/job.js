var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var timestamp = require('mongoose-timestamp');
var paginate = require('mongoose-paginate');

var JobSchema = new Schema({
  name: { type: String, required: true, index: true },
  params: Schema.Types.Mixed,
  when: Number,
  status: String,
});

JobSchema.plugin(timestamp);
JobSchema.plugin(paginate);

var Job = mongoose.model('job', JobSchema);

module.exports = Job;
