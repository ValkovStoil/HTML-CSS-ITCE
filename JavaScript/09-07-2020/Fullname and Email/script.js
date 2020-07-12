class Employee {
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }

    fullName() {
        let fullName = `${this.firstName} ${this.lastName}`;
        return fullName
    }

    email() {
        let email = `${this.firstName}.${this.lastName}@abv.bg`;
        return email;
    }
}

let employee1 = new Employee("John", "Smith");
let employee2 = new Employee("Mary", "Sue");
let employee3 = new Employee("Antony", "Walker");

let employees = [];
employees.push(employee1);
employees.push(employee2);
employees.push(employee3);

employees.forEach(element => {
    console.log(element.fullName());
    console.log(element.email());
});

console.log(employee1.email());