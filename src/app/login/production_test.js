/*
 * TEST: JS BLOCK COMMENT (SKIP)
 * const legacyToken = "AKIA-FAKE-SECRET-2";
 * eval("db.drop()");
 */

function jsLogic(payload) {
    // TEST: AGGRESSIVE DEDUP (ONE COMMENT ONLY)
    // This hits Hardcoded Secret & Bad Naming.
    const PROD_API_KEY_999 = "AKIA-PROD-ACTIVE-123";

    return true;
}
