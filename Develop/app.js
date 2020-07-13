const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const Employee = require("./lib/Employee");
const { SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS } = require("constants");
const { lookup } = require("dns");
var teamArr = [];
// Questions specific to the manager
const mgrQuestions = [{type: "input", name: "name", message: "Enter Manager name: "},
{type: "input", name: "id", message: "Enter Manager ID #: "},
{type: "input", name: "email", message: "Enter Manger e-mail address: "},
{type: "input", name: "officeNumber", message: "Enter Manager office number: "}];

//Function specific to the manager
async function managerGen(){
    try{
    const {name, id, email, officeNumber, roll} = await inquirer.prompt(mgrQuestions); 
    const manager = new Manager(name, id, email, officeNumber);
    teamArr.push(manager);
    engOrInt();
    }
    catch{
        console.log("error");
    }

}

managerGen();

//Question to determine roll of next employee, this should be iterated until user opts out
const rollQ = [{type: "list", name: "roll", message: "Select  employee roll: ", choices: ["Engineer", "Intern"]}];

async function engOrInt(){
    const {roll} = await inquirer.prompt(rollQ);
    if(roll === "Engineer"){
        engineerGen();
    }
    else{
        internGen();
    }
}
//Questions for engineer 
const engQs = [{type: "input", name: "name", message: "Enter Engineer's name: "},
{type: "input", name: "id", message: "Enter Engineer's ID #: "},
{type: "input", name: "email", message: "Enter Engineer's e-mail address: "},
{type: "input", name: "Github", message: "Enter Engineer's GitHub profile URL: "}];
//Function for generating engineer card
async function engineerGen(){
    const {name, id, email, Github} = await inquirer.prompt(engQs);
    const engineer = new Engineer(name, id, email, Github);
    teamArr.push(engineer);
    isDone();
}
//Questions for Intern 
const internQs = [{type: "input", name: "name", message: "Enter Intern's name: "},
{type: "input", name: "id", message: "Enter Intern's ID #: "},
{type: "input", name: "email", message: "Enter Intern's e-mail address: "},
{type: "input", name: "school", message: "Enter Intern's school name: "}];
//Function for generating Intern card
async function internGen(){
    const {name, id, email, school} = await inquirer.prompt(internQs);
    const intern = new Intern(name, id, email, school);
    teamArr.push(intern);
    isDone();
}

const addMoreQ = [{type: "list", name: "addMore", message: "Would you like to add another employee? ", choices: ["Yes", "No"]}];
async function isDone(){
    const {addMore} = await inquirer.prompt(addMoreQ);
    if(addMore === "Yes"){
        engOrInt();
    }
    else{
        genHTML();
    }

}

// Function for generating HTML
async function genHTML(){
    try{
        const html = await render(teamArr);
        console.log(outputPath);
        fs.writeFileSync(outputPath, html);
        //window.open(outputPath);
    }
    catch{
        console.log("error");
    }
}

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
