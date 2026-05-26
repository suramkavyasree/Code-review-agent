// STYLING: Missing Include Guards (#pragma once or #ifndef)
// STYLING: Missing file-level documentation

#include <iostream>
#include <string>

// RULE: ARCHITECTURE / BEST PRACTICE
// CRITICAL: NEVER use `using namespace` in a header file.
// It pollutes the global namespace for every file that includes this header, easily causing naming collisions.
using namespace std;

// STYLING: lowercase class name, curly brace on next line
class base_handler 
{
public:
    base_handler() { cout << "Base initialized" << endl; }
    
    // RULE: LOGIC / MEMORY LEAK
    // CRITICAL: Missing virtual destructor in a base class!
    // If a derived class is deleted via a base class pointer, the derived destructor will never run.
    ~base_handler() { cout << "Base destroyed" << endl; }
    
    virtual void handleRequest(string req) = 0;
};

// STYLING: Mixed naming conventions
class HTTPHandler : public base_handler {
private:
    string connectionString;
public:
    HTTPHandler() { cout << "HTTP initialized" << endl; }
    ~HTTPHandler() { cout << "HTTP destroyed" << endl; }
    
    void handleRequest(string req) override {
        // Some processing logic
        cout << "Handling " << req << endl;
    }
};
