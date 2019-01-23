'use strict';
import WDIOReporter from '@wdio/reporter'
const { buildFormatter, events } = require('./lib/message');
const { flow } = require('lodash');


export default class TeamcityReporter extends WDIOReporter{
  /**
   * @param {object}  reporterOptions
   * @param {boolean} reporterOptions.captureStandardOutput
   * @param {boolean} reporterOptions.flowId
   * @param {string}  reporterOptions.message
   * @return {wdioTeamcityReporter}
   */
  constructor (reporterOptions){
    /**
     * make teamcity reporter to write to output stream by default
     */
    const options = Object.assign({ stdout: true }, reporterOptions);
    super(options);
    const opts = {
      captureStandardOutput: typeof reporterOptions.captureStandardOutput === 'boolean'
        ? reporterOptions.captureStandardOutput
        : false,
      flowId: typeof reporterOptions.flowId === 'boolean'
        ? reporterOptions.flowId
        : true,
      name: typeof reporterOptions.message === 'string'
        ? reporterOptions.message
        : '[title]',
    };

    this.enableRealTimeOutput(opts);
  }

  enableRealTimeOutput(opts){
    events.forEach(event => this.on(event, flow(buildFormatter(event, opts), this.output)));
  }
  /**
   * @param  {string} msg
   * @return {string}
   */
  output(msg) {
    if (msg) {
      this.write(msg);
    }
  }
}

