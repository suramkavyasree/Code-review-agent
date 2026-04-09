/*
 * TEST 1: JS BLOCK COMMENT (SKIP)
 * Everything in this block MUST be ignored.
 * const legacyKey = "AKIA_FAKE_SECRET_1";
 */

function handleAuth(token) {
    // TEST 2: JS LINE COMMENT (SKIP)
    // const adminToken = "AKIA_FAKE_SECRET_2";

    /* One-liner test (SKIP internal secret, KEEP active logic) */
    const isReady = true; /* eval("alert(1)"); */ 

    // TEST 3: AGGRESSIVE DEDUP (ONE COMMENT ONLY)
    // This line below hits multiple rules: Hardcoded Secret & Bad Naming.
    // It should only show EXACTLY ONE comment (the Critical Secret).
    const PROD_KEY_12345 = "AKIA-PROD-XYZ-999-ACTIVE";

    return isReady;
}
