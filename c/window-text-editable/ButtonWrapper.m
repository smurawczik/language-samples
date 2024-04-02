#import "ButtonWrapper.h"

@implementation ButtonWrapper

- (instancetype)initWithFrame:(NSRect)frame target:(id)target action:(SEL)action {
    self = [super init];
    if (self) {
        self.button = [[NSButton alloc] initWithFrame:frame];
        [self.button setTitle:@"Log Text"];
        [self.button setBezelStyle:NSBezelStyleRounded];
        [self.button setTarget:target];
        [self.button setAction:action];
    }
    return self;
}

@end
