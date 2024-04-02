#import <Cocoa/Cocoa.h>

@interface AppDelegate : NSObject <NSApplicationDelegate, NSWindowDelegate>

@property (nonatomic, strong) NSWindow *window;
@property (nonatomic, strong) NSTextView *textView;
@property (nonatomic, strong) NSButton *button;

@end

@implementation AppDelegate

- (void)applicationDidFinishLaunching:(NSNotification *)aNotification {
    // Create the window
    self.window = [[NSWindow alloc] initWithContentRect:NSMakeRect(0, 0, 240, 200)
                                              styleMask:(NSWindowStyleMaskTitled | NSWindowStyleMaskClosable | NSWindowStyleMaskResizable)
                                                backing:NSBackingStoreBuffered
                                                  defer:NO];
    [self.window setTitle:@"My Window"];
    [self.window center];
    [self.window setDelegate:self];

    // Create the text view
    NSTextView *textView = [[NSTextView alloc] initWithFrame:NSMakeRect(20, 60, 200, 120)];
    [textView setEditable:YES];  // Make the text view editable
    [textView setFont:[NSFont fontWithName:@"Menlo" size:12]];  // Set the font
    [textView setString:@"Hello, World!"];  // Set the text

    // Create the scroll view and add the text view to it
    NSScrollView *scrollView = [[NSScrollView alloc] initWithFrame:NSMakeRect(20, 60, 200, 120)];
    [scrollView setDocumentView:textView];
    [self.window.contentView addSubview:scrollView];



    // Create the button
    self.button = [[NSButton alloc] initWithFrame:NSMakeRect(20, 20, 200, 30)];
    [self.button setTitle:@"Log Text"];
    [self.button setButtonType:NSButtonTypeMomentaryLight];
    [self.button setBezelStyle:NSBezelStyleRounded];
    [self.button setTarget:self];
    [self.button setAction:@selector(logText)];
    [self.window.contentView addSubview:self.button];

    [self.window makeKeyAndOrderFront:nil];
}

- (void)logText {
    NSLog(@"heyyy %@", self.textView.string);
}

- (BOOL)applicationShouldTerminateAfterLastWindowClosed:(NSApplication *)sender {
    return YES;
}

@end

int main(int argc, const char * argv[]) {
    AppDelegate *appDelegate = [[AppDelegate alloc] init];
    NSApplication *app = [NSApplication sharedApplication];
    [app setDelegate:appDelegate];
    [app run];
    return 0;
}
