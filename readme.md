# Challenge Automation NOS
This repository contains automated tests for both API and Web functionalities, developed using Playwright. The project follows best practices such as encrypted key handling, test isolation, and modularity. Additionally, Allure reporting is integrated for test result visualization.


## Prerequisites
Before starting, ensure you have the following installed:

Node.js (version 16 or later)
npm (Node Package Manager)
Playwright browsers (will be installed during setup)

## Installation
Clone the repository:
```
git clone https://github.com/yourusername/challenge-automation-nos.git
cd challenge-automation-nos

```

Install the dependecies:
```
npm install
```

Install Playwright browsers:
```
npx playwright install
```

Set up your .env file: Create a .env file in the root of the project and add the following content:
```
SECRET_KEY=7b5880f7-a781-4b39-9ceb-f8e3bfbce32d
```

## Running the Tests

### Run All Tests
To execute all tests (both API and Web):
``` 
npm test
```
### Run API Tests Only
To execute only the API tests:
```
npm test:api
```

### Run Web Tests Only
To execute only the Web tests:
```
npm run test:web
```

## Generating Reports
This project uses Allure Reporting to visualize test results. To generate and open the report:
````
npm run report
````

## Key Features
Encrypted Key: The SECRET_KEY is stored in a .env file and is logged in an encrypted format using SHA256 before each test. This ensures the key is not visible in the source code, adhering to security best practices.

Excel Data Input: The project reads test data directly from ./data/Datos-pruebas.xlsx using the readExcel utility. Each row represents a test case.

Allure Reporting: Integrated for generating detailed, visually appealing reports.

Playwright Projects: Tests are organized into separate API and Web projects for clarity and scalability.
