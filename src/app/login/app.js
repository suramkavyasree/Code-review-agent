function authenticateUser(req, res) {
    // RULE: SECURITY (Hardcoded Credentials)
    // The AI should NOT flag this because it's commented out
    // const dbUser = "admin";
    // const dbPass = "super_secret_password_123!";

    /*
     * RULE: SECURITY (SQL Injection)
     * The AI should NOT flag this block because it is inside a multiline comment
     * const query = "SELECT * FROM users WHERE username = '" + req.body.user + "'";
     * db.execute(query);
     */

    // RULE: PERFORMANCE (Inefficient loop)
    // for (let i = 0; i < 1000000; i++) {
    //      console.log("Blocking the event loop...", i);
    // }

    // --- ACTIVE CODE BELOW ---
    // The AI SHOULD review the below code and flag it for Cross-Site Scripting (XSS).
    const userName = req.query.name;
    
    // RULE: SECURITY (XSS)
    res.send("<h1>Welcome back, " + userName + "</h1>");
}
