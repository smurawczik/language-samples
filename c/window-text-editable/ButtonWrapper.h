#import <Cocoa/Cocoa.h>

@interface ButtonWrapper : NSObject

@property(nonatomic, strong) NSButton *button;

- (instancetype)initWithFrame:(NSRect)frame target:(id)target action:(SEL)action;

@end
