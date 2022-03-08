var currentUser;
var db = [];

function setDB() {
    var str = localStorage.getItem('db');
    if (str != null) {
        var i = 0;
        var j = 0;
        var gap = "";
        var user = [];
        while(i <= str.length) {
            gap = "";
            while(str.charAt(i) != ',' && i <= str.length) {
                gap += str.charAt(i);
                i++;
            }
            i++;
            if (j == 0 || j > 6)
                gap = parseInt(gap);
            user.push(gap);
            j++;
            if (j == 15) {
                db.push(user);
                user = [];
                j = 0;
            }
        }
    }
}

function setLocalDb() {
    localStorage.setItem('db', db);
}

function setLocalId(id) {
    localStorage.setItem('id', id);
}

var inputsSorted = [];

document.addEventListener("DOMContentLoaded", function(e) {
    setDB();
    currentUser = localStorage.getItem('id');
    if (currentUser != null && currentUser != 'null') {
        setAvatar();

        var inputs = document.getElementsByClassName("quantity");
        var buttons = document.getElementsByClassName("btn");

        for (var i = 1; i < inputs.length; i++) {
            inputsSorted.push(inputs[i]);
        }
        inputsSorted.push(inputs[0]);

        var buttonsSorted = [];
        for (var i = 1; i < buttons.length; i++) {
            buttonsSorted.push(buttons[i]);
        }
        buttonsSorted.push(buttons[0]);

        for (var i = 0; i < inputsSorted.length; i++) {
            setField(inputsSorted[i], i + 1);
            addEvent(buttonsSorted[i], i);
        }
    }

    var table = document.getElementById("table");
    var coalTitles = ["Antracite", "Coal", "Brown coal", "Charcoal"];
    var coalPrices = [
        [3, 2, 3, 3],
        [2, 1, 2, 2]
    ];

    var trh = document.createElement('tr');
    var th1h = document.createElement('th');
    var th2h = document.createElement('th');
    var th3h = document.createElement('th');

    th1h.innerHTML = "Quantity";
    th2h.innerHTML = "Price";

    trh.appendChild(th3h);
    trh.appendChild(th1h);
    trh.appendChild(th2h);
    table.appendChild(trh);

    var sum1 = 0;
    var sum2 = 0;
    for (var i = 0; i < 4; i++) {
        var tr = document.createElement('tr');
        var th1 = document.createElement('th');
        var th2 = document.createElement('th');
        var th3 = document.createElement('th');
        var quant = parseInt(db[currentUser][7 + i]);
        var supplies = parseInt(db[currentUser][11 + i]);
        if (!supplies)
            supplies = 0;
        var prefix = coalPrices[supplies][i];

        if (!quant)
            quant = 0;
        if (!supplies && supplies != 0)
            prefix = 0;

        th1.innerHTML = coalTitles[i];
        th2.innerHTML = quant;
        th3.innerHTML = quant * prefix + '$';

        sum1 += quant;
        sum2 += quant * prefix;

        tr.appendChild(th1);
        tr.appendChild(th2);
        tr.appendChild(th3);

        if (i % 2 == 0)
            tr.style.backgroundColor = "gray";

        table.appendChild(tr);
    }
    
    var trf = document.createElement('tr');
    var th1f = document.createElement('th');
    var th2f = document.createElement('th');
    var th3f = document.createElement('th');

    th1f.innerHTML = sum1;
    th2f.innerHTML = sum2 + '$';

    trf.style.backgroundColor = "gray";

    trf.appendChild(th3f);
    trf.appendChild(th1f);
    trf.appendChild(th2f);
    table.appendChild(trf);
});

function isEmailGood(email) {
    var str = email.slice(email.indexOf("@"), email.length);
    if (str == "@gmail.com" || str == "@mail.ru")
        return true;
    return false;
}

function isLoginExist(login) {
    var exist = false;
    db.forEach(user => {
        if (user[1].toString() == login.toString()) exist = true;
    });
    return exist;
}

function isEmailExist(email) {
    var exist = false;
    db.forEach(user => {
        if (user[4].toString() == email.toString()) exist = true;

    });
    return exist;
}

function addEvent(button, i) {
    button.addEventListener("click", function(e) {
        var accept = true;
        if (i == 0)
            accept = !isLoginExist(inputsSorted[i].value);
        if (i == 3)
            accept = isEmailGood(inputsSorted[i].value) && !isEmailExist(inputsSorted[i].value);
        if (accept) {
            accepty(i + 1, inputsSorted[i].value);
        } else {
            alert("Some field inputted wrong! or This email is already taken!");
        }
    });
}

function setField(field, i) {
    field.value = db[currentUser][i];
}

function accepty(i, val) {
    db[currentUser][i] = val;
    setLocalDb();
}

function setLocalDb() {
    localStorage.setItem('db', db);
}

function setAvatar() {
    var avatar = document.getElementById("avatar-profile");
    avatar.style.height = window.innerHeight * parseFloat(avatar.style.width.toString().slice(0, 2)) / 100;
    avatar.style.width = avatar.style.height;
    var src = db[currentUser][6];
    if (src != "image")
        avatar.src = src;
}