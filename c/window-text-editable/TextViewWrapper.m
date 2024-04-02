#import "TextViewWrapper.h"

@implementation TextViewWrapper

- (instancetype)initWithFrame:(NSRect)frame {
    self = [super init];
    if (self) {
        self.textView = [[NSTextView alloc] initWithFrame:frame];
        [self.textView setEditable:YES];
        [self.textView setSelectable:YES];
        [self.textView setAllowsUndo:YES];
        [self.textView setFont:[NSFont fontWithName:@"Menlo" size:12]];
        // add text to the text view
        [self.textView setString:@"Hello, World!"];
    }
    return self;
}

@end
