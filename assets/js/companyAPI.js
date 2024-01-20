const Base_URL = 'http://localhost:5263'

class _CompanyAPI {

    async GetAllCompanies() {
        const URL = `${Base_URL}/api/Company`;
        const response = await fetch(URL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            console.error('Could not get companies from the API!')
            return null;
        }

        return response.json();
    }

    // Returns true if successful and false if failed
    async CreateNewCompany(company) {
        const URL = `${Base_URL}/api/Company`;
        const response = await fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(company)
        });

        if (!response.ok) {
            console.error('Could not create new company.')
            if (response.status === 400) { /* Bad Request */
                alert(await response.text())
            }
            return false;
        }

        return true;
    }

    async DeleteCompany(id) {
        const URL = `${Base_URL}/api/Company/${id}`;
        const response = await fetch(URL, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            console.error(`Could not delete company with id = ${id}.`)
            if (response.status === 400) { /* Bad Request */
                alert(await response.text())
            }
        }
    }

}

export const CompanyAPI = new _CompanyAPI();