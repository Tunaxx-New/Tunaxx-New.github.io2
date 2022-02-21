var signIn = document.getElementById("l1");
var signUp = document.getElementById("l2");

var db = [];

function isLoginExist(login) {
    var exist = false;
    db.forEach(user => {
        if (user[1].toString() == login.toString()) exist = true;
    });
    return exist;
}

var UsesrDB = [["Vasily", "Trotsky", "vasya123@mail.ru","1"], ["Eldiyar", "Zhantileuov", "Zhantileuov.Eldiyar@astanait.edu.kz", "Qwerty123/.,"], ["Islambek", "Turarbaev", "211675@astana.edu.kz", "0000"]];


function isEmailExist(email) {
    var exist = false;
    UsesrDB.forEach(user => {
        if (user[2].toString() == email.toString()) exist = true;

    });
    return exist;
}

function isPasswordCorrect(password) {
    var exist = false;
    UsesrDB.forEach(user => {
        if (user[3].toString() == password.toString()) exist = true;

    });
    return exist;
}

function getName(Email) {
    var userName;
    UsesrDB.forEach(user => {
        if (user[2].toString() == Email.toString()) userName = user[0];
    });
    return userName;
}

function getSurname(Email) {
    var userSurname;
    UsesrDB.forEach(user => {
        if (user[2].toString() == Email.toString()) userSurname = user[1];
    });
    return userSurname;
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
          console.log(isEmailExist(user[0]));
          if(isEmailExist(user[0].toString())) {
            console.log(isPasswordCorrect(user[1]));
            if(isPasswordCorrect(user[1])) {
              alert("Welcome back " + getName(user[0]) + getSurname(user[0]) + "!");
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

            if (document.getElementById("exampleInputPassword2").value == user[5]) {
                var error = "Please fill the fields: ";
                if (user[1] == "") error += "First name ";
                if (user[2] == "") error += "Last name ";
                if (user[3] == "") error += "Date of Born ";
                if (user[4] == "") error += "Email ";
                if (user[5] == "") error += "Password ";

                if (error == "Please fill the fields: ") {
                    console.log(isLoginExist(user[1]));
                    if (isLoginExist(user[1])) {
                        alert("This name is already taken! ");
                    } else {
                        alert("User: " + user.toString() + " added successfully!");
                        db.push(user);
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