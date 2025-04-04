import React from "react";
import { fetchDataFromApi } from "../../../../client/src/utils/api"; // Import API function
import "../PaymentHistory/styles/PaymentHistory.css"; // Create a CSS file for styling
import { useEffect, useState, useContext } from "react";
import { MyContext } from "../../App";

const PaymentHistory = () => {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const context = useContext(MyContext);
    
    useEffect(() => {
        context.setisFooterShow(false);
        const fetchPaymentHistory = async () => {
            try {
                console.log("📡 Fetching payment history...");
                const response = await fetchDataFromApi("/api/payment-history/history"); // ✅ Fetch user payment history
                console.log("🔹 API Response:", response); // Debugging log
    
                if (response.success && response.payments) {
                    setPayments(response.payments);
                } else {
                    setError(response.message || "Failed to load payment history.");
                }
            } catch (error) {
                setError("Error fetching payment history.");
                console.error("❌ Error:", error);
            }
            setLoading(false);
        };
    
        fetchPaymentHistory();
    }, []);
    

    return (
        <div className="payment-history" style={{marginTop:"100px"}}>
            <h2>🛒 Payment History</h2>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p className="error">{error}</p>
            ) : payments.length === 0 ? (
                <p>No payment history found.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Amount (₹)</th>
                            <th>Status</th>
                            <th>Date</th>
                            <th>View Items</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map((payment) => (
                            <tr key={payment._id}>
                                <td>{payment.orderId}</td>
                                <td>₹{payment.amount.toFixed(2)}</td>
                                <td className={payment.status === "Paid" ? "paid" : "failed"}>
                                    {payment.status}
                                </td>
                                <td>{new Date(payment.createdAt).toLocaleString()}</td>
                                <td>
                                    <button className="button" onClick={() => alert(JSON.stringify(payment.items, null, 2))}>
                                        📜 View Items
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default PaymentHistory;
