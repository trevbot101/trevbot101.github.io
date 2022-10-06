document.getElementById("btn1").addEventListener('click', onClick);

function onClick () {
    var normal_pay = Number(document.getElementById("i1").value);
    var overt_pay = Number(document.getElementById("i2").value);
    var n_hours = Number(document.getElementById("i3").value);
    var hours_worked = Number(document.getElementById("i4").value);

    var earned_money;
    if (hours_worked <= n_hours) {
        earned_money = hours_worked * normal_pay;
    } else {
        earned_money = (hours_worked - n_hours)*overt_pay;
        earned_money += n_hours * normal_pay;
    }
    document.getElementById("output").innerHTML = earned_money + " Dollars.";
}