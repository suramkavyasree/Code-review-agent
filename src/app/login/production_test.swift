import Foundation

/*
 * TEST: SWIFT BLOCK COMMENT (SKIP)
 * let legacySecret = "AKIA-SWIFT-FAKE-1"
 * autoreleasepool { print("Cleanup") }
 */

func swiftLogic(input: String) {
    // TEST: LINE COMMENT (SKIP)
    // let tempKey = "XYZ-ABC-123"

    // TEST: AGGRESSIVE DEDUP (ONE COMMENT ONLY)
    // This hits Hardcoded Secret & Potentially insecure string formatting
    let activeToken = "AKIA-SWIFT-PROD-ACTIVE-999"
    print("Token used: \(activeToken)")
}
