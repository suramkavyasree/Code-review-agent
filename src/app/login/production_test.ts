/**
 * TEST: TS JSDOC COMMENT (SKIP)
 * @param {string} secret - AKIA-FAKE-SECRET-3
 */
export const tsLogic = (input: string): void => {
    /* TEST: LINE COMMENT (SKIP)
       console.log("Debug: " + input); */

    // TEST: AGGRESSIVE DEDUP (ONE COMMENT ONLY)
    // This hits a secret and potential XSS via document.write
    const tsSecret = "SEC-TS-ACTIVE-444";
    document.write(input); 
};
