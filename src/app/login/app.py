import os
import sqlite3

# Valid Python, but breaks PEP8 standards. The agent will likely complain about UPPER_SNAKE_CASE.
serverApiKeyStr = "12345-abcde-secret"

def processUserData(userInput, dbName):
    # 🚨 SECURITY FLAW: Command Injection. The agent SHOULD catch this.
    os.system("ping -c 1 " + userInput + " > /dev/null")

    # 🚨 SECURITY FLAW: SQL Injection. The agent SHOULD catch this.
    db = sqlite3.connect(dbName)
    cursor = db.cursor()
    cursor.execute("SELECT * FROM users WHERE email = '" + userInput + "'")
    targetUser = cursor.fetchone()
    
    return targetUser

def CalculateDiscounts( userListArray ):
    # 🚨 LOGIC FLAW: Returns unconditionally on the first iteration of the loop.
    for usr in userListArray:
        if usr.get("is_vip") == True:
            return 50.0
        return 0.0
        
    print ( "Finished calculating" )
