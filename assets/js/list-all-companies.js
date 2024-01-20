// JavaScript file that implement logic for list-all-companies.html

import { CompanyAPI } from "/assets/js/companyAPI.js"

window.onload = (e) => {
    document.getElementById('get-all-companies-button')?.addEventListener('click', LoadTable);
    document.getElementById('clear-all-companies-button')?.addEventListener('click', ClearTable);
    document.getElementById('home-button')?.addEventListener('click', () => { window.location.href = '/index.html' });
    ClearTable();
}

async function LoadTable() {
    const companies = await CompanyAPI.GetAllCompanies();
    if (!companies) {
        console.error('Could not load companies.')
        return;
    }

    const table = document.getElementById('company-table');
    if (!table) {
        console.error('Could not find company table.')
        return;
    }

    // Construct table rows for email data

    /*
        The idea is to get the emails from the backend as JSON:
        [
            {
                "id": 1,
                "subject": "Email 1",
                "body": "This is a first email",
                "sender": "john@gmail.com",
                "receiver": "mary@gmail.com",
                "timestamp": "13.2.2023 13:30:33"
            },
            {
                "id": 2,
                "subject": "Email 2",
                "body": "This is a second email",
                "sender": "mary@gmail.com",
                "receiver": "john@gmail.com",
                "timestamp": "13.2.2023 13:45:54"
            }
        ]

        And manually create and insert HTML for that data into <table> tag:

        <thead>
            <tr>
                <th>ID</th>
                <th>Subject</th>
                <th>Body</th>
                <th>Sender</th>
                <th>Receiver</th>
                <th>Timestamp</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>1</td>
                <td>Email 1</td>
                <td>This is a first email</td>
                <td>john@gmail.com</td>
                <td>mary@gmail.com</td>
                <td>13.2.2023 13:30:33</td>
            </tr>
            <tr>
                <td>2</td>
                <td>Email 2</td>
                <td>This is a second email</td>
                <td>mary@gmail.com</td>
                <td>john@gmail.com</td>
                <td>13.2.2023 13:45:54</td>
            </tr>  
        </tbody>

    */

    ClearTable();

    let table_body = table.getElementsByTagName('tbody')?.[0];
    if (!table_body) {
        console.error('Could not find <tbody> in company table!');
        return;
    }

    // Add each row manually
    companies.forEach(e => {
        const row = document.createElement('tr');
        row.addEventListener('dblclick', () => { DeleteCompany(e.Id) });

        const lstReceivers = e.receivers.join('<br>')

        row.innerHTML = `
                <td>${e.Id}</td>
                <td>${e.CompanyName}</td>
                <td>${e.OwnerName}</td>
                <td>${e.Revenue}</td>
        `
        table_body.appendChild(row)
    });

}

function ClearTable() {
    const table = document.getElementById('company-table');
    if (!table) {
        console.error('Could not find company table.')
        return;
    }
    table.innerHTML = `
    <thead>
        <tr>
            <th>Id</th>
            <th>CompanyName</th>
            <th>OwnerName</th>
            <th>Revenue</th>
        </tr>
    </thead>
    <tbody>

    </tbody>
    `;
}

export function DeleteCompany(companyId) {
    alert(`Deleting company with ID = ${companyId}`);
    CompanyAPI.DeleteCompany(companyId);
    ClearTable();
    LoadTable(); // Reload table
}