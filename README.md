## react-native-status-bar-height

Watch and respond to changes in the iOS status bar height.

### Add it to your project

1. Run `npm install react-native-status-bar-size --save`
2. Open your project in XCode, right click on `Libraries` and click `Add
   Files to "Your Project Name"` [(Screenshot)](http://url.brentvatne.ca/g9Wp).
3. Add `libRNStatusBarSize.a` to `Build Phases -> Link Binary With Libraries`
   [(Screenshot)](http://url.brentvatne.ca/g9Wp).
4. Follow the example below to use it in JS

### Deprecated `change` Event

The `change` event has been deprecated. The `didChange` event should be used instead.
It's still available but may be removed in a later version.

## Example

```javascript
var MyApp = React.createClass({
   getInitialState: function() {
     return {
       currentStatusBarHeight: StatusBarSizeIOS.currentHeight,
     };
   },

   componentDidMount: function() {
     StatusBarSizeIOS.addEventListener('willChange', this._handleStatusBarSizeWillChange);
     StatusBarSizeIOS.addEventListener('didChange', this._handleStatusBarSizeDidChange);
   },

   componentWillUnmount: function() {
     StatusBarSizeIOS.removeEventListener('willChange', this._handleStatusBarSizeWillChange);
     StatusBarSizeIOS.removeEventListener('didChange', this._handleStatusBarSizeDidChange);
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

![Demo gif](https://github.com/brentvatne/react-native-status-bar-size/blob/master/demo.gif)

## TODOS

- [ ] Update it after device rotation event
