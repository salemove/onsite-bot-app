global.chai = require('chai');
global.expect = global.chai.expect;
global.sinon = require('sinon');

require('babel-register')({
  babelrc: false,
  presets: ['es2015', 'stage-0', 'react']
});
