## react-native-status-bar-size

Watch and respond to changes in the iOS status bar height.

### Add it to your project

1. Run `npm install react-native-status-bar-size --save`
2. Follow the example below to use it in JS

### Deprecated `change` Event

The `change` event has been deprecated. The `didChange` event should be used instead.
It's still available but may be removed in a later version.

## Example

```javascript
var MyApp = React.createClass({
   getInitialState: function() {
     return {
       currentStatusBarHeight: StatusBarSize.currentHeight,
     };
   },

   componentDidMount: function() {
     StatusBarSize.addEventListener('willChange', this._handleStatusBarSizeWillChange);
     StatusBarSize.addEventListener('didChange', this._handleStatusBarSizeDidChange);
   },

   componentWillUnmount: function() {
     StatusBarSize.removeEventListener('willChange', this._handleStatusBarSizeWillChange);
     StatusBarSize.removeEventListener('didChange', this._handleStatusBarSizeDidChange);
   },

   _handleStatusBarSizeWillChange: function(nextStatusBarHeight) {
     console.log('Will Change: ' + nextStatusBarHeight);
   },

   _handleStatusBarSizeDidChange: function(currentStatusBarHeight) {
     console.log('changed');
     this.setState({ currentStatusBarHeight: currentStatusBarHeight });
   },

   render: function() {
     return (
       <View style={{flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center'}}>
         <Text>Current status bar height is: {this.state.currentStatusBarHeight}</Text>
       </View>
     );
   },
});
```

![Demo gif](https://raw.githubusercontent.com/jgkim/react-native-status-bar-size/master/demo.gif)
