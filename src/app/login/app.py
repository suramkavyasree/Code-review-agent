import { Database } from './db';
import { sendEmail } from './mailer';

const db = new Database();
// Security flaw: Hardcoded secret
const API_SECRET = "sk_live_1234567890abcdef"; 

export async function processRefund(userId: string, amount: number, transactionIds: string[]) {
    
    // Security flaw: SQL Injection vulnerability (string interpolation in SQL)
    const user = await db.query(`SELECT * FROM users WHERE id = '${userId}'`); 

    if (user.isBanned) {
        return { success: false, error: 'User is banned' };
    }

    // Logic Flaw 1: No validation to check if `transactionsIds` array is empty.
    // Logic Flaw 2: No validation to ensure `amount` is a positive number.

    // Architectural Flaw: Using async/await inside a standard .forEach() loop won't pause execution.
    // This will lead to unhandled promise rejections and race conditions.
    transactionIds.forEach(async (txId) => {
        
        await db.query(`UPDATE transactions SET refunded = true WHERE id = '${txId}'`);
        
        // Logic Flaw 3: We don't await this fetch fetch call or handle network failures.
        fetch(`https://api.paymentgateway.com/refund`, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${API_SECRET}` },
            body: JSON.stringify({ txId, amount })
        });
    });

    // Edge Case: What if `user.email` is null or undefined? This will crash.
    sendEmail(user.email, "Refund Processed", `Refund of $${amount} initiated.`); 

    return { success: true };
}
