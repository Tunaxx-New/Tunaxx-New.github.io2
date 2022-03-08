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

function setImageUser() {
    db[currentUser][6] = "https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg";
    setLocalDb();
}
function setImageUser(url) {
    db[currentUser][6] = url;
    setLocalDb();
}

function setLocalDb() {
    localStorage.setItem('db', db);
}

function setLocalId(id) {
    localStorage.setItem('id', id);
}

document.addEventListener("DOMContentLoaded", function(e) {
    setDB();
    currentUser = localStorage.getItem('id');
    if (currentUser == null)
        alert("You are not logined!");

    if (currentUser != null && currentUser != 'null') {
        setName();
        setAvatar();
        setEmail();
    }
    setMenu();

    //Profile button
    var profile = document.getElementById("profile");
    if (currentUser != null && currentUser != 'null') {
        profile.addEventListener("click", function(e) {
            open("html/profile.html");
        });
    } else {
        profile.addEventListener("click", function(e) {
            alert("You are not logined!");
        });
    }
});

function setAvatar() {
    var avatar = document.getElementById("avatar");
    var src = db[currentUser][6];
    if (src != "image")
        avatar.src = src;
}

function setMenu() {
    var signin = document.getElementById("signin");
    if (currentUser != null && currentUser != 'null') {
        signin.innerHTML = "Log out";
        signin.addEventListener("click", function(e) {
            setLocalId(null);
            document.location.reload();
        });
    } else {
        signin.innerHTML = "Sign In";
        signin.addEventListener("click", function(e) {
            open("html/login.html");
        });
    }
}

function setName() {
    var name = document.getElementById("userName");
    name.innerHTML = db[currentUser][1] + " " + db[currentUser][2];
    if (db[currentUser][1] == "Islambek" && db[currentUser][2] == "Turarbaev") {
        name.innerHTML += " is Gay";
        setImageUser("https://st.kp.yandex.net/images/kadr/sm_3523808.jpg");
    }
}

function setEmail() {
    var emailInputs = document.getElementsByClassName("email");
    for (var i = 0; i < emailInputs.length; i++) {
        emailInputs[i].value = db[currentUser][4];
    }
}

function bought(i, quant, supp) {
    if (currentUser != null && currentUser != 'null') {
        db[currentUser][7 + i] += parseInt(quant.slice(0, quant.length - 3));
        if (!db[currentUser][7 + i])
            db[currentUser][7 + i] = parseInt(quant.slice(0, quant.length - 3));
        db[currentUser][11 + i] = supp;
        setLocalDb();
    } else {
        alert("This purchase not recorded in your profile!")
    }
}