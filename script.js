const BASE_URL = "http://localhost:5000";

/* ── Clock ──────────────────────────────────────── */
function updateClock() {
    const el = document.getElementById("clock");
    if (!el) return;
    const now = new Date();
    el.textContent = now.toLocaleTimeString("en-IN", { hour12: false });
}
setInterval(updateClock, 1000);
updateClock();

/* ── Feedback helper ────────────────────────────── */
function showFeedback(msg, type = "success") {
    const el = document.getElementById("form-feedback");
    if (!el) return;
    el.textContent = msg;
    el.className = `form-feedback ${type}`;
    setTimeout(() => { el.textContent = ""; el.className = "form-feedback"; }, 3500);
}

/* ── Update Stats Bar ───────────────────────────── */
function updateStats(alerts = null, transactions = null) {
    const now = new Date().toLocaleTimeString("en-IN", { hour12: false });
    document.getElementById("stat-updated").textContent = now;

    if (alerts !== null) {
        document.getElementById("stat-alerts").textContent = alerts.length;
        const highCount = alerts.filter(a =>
            String(a.risk_level).toLowerCase() === "high").length;
        document.getElementById("stat-high").textContent = highCount;
    }
    if (transactions !== null) {
        document.getElementById("stat-total").textContent = transactions.length;
    }
}

/* ── Risk badge helper ──────────────────────────── */
function riskBadge(level) {
    const l = String(level).toLowerCase();
    const cls = l === "high" ? "high" : l === "medium" || l === "med" ? "medium" : "low";
    return `<span class="badge ${cls}">${String(level).toUpperCase()}</span>`;
}

/* ── Add Transaction ────────────────────────────── */
function addTransaction() {
    const account_id = document.getElementById("account_id").value.trim();
    const amount = document.getElementById("amount").value.trim();
    const transaction_type = document.getElementById("transaction_type").value;
    const location = document.getElementById("location").value.trim();

    if (!account_id || !amount || !location) {
        showFeedback("⚠ Please fill in all fields.", "error");
        return;
    }

    const data = { account_id, amount, transaction_type, location };

    fetch(`${BASE_URL}/transactions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
        .then(res => {
            if (!res.ok) throw new Error(`Server error: ${res.status}`);
            return res.json();
        })
        .then(() => {
            showFeedback("✓ Transaction submitted successfully.", "success");
            document.getElementById("account_id").value = "";
            document.getElementById("amount").value = "";
            document.getElementById("location").value = "";
        })
        .catch(err => {
            showFeedback(`✗ Failed: ${err.message}`, "error");
        });
}

/* ── Load Alerts ────────────────────────────────── */
function loadAlerts() {
    fetch(`${BASE_URL}/alerts`)
        .then(res => {
            if (!res.ok) throw new Error(`Server error: ${res.status}`);
            return res.json();
        })
        .then(data => {
            const tbody = document.getElementById("alertsBody");
            const count = document.getElementById("alert-count");

            if (!data.length) {
                tbody.innerHTML = `<tr class="empty-row"><td colspan="5">No fraud alerts found.</td></tr>`;
                count.textContent = 0;
                updateStats(data, null);
                return;
            }

            tbody.innerHTML = "";
            data.forEach(alert => {
                const level = String(alert.risk_level || "").toLowerCase();
                const rowClass = level === "high" ? "row-high" : level === "medium" || level === "med" ? "row-medium" : "row-low";
                const tr = document.createElement("tr");
                tr.className = rowClass;
                tr.innerHTML = `
          <td><span style="font-family:var(--font-mono);font-size:0.82rem;color:var(--muted)">#${alert.alert_id}</span></td>
          <td>${alert.reason}</td>
          <td>${riskBadge(alert.risk_level)}</td>
          <td style="font-family:var(--font-mono)">₹${Number(alert.amount).toLocaleString("en-IN")}</td>
          <td>${alert.location}</td>
        `;
                tbody.appendChild(tr);
            });

            count.textContent = data.length;
            updateStats(data, null);
        })
        .catch(err => {
            document.getElementById("alertsBody").innerHTML =
                `<tr class="empty-row"><td colspan="5" style="color:var(--danger)">✗ ${err.message}</td></tr>`;
        });
}

/* ── Load Transactions ──────────────────────────── */
function loadTransactions() {
    fetch(`${BASE_URL}/transactions`)
        .then(res => {
            if (!res.ok) throw new Error(`Server error: ${res.status}`);
            return res.json();
        })
        .then(data => {
            const tbody = document.getElementById("transactionsBody");
            const count = document.getElementById("txn-count");

            if (!data.length) {
                tbody.innerHTML = `<tr class="empty-row"><td colspan="5">No transactions found.</td></tr>`;
                count.textContent = 0;
                updateStats(null, data);
                return;
            }

            tbody.innerHTML = "";
            data.forEach(txn => {
                const tr = document.createElement("tr");
                const typeColor = txn.transaction_type === "debit" ? "var(--danger)" : "var(--success)";
                tr.innerHTML = `
          <td><span style="font-family:var(--font-mono);font-size:0.82rem;color:var(--muted)">#${txn.transaction_id}</span></td>
          <td>${txn.account_id}</td>
          <td style="font-family:var(--font-mono)">₹${Number(txn.amount).toLocaleString("en-IN")}</td>
          <td><span style="color:${typeColor};font-weight:600;text-transform:capitalize">${txn.transaction_type}</span></td>
          <td>${txn.location}</td>
        `;
                tbody.appendChild(tr);
            });

            count.textContent = data.length;
            updateStats(null, data);
        })
        .catch(err => {
            document.getElementById("transactionsBody").innerHTML =
                `<tr class="empty-row"><td colspan="5" style="color:var(--danger)">✗ ${err.message}</td></tr>`;
        });
}

/* ── Clear Tables ───────────────────────────────── */
function clearTables() {
    document.getElementById("alertsBody").innerHTML =
        `<tr class="empty-row"><td colspan="5">Cleared. Click "Load Fraud Alerts" to reload.</td></tr>`;
    document.getElementById("transactionsBody").innerHTML =
        `<tr class="empty-row"><td colspan="5">Cleared. Click "Load Transactions" to reload.</td></tr>`;
    document.getElementById("alert-count").textContent = 0;
    document.getElementById("txn-count").textContent = 0;
}
function addTransaction() {
    const amount = document.getElementById("amount").value;
    const type = document.getElementById("transaction_type").value;
    const location = document.getElementById("location").value;

    fetch("http://localhost:5000/add-transaction", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            amount,
            type,
            location
        })
    })
    .then(res => res.text())
    .then(data => {
        document.getElementById("form-feedback").innerText = data;
    })
    .catch(err => console.log(err));
}
