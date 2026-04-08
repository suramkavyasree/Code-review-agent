function authenticateUser(username, password) {
  // ==========================================
  // COMMENTED OUT CODE - SHOULD BE SKIPPED
  // ==========================================
  // The AI normally flags hardcoded secrets, but since these are in comments,
  // our new filter will drop any review issues targeted here!
  // 
  // const awsSecretKey = "AKIAIOSFODNN7EXAMPLE";
  // const dbPassword = "super_secret_password_123";
  //
  // const query = `SELECT * FROM users WHERE username = ${username} AND password = ${password}`;
  // executeDb(query);
  //
  // TODO: Refactor this function later. This TODO should also be ignored!
  
  /* 
   * document.body.innerHTML = "<h1>" + username + "</h1>"; // XSS Risk
   */
  
  // ==========================================
  // ACTIVE CODE - SHOULD BE REVIEWED
  // ==========================================
  // The AI should still flag the following lines because it's actively executing code
  // with potential vulnerabilities.
  
  try {
    console.log(`Authenticating: ${username}`);
    
    // Active hardcoded secret (AI normally flags this)
    const tempApiToken = "12345-ABCDE-SECRET-TOKEN"; 
    
    // Active XSS risk (rule SEC003 expects flagged dangerous tags)
    document.body.innerHTML += username;
  } catch (error) {
    // Swallowing errors (Bad practice)
  }
  
  return true;
}
