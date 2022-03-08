var signIn = document.getElementById("l1");
var signUp = document.getElementById("l2");

// 0 - id
// 1 - First name
// 2 - Last name
// 3 - Born date
// 4 - Email
// 5 - password
// 6 - url to image;
var db = [];

if (db.length == 0)
    setDB();

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

function isPasswordCorrect(password) {
    var exist = false;
    db.forEach(user => {
        if (user[5].toString() == password.toString()) exist = true;

    });
    return exist;
}

function isEmailGood(email) {
    var str = email.slice(email.indexOf("@"), email.length);
    if (str == "@gmail.com" || str == "@mail.ru")
        return true;
    return false;
}

function getName(Email) {
    var userName;
    db.forEach(user => {
        if (user[4].toString() == Email.toString()) userName = user[1];
    });
    return userName;
}

function getSurname(Email) {
    var userSurname;
    db.forEach(user => {
        if (user[4].toString() == Email.toString()) userSurname = user[2];
    });
    return userSurname;
}

function getId(Email) {
    var id;
    db.forEach(user => {
        if (user[4].toString() == Email.toString()) id = user[0];
    });
    return id;
}

//Daniil's part
if (signIn != null) {
    signIn.addEventListener("click", function(e) {
        var user = [];
        user.push(document.getElementById("exampleInputEmail1").value);
        user.push(document.getElementById("exampleInputPassword1").value);

        var error = "Please fill the fields: ";
        if(user[0] == "") error += "Email ";
        if(user[1] == "") error += "Password ";

        if(error == "Please fill the fields: ") {
          if(isEmailExist(user[0].toString())) {
            console.log(isPasswordCorrect(user[1]));
            if(isPasswordCorrect(user[1])) {
              alert("Welcome back " + getName(user[0]) + getSurname(user[0]) + "!");
              setLocalId(getId(user[0]));
            } else {
              alert("Password is wrong!");
            }
          } else {
            alert("Email doesn't exist!");
          }
        } else {
          alert(error);
        }

    }, false);
}

//Nikita's part
if (signUp != null) {
    signUp.addEventListener("click", function(e) {
        var check = document.getElementById("customCheck1");
        if (check.checked) {
            var user = [];
            user.push(db.length);
            user.push(document.getElementById("FirstName").value.toString());
            user.push(document.getElementById("LastName").value.toString());
            user.push(document.getElementById("DateOfBorn").value);
            user.push(document.getElementById("exampleInputEmail1").value);
            user.push(document.getElementById("exampleInputPassword1").value);
            user.push("image");
            user.push("antra");
            user.push("coal");
            user.push("brown");
            user.push("char");
            user.push("s1");
            user.push("s2");
            user.push("s3");
            user.push("s4");

            if (document.getElementById("exampleInputPassword2").value == user[5]) {
                var error = "Please fill the fields: ";
                if (user[1] == "") error += "First name ";
                if (user[2] == "") error += "Last name ";
                if (user[3] == "") error += "Date of Born ";
                if (user[4] == "") error += "Email ";
                if (user[5] == "") error += "Password ";

                if (!isEmailGood(user[4])) 
                    error += "@gmail.com or @mail.ru";
                if (isEmailExist(user[4].toString()))
                    error += "This email is already taken!";

                if (error == "Please fill the fields: ") {
                    if (isLoginExist(user[1])) {
                        alert("This name is already taken! ");
                    } else {
                        alert("User: " + user.toString() + " added successfully!");
                        db.push(user);
                        setLocalDb();
                    }
                } else {
                    alert(error);
                }
            } else {
                alert("Repeat password correctly!");
            }
        } else {
            this.scrollTo(check);
            var shake = document.getElementById("shake");

            shake.classList.add("shakel");
            shake.addEventListener('animationend', () => {
                shake.classList.remove("shakel");
            });
        }



    }, false);
}

function setLocalDb() {
    localStorage.setItem('db', db);
}
function setLocalId(id) {
    localStorage.setItem('id', id);
}

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