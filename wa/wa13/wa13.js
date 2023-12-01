var obj = new Object();
//Problem 1

var Sam = new Object();
var Mary = new Object();
var Bill = new Object();
Sam.name = "Sam";
Sam.department = "Tech";
Sam.designation = "Manager";
Sam.salary = 40000;
Sam.raise = true;

Mary.name = "Mary";
Mary.department = "Finance";
Mary.designation = "Trainee";
Mary.salary = 18500;
Mary.raise = true;

Bill.name = "Bill";
Bill.department = "HR";
Bill.designation = "Executive";
Bill.salary = 21200;
Bill.raise = false;

console.log(Sam);
console.log(Mary);
console.log(Bill);

//Problem 2
obj.companyName = "Tech Stars";
obj.website = "www.techstars.site";
obj.employees = [Sam,Mary,Bill];

console.log(obj);

//Problem 3
var Anna = new Object();
Anna.name = "Anna";
Anna.department = "Tech";
Anna.designation = "Executive";
Anna.salary = 25600;
Anna.raise = false;

obj.employees.push(Anna);

console.log(obj);

//Probelm 4
var total = 0;
for(employee of obj.employees){
    total += employee.salary;
}
console.log(total);

//Problem 5;
for(employee of obj.employees){
    if(employee.raise)
    {
        console.log("old "+employee.salary);
        employee.salary *= 1.1;
        employee.raise = false;
        console.log("new "+employee.salary);
    }
};

//Problem 6;
const wfh = ['Anna','Sam'];
for(employee of obj.employees){
    if(wfh.includes(employee.name)){
        employee.wfh = true;
    }
    else{
        employee.wfh = false;
    }
};
console.log(obj.employees);




