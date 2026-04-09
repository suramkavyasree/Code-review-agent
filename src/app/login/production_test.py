import os

# ==========================================
# TEST 7: PY LINE COMMENT (SKIP)
# ==========================================
# os.system("rm -rf /") # Deeply dangerous if it weren't commented!
# legacy_aws_key = "AKIA_PY_FAKE_KEY"

def start_process(user_config):
    # ==========================================
    # TEST 8: AGGRESSIVE DEDUP (ONE COMMENT ONLY)
    # ==========================================
    # This line has both Command Injection and a Hardcoded Command.
    # It should only show EXACTLY ONE comment.
    os.system(f"echo Processing {user_config}")

    try:
        print("Done.")
    except Exception:
        # Bare exception - should be flagged once as High/Medium
        pass
