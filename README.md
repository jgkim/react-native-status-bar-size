## react-native-status-bar-height

Watch and respond to changes in the iOS status bar height.

### Add it to your project

1. Run `npm install react-native-status-bar-size --save`
2. Open your project in XCode, right click on `Libraries` and click `Add
   Files to "Your Project Name"` [(Screenshot)](http://url.brentvatne.ca/g9Wp).
3. Add `libRNStatusBarSize.a` to `Build Phases -> Link Binary With Libraries`
   [(Screenshot)](http://url.brentvatne.ca/g9Wp).
4. Follow the example below to use it in JS

## Example

```javascript
var MyApp = React.createClass({
   getInitialState: function() {
     return {
       currentStatusBarHeight: StatusBarSizeIOS.currentHeight,
     };
   },

   componentDidMount: function() {
     StatusBarSizeIOS.addEventListener('change', this._handleStatusBarSizeChange);
   },

   componentWillUnmount: function() {
     StatusBarSizeIOS.removeEventListener('change', this._handleStatusBarSizeChange);
   },

   _handleStatusBarSizeChange: function(currentStatusBarHeight) {
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

## TODOS

- [ ] Any way to know when status bar change is triggered what is going
  to happen to it? Will it grow or shrink? To what height? Could be useful to transition with it,
  otherwise the `willChange` event is a bit pointless (right now this
  lib only responds to `didChange`)
