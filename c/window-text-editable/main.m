#import "main.h"

@implementation AppDelegate

- (void)applicationDidFinishLaunching:(NSNotification *)aNotification {
    // Create a window
    NSRect frame = NSMakeRect(0, 0, 600, 400);
    self.window = [[NSWindow alloc] initWithContentRect:frame
                                               styleMask:(NSWindowStyleMaskTitled | NSWindowStyleMaskClosable | NSWindowStyleMaskResizable)
                                                 backing:NSBackingStoreBuffered
                                                   defer:NO];
    [self.window setTitle:@"My Window"];
    [self.window setDelegate:self]; // Set window delegate
    
    // Create text view wrapper
    NSRect textViewFrame = NSMakeRect(10, 10, frame.size.width - 20, frame.size.height - 60);
    self.textViewWrapper = [[TextViewWrapper alloc] initWithFrame:textViewFrame];
    
    // Add text view to window's content view
    [[self.window contentView] addSubview:self.textViewWrapper.textView];
    
    // Create button wrapper
    NSRect buttonFrame = NSMakeRect(10, 10 + textViewFrame.size.height + 10, 100, 30);
    self.buttonWrapper = [[ButtonWrapper alloc] initWithFrame:buttonFrame target:self action:@selector(logText:)];
    
    // Add button to window's content view
    [[self.window contentView] addSubview:self.buttonWrapper.button];
    
    [self.window makeKeyAndOrderFront:nil];

    // Assuming textView is your NSTextView instance
    if ([self.textViewWrapper.textView acceptsFirstResponder]) {
        [[self.textViewWrapper.textView window] makeFirstResponder:self.textViewWrapper.textView];
    }

    [self checkFirstResponder];
}

- (void)logText:(id)sender {
    NSLog(@"Text logged!");
}

// Method to close the application when the window is closed
- (BOOL)applicationShouldTerminateAfterLastWindowClosed:(NSApplication *)sender {
    return YES;
}

// Method called when the window is about to close
- (void)windowWillClose:(NSNotification *)notification {
    [[NSApplication sharedApplication] terminate:self];
}

- (void)checkFirstResponder {
    // Get the first responder
    NSResponder *firstResponder = [[NSApplication sharedApplication] keyWindow].firstResponder;

    // Check if the first responder is an NSTextView
    if ([firstResponder isKindOfClass:[NSTextView class]]) {
        NSTextView *textView = (NSTextView *)firstResponder;
        NSLog(@"The first responder is an NSTextView: %@", textView);
    } else {
        NSLog(@"The first responder is not an NSTextView: %@", firstResponder);
    }
}

@end

int main(int argc, const char * argv[]) {
    @autoreleasepool {
        NSApplication *application = [NSApplication sharedApplication];
        AppDelegate *appDelegate = [[AppDelegate alloc] init];
        [application setDelegate:appDelegate];
        [application run];
    }
    return 0;
}
