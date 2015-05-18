#import "RNStatusBarSize.h"

#import "RCTAssert.h"
#import "RCTBridge.h"
#import "RCTEventDispatcher.h"

static float RNCurrentStatusBarSize()
{
  return [[UIApplication sharedApplication] statusBarFrame].size.height;
}

@implementation RNStatusBarSize
{
  float _lastKnownHeight;
}

@synthesize bridge = _bridge;

RCT_EXPORT_MODULE()

#pragma mark - Lifecycle

- (instancetype)init
{
  if ((self = [super init])) {
    _lastKnownHeight = RNCurrentStatusBarSize();

    [[NSNotificationCenter defaultCenter] addObserver:self
                                             selector:@selector(handleStatusBarWillChange:)
                                                 name:UIApplicationWillChangeStatusBarFrameNotification
                                               object:nil];
    
    [[NSNotificationCenter defaultCenter] addObserver:self
                                             selector:@selector(handleStatusBarDidChange)
                                                 name:UIApplicationDidChangeStatusBarFrameNotification
                                               object:nil];
  }
  return self;
}


- (void)dealloc
{
  [[NSNotificationCenter defaultCenter] removeObserver:self];
}

#pragma mark - App Notification Methods

- (void)handleStatusBarWillChange:(NSNotification *)notification
{
  NSValue *rectValue = [[notification userInfo] valueForKey:UIApplicationStatusBarFrameUserInfoKey];
  
  CGRect newFrame;
  [rectValue getValue:&newFrame];
  
  float newHeight = newFrame.size.height;
  if (newHeight != _lastKnownHeight) {
    [_bridge.eventDispatcher sendDeviceEventWithName:@"statusBarSizeWillChange"
                             body:@{@"height": [NSNumber numberWithFloat:newHeight]}];
  }
}

- (void)handleStatusBarDidChange
{
  float newHeight = RNCurrentStatusBarSize();
  if (newHeight != _lastKnownHeight) {
    _lastKnownHeight = newHeight;
    [_bridge.eventDispatcher sendDeviceEventWithName:@"statusBarSizeDidChange"
                             body:@{@"height": [NSNumber numberWithFloat:_lastKnownHeight]}];
  }
}

#pragma mark - Public API

/**
* Get the current height of the status bar
*/
RCT_EXPORT_METHOD(getCurrentStatusBarHeight:(RCTResponseSenderBlock)callback
                  error:(__unused RCTResponseSenderBlock)error)
{
  callback(@[@{@"height": [NSNumber numberWithFloat:_lastKnownHeight]}]);
}

@end
