let cost = [5.50, 7.25, 6.80, 9.50, 3.25];
let quantity = [0, 0, 0, 0, 0];
let total_cost = 0;
let tax = 0;
let final_cost = 0;

let firstName = "";
let lastName = "" ;
let street = "";
let city = "";
let phone = "";
let is_delivery = false;

//as soon as document loads
$(document).ready(function (){
    $("p[class='userInfo address']").hide();
    var radios = $("[name='p_or_d']");
    var pickup =  radios[0];
    var deliver = radios[1];
    pickup.addEventListener("click", function (){
        radioCheck(pickup, deliver);
    })
    deliver.addEventListener("click", function (){
        radioCheck(pickup, deliver);
    })

    //add listeners to all food
    for(let i = 0; i < 5; i ++) {
        $('select[name="quan' + i.toString() + '"]').change(function (){
            quantity[i] = this.value;
            calculate_costs();
        })
    }

    $('input[name="fname"]').change(function (){
        firstName = this.value;
    })

    $('input[name="lname"]').change(function (){
        lastName = this.value;
    })

    $('input[name="street"]').change(function (){
        street = this.value;
    })

    $('input[name="city"]').change(function (){
        city = this.value;
    })

    $('input[name="phone"]').change(function (){
        phone = this.value;
    })

    $('input[type=button]').click(function (){
        if(validate()) {
            checkOut();
        } else {

        }
    })


})


//handles the showing and hiding of street and city
//depending on whether its pickup or delivery
function radioCheck(pick, del){
    if(pick.checked === true) {
        is_delivery = false;
        $("p[class='userInfo address']").fadeOut();
    } else if(del.checked === true){
        is_delivery = true;
        $("p[class='userInfo address']").fadeIn();
    }
}


//to calculate costs...
function calculate_costs(){
    total_cost = 0;
    tax = 0;
    for(let i = 0; i < 5; i++){
        let foodCost = quantity[i] * cost[i];
        $("input[name=cost]").eq(i).val(foodCost.toFixed(2));
        total_cost += quantity[i] * cost[i];
    }
    tax += 0.0625 * total_cost;
    final_cost = total_cost + tax;

    $("input[name=subtotal]").val(total_cost.toFixed(2));
    $("input[name=tax]").val((tax.toFixed(2)));
    $("input[name=total]").val((final_cost.toFixed(2)));
}


// this function returns true if all input boxes are filled
// and total_cost > 0
function validate(){
    if(total_cost === 0) {
        alert("Buy something!");
    }
    let first_name = $('input[name="fname"]');
    let last_name = $('input[name="lname"]');
    let street_el = $('input[name="street"]');
    let city_el = $('input[name="city"]');
    let phone_el = $('input[name="phone"]');

    if(total_cost!==0 && is_delivery && firstName!=="" && lastName!=="" && street!=="" &&
        city!=="" && validatePhone(phone)) {
        resetStyle(first_name);
        resetStyle(last_name);
        resetStyle(street_el);
        resetStyle(city_el);
        resetStyle(phone_el);
        alert("Thank you for your order!");
        return true;
    } else if(total_cost!==0 && !is_delivery && firstName!=="" &&
        lastName!=="" && validatePhone(phone)) {
        resetStyle(first_name);
        resetStyle(last_name);
        resetStyle(phone_el);
        alert("Thank you for your order!");
        return true;
    }

    if(firstName === "") {
        first_name.css("border", "1px solid red");
        first_name.effect("shake", {times:2}, 200);
    } else {
        resetStyle(first_name);
    }

    if(lastName === "") {
        last_name.css("border", "1px solid red");
        last_name.effect("shake", {times:2}, 200);
    }
    else {
        resetStyle(last_name);
    }

    if(street === "") {
        street_el.css("border", "1px solid red");
        street_el.effect("shake", {times:2}, 200);
    } else {
        resetStyle(street_el);
    }

    if(city === "") {
        city_el.css("border", "1px solid red");
        city_el.effect("shake", {times:2}, 200);
    } else {
        resetStyle(city_el);
    }

    if(phone === "") {
        phone_el.css("border", "1px solid red");
        phone_el.effect("shake", {times:2}, 200);
    } else {
        resetStyle(phone_el);
    }

    return false;
}

function validatePhone(num){
    if(num!=="" && (num.length === 7 || num.length === 10)){
        return true;
    } else {
        alert("Please enter a 7 or 10 digit phone number");
    }
}

//resets the boxes to normal color
function resetStyle(element){
    element.css("border", "1px solid black");
}

function calcTime(){
    let now = new Date();
    let fifteenMinutesLater = new Date(now.getTime() + (15 * 60 * 1000));
    let fortyFiveMinutesLater = new Date(now.getTime() + (45 * 60 * 1000));
    // console.log(fifteenMinutesLater);
    // console.log(fifteenMinutesLater.getHours());
    // console.log(fifteenMinutesLater.getMinutes());
    if(is_delivery) {
        let hour = fortyFiveMinutesLater.getHours();
        let minute = fortyFiveMinutesLater.getMinutes();
        if(minute.toString().length === 1) {
            minute = "0" + minute;
        }
        return (hour + ":" + minute + " (45 mins)");
    } else {
        let hour = fifteenMinutesLater.getHours();
        let minute = fifteenMinutesLater.getMinutes();
        if(minute.toString().length === 1) {
            minute = "0" + minute;
        }
        return (hour + ":" + minute + " (15 mins)");
    }

}


//handles check out page
function checkOut(){
    let new_win = window.open('_blank');
    new_win.document.write("<h1>Order Summary</h1>");
    new_win.document.title = 'Order summary';
    new_win.document.write("<link rel='stylesheet' href='style.css'>");
    for (let i = 0; i < 5; i++) {
        new_win.document.write("<h4>" + quantity[i] + ' x ' + menuItems[i].name + ": $" +
            (menuItems[i].cost * quantity[i]).toFixed(2) + "</h4>");
    }

    new_win.document.write("<br><br><br><br>")
    // new_win.document.write("<div class='line'></div>");
    new_win.document.write("<h4> Subtotal: $" + total_cost.toFixed(2) + "</h4>");
    new_win.document.write("<h4> Tax: $" + tax.toFixed(2) + "</h4>");
    new_win.document.write("<h4> Total Cost: $" + final_cost.toFixed(2) + "</h4>");
    // new_win.document.write("<h4> Estimate Completion Time: " + get_time(is_delivery ? 40 : 20) +
    //     "</h4>");
    new_win.document.write("<h4> Estimated time: " + calcTime());
}

