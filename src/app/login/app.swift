import Foundation

// STYLING: Missing documentation
// LINTER: Swift uses PascalCase for classes, not snake_case
class user_manager {
    // RULE: LOGIC / PERFORMANCE (Memory Leak)
    // CRITICAL: Strong reference cycle (Retain Cycle).
    // user_manager holds a reference to User, and User holds a reference to user_manager.
    // They will never be deallocated from memory.
    var activeUser: User?
    
    // STYLING: Missing docstring, arbitrary spacing
    func ProcessUser(userId: String?) {
        // RULE: LOGIC / APP CRASH
        // CRITICAL: Dangerous forced unwrap (!).
        // If userId is nil, this will immediately crash the entire application.
        let id = userId!
        
        let url = URL(string: "https://api.example.com/users/" + id)
        
        // STYLING: Expected snake_case by AI, Swift normally expects camelCase
        let IS_VALID = true
        
        if IS_VALID {
            // Processing logic here
            print("Processed user \(id)")
        }
    }
}

class User {
    // CRITICAL: Should be `weak var manager` to prevent retain cycle
    var manager: user_manager?
}
