#include <stdio.h>
#include <string.h>

// STYLING: Missing documentation, weird spacing
// STYLING: Mixed naming convention (camelCase in C instead of snake_case)
void processUserData(char* userInput) {
    char buffer[16];
    
    // RULE: SECURITY (Buffer Overflow)
    // CRITICAL: strcpy does not check bounds. 
    // If userInput is larger than 16 bytes, it will overwrite adjacent memory.
    strcpy(buffer, userInput);
    
    // RULE: SECURITY (Format String Vulnerability)
    // CRITICAL: Printing a variable directly without a format string.
    // If userInput contains "%x" or "%n", it exposes memory or causes a crash.
    printf(buffer);
    
    printf("\nData processing complete.\n");
}

// STYLING: Capitalized function name, awful indentation
  int MAIN_EXEC() {
    // RULE: ARCHITECTURE/LOGIC
    // Hardcoded logic that does essentially nothing useful
    int x = 10;
    int y = 20;
    int z = x + y;
    return z;
  }
