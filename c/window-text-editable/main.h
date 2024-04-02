#import <Cocoa/Cocoa.h>
#import "TextViewWrapper.h"
#import "ButtonWrapper.h"

@interface AppDelegate : NSObject <NSApplicationDelegate, NSWindowDelegate>

@property(nonatomic, strong) NSWindow *window;
@property(nonatomic, strong) TextViewWrapper *textViewWrapper;
@property(nonatomic, strong) ButtonWrapper *buttonWrapper;

@end
