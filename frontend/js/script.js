/* =========================================
   REGISTER FORM
========================================= */

const registerForm =
    document.getElementById("registerForm");


if (registerForm) {

    registerForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            /* Get form values */

            const name =
                document.getElementById("name").value.trim();


            const email =
                document.getElementById("registerEmail").value.trim();


            const accountType =
                document.getElementById("accountType").value;


            const branch =
                document.getElementById("branch").value;


            const subject =
                document.getElementById("subject").value;


            const password =
                document.getElementById("registerPassword").value;


            const confirmPassword =
                document.getElementById("confirmPassword").value;



            /* Check common fields */

            if (
                name === "" ||
                email === "" ||
                accountType === "" ||
                password === "" ||
                confirmPassword === ""
            ) {

                alert("Please fill all the required fields.");

                return;

            }



            /* Check student branch */

            if (
                accountType === "student" &&
                branch === ""
            ) {

                alert("Please select your branch.");

                return;

            }



            /* Check teacher subject */

            if (
                accountType === "teacher" &&
                subject === ""
            ) {

                alert("Please select your teaching subject.");

                return;

            }



            /* Check passwords */

            if (password !== confirmPassword) {

                alert("Passwords do not match.");

                return;

            }



            /* Get existing users */

            let users =
                JSON.parse(
                    localStorage.getItem("sdUsers")
                ) || [];



            /* Check duplicate email */

            const existingUser =
                users.find(
                    function(user) {

                        return user.email === email;

                    }
                );


            if (existingUser) {

                alert(
                    "An account with this email already exists."
                );

                return;

            }



            /* Create new user */

            const newUser = {

                name: name,

                email: email,

                password: password,

                role: accountType,

                branch:
                    accountType === "student"
                        ? branch
                        : "",

                subject:
                    accountType === "teacher"
                        ? subject
                        : ""

            };



            /* Add user */

            users.push(newUser);



            /* Save users */

            localStorage.setItem(
                "sdUsers",
                JSON.stringify(users)
            );



            /* Success message */

            alert(
                "Account created successfully!\n\n" +
                "Welcome, " + name + "!"
            );



            /* Go to login */

            window.location.href =
                "login.html";

        }
    );

}



/* =========================================
   LOGIN FORM
========================================= */

const loginForm =
    document.getElementById("loginForm");


if (loginForm) {

    loginForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();



            /* Get login values */

            const email =
                document.getElementById("email").value.trim();


            const password =
                document.getElementById("password").value;


            const role =
                document.getElementById("role").value;



            /* Check fields */

            if (
                email === "" ||
                password === "" ||
                role === ""
            ) {

                alert("Please fill all the fields.");

                return;

            }



            /* Get users */

            const users =
                JSON.parse(
                    localStorage.getItem("sdUsers")
                ) || [];



            /* Find matching user */

            const user =
                users.find(
                    function(user) {

                        return (
                            user.email === email &&
                            user.password === password &&
                            user.role === role
                        );

                    }
                );



            /* Invalid login */

            if (!user) {

                alert(
                    "Invalid email, password, or account type.\n\n" +
                    "Please check your details."
                );

                return;

            }



            /* Save logged-in user */

            localStorage.setItem(
                "sdLoggedInUser",
                JSON.stringify(user)
            );



            /* Success */

            alert(
                "Login successful!\n\n" +
                "Welcome, " + user.name + "!"
            );



            /* Redirect */

            if (role === "student") {

                window.location.href =
                    "student-dashboard.html";

            }

            else if (role === "teacher") {

                window.location.href =
                    "teacher-dashboard.html";

            }

        }
    );

}