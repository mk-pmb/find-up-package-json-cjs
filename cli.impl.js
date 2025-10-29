'use strict';

const findUpPackageJson = require('./index.js');

function ifFun(x, d) { return ((typeof x) === 'function' ? x : d); }
function isStr(x, no) { return (((typeof x) === 'string') || no); }

function cliMain(argv) {
  const nextArg = argv.shift.bind(argv);
  let report = findUpPackageJson.sync(nextArg());
  const sub = nextArg();
  if (!sub) { console.log(report); }
  const part = report[sub];
  report = (ifFun(part) ? part(nextArg()) : part);
  if (report === '') { return; }
  if (isStr(report)) { return process.stdout.write(report); }
  console.log(JSON.stringify(report, null, 2));
};


module.exports = cliMain;
