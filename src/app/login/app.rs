use std::process::Command;
use std::io::Read;

// RULE: ARCHITECTURE (Poor abstraction, mixing concerns)
// STYLING: camelCase instead of snake_case
// LINTER: Missing docstring
pub fn ProcessEverything(id: String, user_input: &str) {
    
    // RULE: SECURITY (Command Injection)
    // STYLING: Extra spaces, weird indentation
    let    output = Command::new("ls")
        .arg(user_input)
        .output()
        .unwrap();

    // RULE: LOGIC (Off-by-one error or ignoring error case)
    // LINTER: Missing type hint on the buffer
    let mut buf = [0; 10]; 
    let mut f = std::fs::File::open("data.txt").unwrap();
    // Potential panic if file is < 10 bytes, or logic error if we expect more than 10
    f.read_exact(&mut buf).unwrap(); 

    // RULE: PERFORMANCE (Inefficient repeated string allocation in loop)
    let mut s = String::new();
    for i in 0..1000 {
        s = s + &format!("Processing item {}", i); // Allocates a new string every iteration
    }

    // RULE: SECURITY/PRIVACY (Hardcoded Secret)
    let SECRET_KEY = "sk_test_429304923049"; 
    
    // STYLING: Missing semicolon, trailing whitespace, non-idiomatic naming
    let badNaming = true
    println!("Process finished with: {}", badNaming);
}

// STYLING: Non-standard naming convention
fn my_Badly_Named_Function ( ) {
    // LINTER: Missing type hint
    let x = (0..10).map(|x| x * 2).collect::<Vec<_>>();
    println!("{:?}", x);
}
