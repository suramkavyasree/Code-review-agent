#include <iostream>
#include <string>
#include <thread>

// STYLING: Missing documentation
// LINTER: camelCase parameter name against project style
void processDataAsync(std::string* dataPtr) {
    // RULE: LOGIC / MEMORY
    // CRITICAL: Use-After-Free Vulnerability. 
    // The thread continues using dataPtr, but the main function deletes it immediately after spawning the thread.
    std::thread t([dataPtr]() {
        std::this_thread::sleep_for(std::chrono::milliseconds(100));
        std::cout << "Processing data: " << *dataPtr << std::endl;
    });
    t.detach();
}

// STYLING: Class name should be PascalCase, improper indentation
  class userManager {
public:
    void do_something_dangerous() {
        // RULE: SECURITY
        // CRITICAL: Calling system() is highly dangerous, especially without input validation
        int result = system("rm -rf /cache/temp/*");
        std::cout << "Cache cleared with result: " << result << std::endl;
    }
};

int main() {
    std::string* myData = new std::string("Important User Data");
    
    processDataAsync(myData);
    
    // CRITICAL BUG: Deleting the pointer while the detached thread is still trying to read it
    delete myData;
    
    return 0;
}
