/**
 * @providesModule StatusBarSizeIOS
 * @flow
 */
'use strict';

var RNStatusBarSize = require('react-native').NativeModules.RNStatusBarSize;
var RCTDeviceEventEmitter = require('RCTDeviceEventEmitter');

var DEVICE_STATUS_BAR_HEIGHT_EVENTS = {
  willChange: 'statusBarSizeWillChange',
  didChange: 'statusBarSizeDidChange',
  change: 'statusBarSizeDidChange'
};

var _statusBarSizeHandlers = {};
var noop = function() {};

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
 *   StatusBarSizeIOS.addEventListener('willChange', this._handleStatusBarSizeWillChange);
 *   StatusBarSizeIOS.addEventListener('didChange', this._handleStatusBarSizeDidChange);
 * },
 * componentWillUnmount: function() {
 *   StatusBarSizeIOS.removeEventListener('willChange', this._handleStatusBarSizeWillChange);
 *   StatusBarSizeIOS.removeEventListener('didChange', this._handleStatusBarSizeDidChange);
 * },
 * _handleStatusBarSizeWillChange: function(upcomingStatusBarHeight) {
 *   console.log('Upcoming StatusBar Height:' + upcomingStatusBarHeight);
 * },
 * _handleStatusBarSizeDidChange: function(currentStatusBarHeight) {
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
   * Add a handler to Status Bar size changes by listening to the event type
   * and providing the handler.
   *
   * Possible event types: change (deprecated), willChange, didChange
   */
  addEventListener: function(
    type: string,
    handler: Function
  ) {
    _statusBarSizeHandlers[handler] = RCTDeviceEventEmitter.addListener(
      DEVICE_STATUS_BAR_HEIGHT_EVENTS[type],
      (statusBarSizeData) => {
        handler(statusBarSizeData.height);
      }
    );
  },

  /**
   * Remove a handler by passing the event type and the handler
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
  DEVICE_STATUS_BAR_HEIGHT_EVENTS.didChange,
  (statusBarData) => {
    StatusBarSizeIOS.currentHeight = statusBarData.height;
  }
);

RNStatusBarSize.getCurrentStatusBarHeight(
  (statusBarData) => {
    StatusBarSizeIOS.currentHeight = statusBarData.height;
  },
  noop
);

module.exports = StatusBarSizeIOS;
