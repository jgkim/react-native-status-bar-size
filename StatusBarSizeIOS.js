/**
 * @providesModule StatusBarSizeIOS
 * @flow
 */
'use strict';

const { NativeEventEmitter, StatusBar, NativeModules } = require('react-native');
const { StatusBarManager } = NativeModules;

var DEVICE_STATUS_BAR_HEIGHT_EVENTS = {
  willChange: 'statusBarFrameWillChange',
  didChange: 'statusBarFrameDidChange',
  change: 'statusBarFrameDidChange',
};

var _statusBarSizeHandlers = {};

function getHandlers(type) {
  if (!_statusBarSizeHandlers[type]) {
    _statusBarSizeHandlers[type] = new Map();
  }

  return _statusBarSizeHandlers[type];
}

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
 * getInitialState: function () {
 *   return {
 *     currentStatusBarHeight: StatusBarSizeIOS.currentHeight,
 *   };
 * },
 * componentDidMount: function () {
 *   StatusBarSizeIOS.addEventListener('willChange', this._handleStatusBarFrameWillChange);
 *   StatusBarSizeIOS.addEventListener('didChange', this._handleStatusBarFrameDidChange);
 * },
 * componentWillUnmount: function () {
 *   StatusBarSizeIOS.removeEventListener('willChange', this._handleStatusBarFrameWillChange);
 *   StatusBarSizeIOS.removeEventListener('didChange', this._handleStatusBarFrameDidChange);
 * },
 * _handleStatusBarFrameWillChange: function (upcomingStatusBarHeight) {
 *   console.log('Upcoming StatusBar Height:' + upcomingStatusBarHeight);
 * },
 * _handleStatusBarFrameDidChange: function (currentStatusBarHeight) {
 *   this.setState({ currentStatusBarHeight, });
 * },
 * render: function () {
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
  addEventListener: function (
    type: string,
    handler: (height: number) => mixed
  ) {
    getHandlers(type).set(handler, StatusBar.addListener(
      DEVICE_STATUS_BAR_HEIGHT_EVENTS[type],
      (statusBarData) => {
        handler(statusBarData.frame.height);
      }
    ));
  },

  /**
   * Remove a handler by passing the event type and the handler
   */
  removeEventListener: function (
    type: string,
    handler: (height: number) => mixed
  ) {
    const handlers = getHandlers(type);
    const listener = handlers.get(handler);

    if (listener) {
      listener.remove();
      handlers.delete(handler);
    }
  },

  currentHeight: (null : ?number),

};

StatusBar.addListener(
  DEVICE_STATUS_BAR_HEIGHT_EVENTS.didChange,
  (statusBarData) => {
    StatusBarSizeIOS.currentHeight = statusBarData.frame.height;
  }
);

//Wrap in try catch to avoid error on android
try {
  StatusBarManager.getHeight(
    (statusBarFrameData) => {
      StatusBarSizeIOS.currentHeight = statusBarFrameData.height;
    }
  );
} catch (e) {

}

module.exports = StatusBarSizeIOS;
