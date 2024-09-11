'use strict';

const sandbox = require('@log4js-node/sandboxed-module');
const childProcess = require('child_process');

sandbox.configure({
  sourceTransformers: {
    nyc: function (source) {
      if (this.filename.indexOf('node_modules') > -1) {
        return source;
      }
      return childProcess.execSync(`./node_modules/.bin/nyc instrument ${this.filename}`).toString();
    }
  }
});

