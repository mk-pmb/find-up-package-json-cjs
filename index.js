'use strict';

const fs = require('fs');
const fsPr = require('fs/promises');
const pathLib = require('path');

const findPkg = require('find-pkg');


function fixFrom(from) {
  let fr = String(from || '.');
  fr = fr.replace(/\/+$/, '') || '/';
  if (fr === '.') { return process.cwd(); }
  return fr;
}


function getterify(val) { return function get() { return val; }; }


const EX = async function findUpPackageJson(from) {
  from = fixFrom(from); // eslint-disable-line no-param-reassign
  const fullPath = await findPkg(from);
  const rawContent = fullPath && await fsPr.readFile(fullPath);
  return EX.report(fullPath, rawContent, from);
};


EX.sync = function findUpPackageJsonSync(from) {
  from = fixFrom(from); // eslint-disable-line no-param-reassign
  const fullPath = findPkg.sync(from);
  const rawContent = fullPath && fs.readFileSync(fullPath);
  return EX.report(fullPath, rawContent, from);
};


EX.report = function findUpPackageJsonReport(fullPath, rawContent, from) {
  if (!fullPath) {
    const err = new Error('Found no package.json file up from ' + from);
    err.from = from;
    throw err;
  }
  const dirPath = fullPath && pathLib.dirname(fullPath);
  const text = String(rawContent || '');
  let manif = false;
  try { manif = JSON.parse(text); } catch (ignore) { ; }
  const rep = {
    fullPath,
    dirPath,
    text: getterify(text),
    parse: getterify(manif),
    isEsModule: (manif.type === 'module'),
  };
  rep.resolve = function resolve(relPath) {
    return pathLib.resolve(dirPath, relPath);
  };
  rep.mainPath = dirPath && rep.resolve(manif.main || 'index.js');
  return rep;
};


module.exports = EX;
