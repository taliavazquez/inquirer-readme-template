const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');

const writeFileAsync = util.promisify(fs.writeFile);

// array of questions for user
function promptUser() {
    return inquirer.prompt([
       
        {
            type: "input",
            message: "Project Title?",
            name: "title"
        },
        {
            type: "input",
            message: `Description?`,
            name: "description"
        },
        {
            type: "input",
            message: "Provide install instructions for this project.",
            name: "installation"
        },
        {
            type: "input",
            message: "How will this be used?",
            name: "usage"
        },
        {
            type: "confirm",
            message: "Test with ~npm test?",
            name: "test"
        },
        {
            type: "input",
            message: "Who would you like to credit?",
            name: "credit"
        },
        {
            type: "checkbox",
            message: "Please select a license.",
            choices: [
                "Apache",
                "MIT",
                "ISC",
                "GNU GPLv3"
            ],  
            name: "license"
        },
        {
            type: "input",
            message: "Your email address:",
            name: "email"
        },
        {
            type: "input",
            message: "Your GitHub username:",
            name: "username"
        },
   
        {
            type: "emoji",
            message: `How do you feel about this project?`,
            name: "emoji"
          },
    ]);
}

function generateMarkdown(response) {
    return `
# ${response.title}
## Description:
![License](https://img.shields.io/badge/License-${response.license}-yellow.svg)
    ${response.description}
# Table of Contents
- [Installation](#installation)
- [Usage](#usage) 
- [Test] (#test)
- [Credits](#credits)
- [License](#license) 
- [Questions](#questions) 

## Installation:
    ${response.installation}
## Usage:
    ${response.usage}
## Test
Can you test this with npm test?
    ${response.test}
## Credits:
    ${response.credit}
## License:
- [License](https://opensource.org/licenses/${response.license})
## Questions:
Feel free to reach out to me with any questions, contact me via email. ${response.email}
- [GitHub Profile](https://github.com/${response.username})
`;
}

// function to initialize program
async function init() {
    try {
        const response = await promptUser();
        const readMe = generateMarkdown(response);
        await writeFileAsync("README.md", readMe);
        console.log("Your README.md is complete, and is in this directory, press <ls> to see it");
    } catch (err) {
        console.log(err);
    }
}

// function call to initialize program
init();