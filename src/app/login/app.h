// STYLING/LINTER: Missing Include Guards (#ifndef MY_HEADER_H)
// STYLING: Missing file-level documentation

#include <stdlib.h>

// STYLING: Bad naming convention (camelCase instead of snake_case for C structs)
struct userSession {
    int sessionId;
    char targetUser[32];
};

// RULE: LOGIC / SECURITY
// CRITICAL: Unsafe macro definition. Missing parentheses around parameters.
// If someone calls SECURE_MULTIPLY(a + 1, b), it expands to `a + 1 * b`, violating expected math order.
#define SECURE_MULTIPLY(x, y) x * y

// RULE: ARCHITECTURE
// declaring a global variable in a header file will cause "multiple definition" linker errors if included in multiple .c files.
// Should be marked `extern`.
int Global_System_State = 0;

// STYLING: Missing parameter names and docstrings
int authenticateUser(int, char*);
