// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
const Employee = require("./Employee");

class Manager extends Employee.Employee{

    constructor(name, ID, eMail, officeNum){
        super(name, ID, eMail);
        this.officeNum = officeNum;
    }
    getOfficeNum(){
        return this.officeNum;
    }
    getRole(){
        return "Manager";
    } 
}

module.exports = {Manager: Manager};