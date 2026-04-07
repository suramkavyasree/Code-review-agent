<?php

// STYLING: Missing PHPDoc, inconsistent brace placement
// LINTER: Missing type hints on arguments and return type
function handleClientRequest($request_data) 
{
    // RULE: PERFORMANCE (Inefficient repeated query execution in a loop)
    for ($i = 0; $i < 100; $i++) {
        // Assume connect_to_db() is defined elsewhere
        $db = connect_to_db(); 
        $db->query("SELECT * FROM events WHERE id = " . $i);
    }

    if (isset($request_data['dynamic_code'])) {
        // RULE: SECURITY (Remote Code Execution)
        // Extremely dangerous: Executing arbitrary code from the client
        eval($request_data['dynamic_code']);
    }
    
    // RULE: SECURITY (XSS - Cross Site Scripting)
    // Reflecting unsanitized input directly into the output
    $name = $request_data['name'];
    echo "<h1>Welcome back, " . $name . "</h1>";
}

// STYLING: Naming convention violation (uppercase for function)
// STYLING: Horrible indentation
  function DO_SOMETHING_BAD() {
$secretApiKey="sk_live_99283749238749823"; // RULE: SECURITY (Hardcoded Secret)
      return true;
  }

?>
