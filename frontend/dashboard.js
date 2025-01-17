document.addEventListener("DOMContentLoaded", () => {
    // URLs for API data
    const metricsUrl = '/api/dashboard/stats';
    const transactionsUrl = '/api/transactions';
    const wsUrl = 'ws://localhost:5003';

    // DOM elements
    const totalRevenueEl = document.getElementById('total-revenue');
    const totalTransactionsEl = document.getElementById('total-transactions');
    const totalCustomersEl = document.getElementById('total-customers');
    const averageValueEl = document.getElementById('average-value');
    const transactionsTableBody = document.querySelector('#transactions-table tbody');

    // Real-time WebSocket connection
    const ws = new WebSocket(wsUrl);
    ws.onmessage = (event) => {
        const stats = JSON.parse(event.data);
        updateRealTimeStats(stats);
    };

    // Fetch and display summary metrics
    async function fetchMetrics() {
        try {
            const response = await fetch(metricsUrl);
            const data = await response.json();

            // Update metrics in the DOM
            totalRevenueEl.textContent = `Total Revenue: $${data.totalRevenue}`;
            totalTransactionsEl.textContent = `Total Transactions: ${data.totalTransactions}`;
            totalCustomersEl.textContent = `Total Customers: ${data.totalCustomers}`;
            averageValueEl.textContent = `Average Value: $${data.averageTransactionValue}`;
        } catch (error) {
            console.error('Error fetching metrics:', error);
        }
    }

    // Fetch and display transaction details
    async function fetchTransactions() {
        try {
            const response = await fetch(transactionsUrl);
            const transactions = await response.json();

            // Populate transaction table
            transactionsTableBody.innerHTML = transactions.map(tx => `
                <tr>
                    <td>${tx.Oid}</td>
                    <td>${new Date(tx.TransactionDate).toLocaleString()}</td>
                    <td>${tx.Customer}</td>
                    <td>${tx.Branch}</td>
                    <td>$${tx.Value}</td>
                    <td>$${tx.VATValue}</td>
                    <td><a href="${tx.InvoiceImagePath}" target="_blank">View Invoice</a></td>
                    <td>${tx.TransactionSynced ? 'Synced' : 'Unsynced'}</td>
                </tr>
            `).join('');
        } catch (error) {
            console.error('Error fetching transactions:', error);
        }
    }

    // Update real-time stats
    function updateRealTimeStats(stats) {
        const syncStatusEl = document.getElementById('sync-status');
        const systemHealthEl = document.getElementById('system-health');

        syncStatusEl.textContent = `Synced Transactions: ${stats.rowsTransferred} / Unsynced: ${stats.rowsMissed}`;
        systemHealthEl.textContent = `Processing Efficiency: ${(stats.processingEfficiency * 100).toFixed(2)}%`;
    }

    // Initialize dashboard
    fetchMetrics();
    fetchTransactions();
});
