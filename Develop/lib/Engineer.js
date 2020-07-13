// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
const Employee = require("./Employee")
class Engineer extends Employee.Employee{
    constructor(name, ID, eMail, github){
        super(name, ID, eMail);
        this.gitHub = github;
    }
    getGitHub(){
            return this.gitHub;
    }
    getRole(){
            return "Engineer";
    }
}

module.exports = {Engineer : Engineer};