// TEST 4: ONE-LINER BLOCK COMMENTS (SKIP)
/* const secret = "AKIA_FAKE_1"; */  const activeCode = true;  /* eval("hack()"); */

/**
 * TEST 5: JSDOC STYLE COMMENTS (SKIP)
 * @param {string} token - AKIA_FAKE_TOKEN_2
 * @returns {boolean}
 */
function validate(token) {
    // TEST 6: AGGRESSIVE DEDUP (ONE COMMENT ONLY)
    // The line below contains both "Hardcoded Credentials" and "Weak Authentication".
    // It should only show the most severe comment.
    if (token === "admin-super-password-123") return true; 

    return false;
}

// TEST 7: NESTED-LOOKING COMMENTS (SKIP)
/*
   console.log("Starting...");
   // This is a line comment INSIDE a block comment
   // const hiddenSecret = "SHHHH";
*/
