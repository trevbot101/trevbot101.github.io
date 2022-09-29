var btn = document.getElementById("btn1");
btn.addEventListener("click",f);

function f() {
    var a = Number(document.getElementById("input1").value);
    var b = Number(document.getElementById("input2").value);
    var c = Number(document.getElementById("input3").value);


        var max;
        if (a > b) {
            max = a;
        } else {
            max = b;
        }
        if (c > max) {
            max = c;
        }

    
    document.getElementById("output").innerHTML = max;}


