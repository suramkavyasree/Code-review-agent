import os

# TEST: PY COMMENT (SKIP)
# os.system("rm -rf " + userInput)
# admin_key = "AKIA-FAKE-SECRET-1"

def py_logic(user_data):
    # TEST: AGGRESSIVE DEDUP (ONE COMMENT ONLY)
    # This has two issues: Shell injection and Bare except.
    os.system(f"echo {user_data}")
    
    try:
        print("Success")
    except:
        pass
