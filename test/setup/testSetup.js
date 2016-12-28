global.chai = require('chai');
global.expect = global.chai.expect;
global.sinon = require('sinon');

const sinonChai = require('sinon-chai');
chai.should();
chai.use(sinonChai);

require('babel-register')({
  babelrc: false,
  presets: ['es2015', 'stage-0', 'react']
});
