document.addEventListener("DOMContentLoaded", function () {
  auth.onAuthStateChanged((user) => {
    // Note the change here
    if (user) {
      document.getElementById("login1").style.display = "none";
      document.getElementById("getStarted1").style.display = "none";
      document.getElementById("login2").style.display = "none";
      document.getElementById("getStarted2").style.display = "none";
      document.getElementById("dashboard1").style.display = "block";
      document.getElementById("dashboard2").style.display = "block";
      console.log("user logged in");
      console.log(user);

      console.log("user logged in");
      console.log(user);
      var uid = user.uid;
      console.log(uid);
    } else {
      document.getElementById("dashboard1").style.display = "none";
      document.getElementById("dashboard2").style.display = "none";

      document.getElementById("login1").style.display = "block";
      document.getElementById("getStarted1").style.display = "block";
      document.getElementById("login2").style.display = "block";
      document.getElementById("getStarted2").style.display = "block";

      console.log("user logged out");
    }
  });

  // login
  const loginForm = document.querySelector("#login-form");
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    // get user info
    const email = loginForm["input-email"].value;
    const password = loginForm["input-password"].value;
    // log the user in
    auth
      .signInWithEmailAndPassword(email, password)
      .then((cred) => {
        // Redirect to the desired page after successful authentication
        window.location.href = "dashboard.html"; // Replace with your desired URL
      })
      .catch((error) => {
        console.error("Authentication failed:", error.message);
      });
  });

  // logout
  const logout = document.querySelector("#logoutUser");
  logout.addEventListener("click", (e) => {
    console.log("Iwas clicked");
    e.preventDefault();
    window.location.href = "login.html";
    auth.signOut();
  });
});
