/*
 * ==========================================
 * 1. BLOCK COMMENT TEST (MUST BE IGNORED)
 * ==========================================
 * Everything inside this block used to trigger comments, 
 * but our new stateful filter should skip it all.
 * 
 * const legacySecret = "AKIA_FAKE_SECRET_12345";
 * const query = "SELECT * FROM users WHERE id = " + userId;
 * eval(userInput);
 * TODO: This TODO should also be ignored.
 */

function processData(userInput) {
  // ==========================================
  // 2. LINE COMMENT TEST (MUST BE IGNORED)
  // ==========================================
  // const lineSecret = "ANOTHER_FAKE_SECRET";

  console.log("Analyzing active code...");

  // ==========================================
  // 3. ACTIVE CODE (MUST BE REVIEWED)
  // ==========================================
  // The system should still catch this one!
  const activeKey = "12345-ABCDE-REAL-ACTIVE-TOKEN";

  try {
    return activeKey;
  } catch (err) {
    // Empty catch block - should be flagged
  }
}
