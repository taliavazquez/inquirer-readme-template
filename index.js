const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');

const writeFileAsync = util.promisify(fs.writeFile);

// array of questions for user
function promptUser() {
    return inquirer.prompt([
        {
            type: "input",
            message: "Project Name:",
            name: "title"
        },
       
    ]);
}

function generateMarkdown(response) {
    return `
# ${response.title}
# Table of Contents
- [Description](#description)
- [Installation](#installation)
- [Usage](#usage) 
- [Credits](#credits)
- [License](#license) 
- [Badges](#license) 
- [Contributing](#contributing) 
- [Tests](#tests)
- [Example](#example)
## Description:
![License](https://img.shields.io/badge/License-${response.license}-yellow.svg)
    ${response.description}
## Installation:
    ${response.installation}
## Usage:
    ${response.usage}
## Contributing:
    ${response.contribution}
## Test:
    ${response.test}
## Credits:
    ${response.credit}
## License:
    For more information about the License, click on the link below.
    
- [License](https://opensource.org/licenses/${response.license})
## Questions:
    For questions about the Generator you can go to my 
    GitHub page at the following Link: 
- [GitHub Profile](https://github.com/${response.username})
For additional questions please reach out to my email at: ${response.email}
`;
}

// function to initialize program
async function init() {
    try {
        const response = await promptUser();

        const readMe = generateMarkdown(response);

        await writeFileAsync("README.md", readMe);
        console.log("Success!");
    } catch (err) {
        console.log(err);
    }
}

// function call to initialize program
init();