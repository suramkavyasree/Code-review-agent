function processUserData(username, userId) {
  // ==========================================
  // COMMENTED OUT CODE - MUST BE SKIPPED
  // ==========================================
  // The system should NOT post any comments for the vulnerabilities below
  // because they are completely on commented-cut lines.
  // 
  // const awsSecretKey = "AKIAIOSFODNN7EXAMPLE";
  // const dbPassword = "super_secret_password_123";
  //
  // const query = `SELECT * FROM users WHERE id = ${userId}`;
  // executeDb(query);
  //
  // TODO: Refactor this function later. 
  
  /* 
   * document.body.innerHTML = "<h1>" + username + "</h1>"; 
   */
  
  // ==========================================
  // ACTIVE CODE - MUST GET REVIEWED
  // ==========================================
  // The system SHOULD post review comments for the vulnerabilities below 
  // because they are active, uncommented code.
  
  try {
    console.log(`Authenticating: ${username}`);
    
    // Active hardcoded secret!
    const activeApiToken = "12345-ABCDE-SECRET-TOKEN"; 
    
    // Active XSS risk!
    document.body.innerHTML += username;
  } catch (error) {
    // Bad practice: Bare/empty catch block
  }
  
  return true;
}
