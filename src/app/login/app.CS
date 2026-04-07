using System;
using System.Data.SqlClient;

// STYLING: Missing XML Documentation
// LINTER: Namespace should match folder structure
namespace App.Controllers
{
    // STYLING: Class name should be PascalCase
    public class user_controller
    {
        // STYLING: Public properties should be PascalCase, missing explicit access modifiers
        public string connectionString = "Server=myServer;Database=myDB;User=admin;Password=superSecretPassword123;"; // RULE: SECURITY (Hardcoded Credentials)

        // STYLING: Missing XML docstring, parameter should be camelCase
        public void DeleteUser(string UserId)
        {
            // RULE: SECURITY (SQL Injection Vulnerability)
            // CRITICAL: Concatenating unvalidated user input directly into a SQL command.
            // If UserId is "1 OR 1=1", it will delete everything.
            string query = "DELETE FROM Users WHERE Id = " + UserId;

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                // RULE: LOGIC / RESOURCE
                // Not wrapping SqlCommand in a 'using' block can leak unmanaged resources if an exception is thrown
                SqlCommand command = new SqlCommand(query, connection);
                
                connection.Open();
                command.ExecuteNonQuery();
                
                // STYLING: 'Console.WriteLine' in library code instead of a logging framework
                Console.WriteLine("User deleted successfully!");
            }
        }
    }
}
