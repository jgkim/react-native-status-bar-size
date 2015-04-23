/**
 * @providesModule StatusBarSizeIOS
 * @flow
 */
'use strict';

var NativeModules = require('NativeModules');
var RCTDeviceEventEmitter = require('RCTDeviceEventEmitter');
var RNStatusBarSize = NativeModules.RNStatusBarSize;

var logError = require('logError');

var DEVICE_STATUS_BAR_HEIGHT_EVENT = 'statusBarSizeDidChange';

var _statusBarSizeHandlers = {};

/**
 * `StatusBarSizeIOS` can tell you what the current height of the status bar
 * is, so that you can adjust your layout accordingly when a phone call
 * notification comes up, for example.
 *
 * ### Basic Usage
 *
 * To see the current height, you can check `StatusBarSizeIOS.currentHeight`, which
 * will be kept up-to-date. However, `currentHeight` will be null at launch
 * while `StatusBarSizeIOS` retrieves it over the bridge.
 *
 * ```
 * getInitialState: function() {
 *   return {
 *     currentStatusBarHeight: StatusBarSizeIOS.currentHeight,
 *   };
 * },
 * componentDidMount: function() {
 *   StatusBarSizeIOS.addEventListener('change', this._handleStatusBarSizeChange);
 * },
 * componentWillUnmount: function() {
 *   StatusBarSizeIOS.removeEventListener('change', this._handleStatusBarSizeChange);
 * },
 * _handleStatusBarSizeChange: function(currentStatusBarHeight) {
 *   this.setState({ currentStatusBarHeight, });
 * },
 * render: function() {
 *   return (
 *     <Text>Current status bar height is: {this.state.currentStatusBarHeight}</Text>
 *   );
 * },
 * ```
 *
 * Open up the phone call status bar in the simulator to see it change.
 */

var StatusBarSizeIOS = {

  /**
   * Add a handler to Status Bar size changes by listening to the `change` event type
   * and providing the handler
   */
  addEventListener: function(
    type: string,
    handler: Function
  ) {
    _statusBarSizeHandlers[handler] = RCTDeviceEventEmitter.addListener(
      DEVICE_STATUS_BAR_HEIGHT_EVENT,
      (statusBarSizeData) => {
        handler(statusBarSizeData.height);
      }
    );
  },

  /**
   * Remove a handler by passing the `change` event type and the handler
   */
  removeEventListener: function(
    type: string,
    handler: Function
  ) {
    if (!_statusBarSizeHandlers[handler]) {
      return;
    }
    _statusBarSizeHandlers[handler].remove();
    _statusBarSizeHandlers[handler] = null;
  },

  currentHeight: (null : ?number),

};

RCTDeviceEventEmitter.addListener(
  DEVICE_STATUS_BAR_HEIGHT_EVENT,
  (statusBarData) => {
    StatusBarSizeIOS.currentHeight = statusBarData.height;
  }
);

RNStatusBarSize.getCurrentStatusBarHeight(
  (statusBarData) => {
    StatusBarSizeIOS.currentHeight = statusBarData.height;
  },
  logError
);

module.exports = StatusBarSizeIOS;
