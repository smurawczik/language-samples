#import <Cocoa/Cocoa.h>

@interface AppDelegate : NSObject <NSApplicationDelegate>

@property(nonatomic, strong) NSWindow *window;

@end

@implementation AppDelegate

- (void)applicationDidFinishLaunching:(NSNotification *)aNotification
{
  // Create a window
  NSRect frame = NSMakeRect(200, 0, 600, 600);
  self.window = [[NSWindow alloc] initWithContentRect:frame
                                            styleMask:(NSWindowStyleMaskTitled | NSWindowStyleMaskClosable | NSWindowStyleMaskResizable)
                                              backing:NSBackingStoreBuffered
                                                defer:NO];
  [self.window setTitle:@"Window example with objective-c"];
  [self.window makeKeyAndOrderFront:nil];
}

@end

int main(int argc, const char *argv[])
{
  @autoreleasepool
  {
    NSApplication *application = [NSApplication sharedApplication];
    AppDelegate *appDelegate = [[AppDelegate alloc] init];
    [application setDelegate:appDelegate];
    [application run];
  }
  return 0;
}
