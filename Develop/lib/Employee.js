// TODO: Write code to define and export the Employee class
class Employee{
    constructor(name, ID, eMail){
        this.name = name;
        this.ID = ID;
        this.eMail = eMail;
    }
        getName(){
            return this.name;
        };
        getID(){
            return this.ID;
        };
        getEmail(){
            return this.eMail;
        }
        getRole(){
            return "Employee";
        }
}

module.exports = {Employee : Employee};