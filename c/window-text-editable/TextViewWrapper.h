#import <Cocoa/Cocoa.h>

@interface TextViewWrapper : NSObject

@property(nonatomic, strong) NSTextView *textView;

- (instancetype)initWithFrame:(NSRect)frame;

@end
