// JavaScript file that implement logic for write-new-company.html

import { CompanyAPI } from "/assets/js/companyAPI.js"

window.onload = (e) => {
    document.getElementById('home-button')?.addEventListener('click', () => { window.location.href = '/index.html' });
    document.getElementById('clear-all-fields-button')?.addEventListener('click', OnClearButtonClick);
    document.getElementById('create-company-button')?.addEventListener('click', OnSendCompanyButonClick);
}

function OnClearButtonClick() {
    document.getElementById('CompanyName').value = '';
    document.getElementById('OwnerName').value = '';
    document.getElementById('Revenue').value = '';
}

async function OnSendCompanyButonClick() {
    let company = {};

    const sender = document.getElementById('CompanyName');
    if (!CompanyName) {
        alert('Company name field is empty!')
        return;
    }
    company.CompanyName = CompanyName.value;

    const receivers = document.getElementById('OwnerName');
    if (!OwnerName) {
        alert('Owner name field is empty!')
        return;
    }

    company.OwnerName = OwnerName.value.split(';');

    const subject = document.getElementById('Revenue');
    if (!Revenue) {
        alert('Revenue field is empty!')
        return;
    }
    company.Revenue = Revenue.value;

    // // Body can be empty
    // const body = document.getElementById('subject');
    // if (body) {
    //     email.body = body.value;
    // }

    const success = await CompanyAPI.CreateNewCompany(company);
    if (success) {
        alert('Company successfully created')
        OnClearButtonClick();
    }

}