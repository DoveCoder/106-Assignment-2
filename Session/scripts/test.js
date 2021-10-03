

function sayHello(name) {
    
    if (!name) 
    {
        return "error";
    }
    else
    {
        console.log("Hello " + name);
        return "hi there: " + name;
    }
}

function testFn() 
{
    let x = "Julian";
    let result = sayHello(x);
    console.log(result);
}

testFn();

// function travel(city) 
// {
//     return "traveling to " + city;
// }

let travel = city => 
{
    "traveling to " + city;
}

let t1 = travel("Monaco\n");
let t2 = travel("Rome");
console.log(t1, t2);

function Dog(name, a) 
{
    this.name = name;
    this.age = a;
    this.owner = "Julian";
}

// let dog1 = new Dog("Scooby", 60);

function testObject()
{
    let fido = new Dog("Fido", 4);
    console.log(fido);
}

function testReq() {
    $.ajax({
        type: "GET",
        url:"http://restclass.azurewebsites.net/api/test",
        success: function(res) {
            console.log("Request OK", res);
        }
        error: function(error) {
           console.error("Request failed :(", error) 
        }
    });
}