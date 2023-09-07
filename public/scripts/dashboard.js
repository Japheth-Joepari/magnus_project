document.addEventListener("DOMContentLoaded", () => {
  const logoutButton = document.getElementById("logoutUser");

  logoutButton.addEventListener("click", () => {
    console.log("clicked");
    firebase
      .auth()
      .signOut()
      .then(() => {
        // Sign-out successful
        console.log("User signed out");
        window.location.href = "login.html";
        // You can also redirect the user to a different page after logging out
        // window.location.href = "logout-success.html";
      })
      .catch((error) => {
        // An error happened while signing out
        console.error("Error signing out:", error);
      });
  });
  // Temperature
  const temperatureReading = document.getElementById("progressInput");
  const temperatureBar = document.querySelector(".progress-bar");
  const temperatureText = document.querySelector(".progress-text");
  const temperature = document.getElementById("tempSpan");

  temperatureReading.addEventListener("input", () => {
    const progressValue = temperatureReading.value.trim();
    if (progressValue === "") {
      temperatureBar.setAttribute("stroke-dasharray", "0 628");
      temperatureText.textContent = "0";
      temperature.textContent = "0";
    } else {
      const normalizedProgress = Math.max(
        0,
        Math.min(100, parseInt(progressValue))
      );
      const circumference = 2 * Math.PI * 65; // Circumference of the circle
      const strokeDashArray = (circumference * normalizedProgress) / 100;
      temperatureBar.setAttribute(
        "stroke-dasharray",
        `${strokeDashArray} ${circumference}`
      );
      temperatureText.textContent = `${normalizedProgress}`;
      temperature.textContent = `${normalizedProgress}`;
    }
  });

  // Blood Pressure
  const BpReading = document.getElementById("progressInput2");
  const bpBar = document.querySelector(".progress-bar2");
  const bpText = document.querySelector(".progress-text2");
  const bpSpan = document.getElementById("bpSpan");

  BpReading.addEventListener("input", () => {
    const progressValue = BpReading.value.trim();
    if (progressValue === "") {
      bpBar.setAttribute("stroke-dasharray", "0 628");
      bpText.textContent = "0";
      bpSpan.textContent = "0";
    } else {
      const normalizedProgress = Math.max(
        0,
        Math.min(100, parseInt(progressValue))
      );
      const circumference = 2 * Math.PI * 65; // Circumference of the circle
      const strokeDashArray = (circumference * normalizedProgress) / 100;
      bpBar.setAttribute(
        "stroke-dasharray",
        `${strokeDashArray} ${circumference}`
      );
      bpText.textContent = `${normalizedProgress}`;
      bpSpan.textContent = `${normalizedProgress}`;
    }
  });

  // BPM
  const bmpReading = document.getElementById("progressInput3");
  const bmpBar = document.querySelector(".progress-bar3");
  const bmpText = document.querySelector(".progress-text3");
  const bpmSpan = document.getElementById("bpmSpan");

  bmpReading.addEventListener("input", () => {
    const progressValue = bmpReading.value.trim();
    if (progressValue === "") {
      bmpBar.setAttribute("stroke-dasharray", "0 628");
      bmpText.textContent = "0";
      bpmSpan.textContent = "0";
    } else {
      const normalizedProgress = Math.max(
        0,
        Math.min(100, parseInt(progressValue))
      );
      const circumference = 2 * Math.PI * 65; // Circumference of the circle
      const strokeDashArray = (circumference * normalizedProgress) / 100;
      bmpBar.setAttribute(
        "stroke-dasharray",
        `${strokeDashArray} ${circumference}`
      );
      bmpText.textContent = `${normalizedProgress}`;
      bpmSpan.textContent = `${normalizedProgress}`;
    }
  });

  // STEP COUNT
  const stepReading = document.getElementById("progressInput4");
  const stepBar = document.querySelector(".progress-bar4");
  const stepText = document.querySelector(".progress-text4");
  const stepCountSpan = document.getElementById("stepCountSpan");

  stepReading.addEventListener("input", () => {
    const progressValue = stepReading.value.trim();
    if (progressValue === "") {
      stepBar.setAttribute("stroke-dasharray", "0 628");
      stepText.textContent = "0";
      stepCountSpan.textContent = "0";
    } else {
      const normalizedProgress = Math.max(
        0,
        Math.min(100, parseInt(progressValue))
      );
      const circumference = 2 * Math.PI * 65; // Circumference of the circle
      const strokeDashArray = (circumference * normalizedProgress) / 100;
      stepBar.setAttribute(
        "stroke-dasharray",
        `${strokeDashArray} ${circumference}`
      );
      stepText.textContent = `${normalizedProgress}`;
      stepCountSpan.textContent = `${normalizedProgress}`;
    }
  });

  // Slider 1
  const slider1 = document.getElementById("slider1");
  const sliderValue1 = document.getElementById("sliderValue1");

  slider1.addEventListener("input", () => {
    const value = slider1.value;
    sliderValue1.textContent = value + "%";
  });

  // Slider 2
  const slider2 = document.getElementById("slider2");
  const sliderValue2 = document.getElementById("sliderValue2");

  slider2.addEventListener("input", () => {
    const value = slider2.value;
    sliderValue2.textContent = value + "%";
  });

  var firebaseConfig = {
    apiKey: "AIzaSyByXsQCLIEkQhZPriC1eAVVBrkpux_tT4c",
    authDomain: "metric-app-35af1.firebaseapp.com",
    databaseURL:
      "https://metric-app-35af1-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "metric-app-35af1",
    storageBucket: "metric-app-35af1.appspot.com",
    messagingSenderId: "441748921527",
    appId: "1:441748921527:web:1eada8f734406fc4664132",
  };

  // Initialize firebase
  firebase.initializeApp(firebaseConfig);

  // Make auth and database references
  const auth = firebase.auth();
  const db = firebase.database();

  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // User is signed in, you can update UI or perform other actions
      console.log("User is authenticated:", user.displayName);
      document.getElementById("userMail").innerHTML =
        user.email.substring(0, 8) + "...";

      // get user UID to get data from database
      var uid = user.uid;
      console.log(uid);

      // Database paths (with user UID)
      var dbPathBtn1 = "UsersData/" + uid.toString() + "/outputs/digital/2";
      var dbPathBtn2 = "UsersData/" + uid.toString() + "/outputs/digital/12";
      var dbPathSlider1 = "UsersData/" + uid.toString() + "/outputs/pwm/13";
      var dbPathSlider2 = "UsersData/" + uid.toString() + "/outputs/pwm/14";
      var dbPathBmeTemp = "UsersData/" + uid.toString() + "/sensor/temperature";
      var dbPathBmeHum = "UsersData/" + uid.toString() + "/sensor/humidity";
      var dbPathBmePres = "UsersData/" + uid.toString() + "/sensor/pressure";
      var dbPathBloodPressure = "UsersData/" + uid.toString() + "/sensor/bp";
      var dbPathStepCount = "UsersData/" + uid.toString() + "/sensor/steps";
      var dbPathBeatAvg = "UsersData/" + uid.toString() + "/sensor/beatAvg";
      //   var dbPathInput1 = "UsersData/" + uid.toString() + "/outputs/message";

      //////// Button 1 - GPIO 2 ////////
      var btn1State = document.getElementById("btn1State");
      var dbBtn1 = firebase.database().ref().child(dbPathBtn1);

      // Button 1 - GPIO 2 - Update state message on web page
      dbBtn1.on("value", (snap) => {
        if (snap.val() == 1) {
          btn1State.innerText = "OFF";
        } else {
          btn1State.innerText = "ON";
        }
      });

      // Button 1 - GPIO 2 - Update database upon button click
      const btn1On = document.getElementById("btn1On");
      const btn1Off = document.getElementById("btn1Off");

      btn1On.onclick = () => {
        firebase.database().ref().child(dbPathBtn1).set(1);
      };
      btn1Off.onclick = () => {
        firebase.database().ref().child(dbPathBtn1).set(0);
      };

      ////////  Button 2 - GPIO 12 ////////
      var btn2State = document.getElementById("btn2State");
      var dbBtn2 = firebase.database().ref().child(dbPathBtn2);

      // Button 2 - GPIO 12 - Update state message on web page
      dbBtn2.on("value", (snap) => {
        if (snap.val() == 1) {
          btn2State.innerText = "OFF";
        } else {
          btn2State.innerText = "On";
        }
      });

      // Button 2 - GPIO 12 - Update database upon button click
      const btn2On = document.getElementById("btn2On");
      const btn2Off = document.getElementById("btn2Off");

      btn2On.onclick = () => {
        firebase.database().ref().child(dbPathBtn2).set(1);
      };
      btn2Off.onclick = () => {
        firebase.database().ref().child(dbPathBtn2).set(0);
      };

      // Sensor Readings - BME Temperature - Update web page with new values from database
      var dbBmeTemp = firebase.database().ref().child(dbPathBmeTemp);
      dbBmeTemp.on("value", (snap) => {
        // Celsius degrees
        const newTempValue = snap.val().toFixed(2);
        const normalizedProgress = Math.max(
          0,
          Math.min(100, parseInt(newTempValue))
        );
        const circumference = 2 * Math.PI * 65; // Circumference of the circle
        const strokeDashArray = (circumference * normalizedProgress) / 100;

        temperatureBar.setAttribute(
          "stroke-dasharray",
          `${strokeDashArray} ${circumference}`
        );
        temperatureText.textContent = `${normalizedProgress}ºC`;
        temperature.textContent = `${normalizedProgress}ºC`;
      });

      // Sensor Readings - Bloog Pressure - Update web page with new values from database
      var dbBmebp = firebase.database().ref().child(dbPathBloodPressure);
      dbBmebp.on("value", (snap) => {
        // Celsius degrees
        const newBpValue = snap.val().toFixed(2);
        console.log();
        const normalizedProgress = Math.max(
          0,
          Math.min(100, parseInt(newBpValue))
        );
        const circumference = 2 * Math.PI * 65; // Circumference of the circle
        const strokeDashArray = (circumference * normalizedProgress) / 100;

        bpBar.setAttribute(
          "stroke-dasharray",
          `${strokeDashArray} ${circumference}`
        );
        bpText.textContent = `${normalizedProgress}mmgh`;
        bpSpan.textContent = `${normalizedProgress}mmgh`;
      });

      // Sensor Readings - Step  Count - Update web page with new values from database
      var dbBmestep = firebase.database().ref().child(dbPathStepCount);
      dbBmestep.on("value", (snap) => {
        // Celsius degrees
        const newStepValue = snap.val().toFixed(2);
        console.log();
        const normalizedProgress = Math.max(
          0,
          Math.min(100, parseInt(newStepValue))
        );
        const circumference = 2 * Math.PI * 65; // Circumference of the circle
        const strokeDashArray = (circumference * normalizedProgress) / 100;

        stepBar.setAttribute(
          "stroke-dasharray",
          `${strokeDashArray} ${circumference}`
        );
        stepText.textContent = `${normalizedProgress}steps`;
        stepCountSpan.textContent = `${normalizedProgress}steps`;
      });

      // Sensor Readings - Step  Count - Update web page with new values from database

      var dbBmebpm = firebase.database().ref().child(dbPathBeatAvg);
      dbBmebpm.on("value", (snap) => {
        // Celsius degrees
        const newBpmValue = snap.val().toFixed(2);
        console.log();
        const normalizedProgress = Math.max(
          0,
          Math.min(100, parseInt(newBpmValue))
        );
        const circumference = 2 * Math.PI * 65; // Circumference of the circle
        const strokeDashArray = (circumference * normalizedProgress) / 100;

        bmpBar.setAttribute(
          "stroke-dasharray",
          `${strokeDashArray} ${circumference}`
        );
        bmpText.textContent = `${normalizedProgress}BPM`;
        bpmSpan.textContent = `${normalizedProgress}BPM`;
      });

      // Sensor Readings - Step  Count - Update web page with new values from database
      var dbBmestep = firebase.database().ref().child(dbPathStepCount);
      dbBmestep.on("value", (snap) => {
        // Celsius degrees
        const newStepValue = snap.val().toFixed(2);
        console.log();
        const normalizedProgress = Math.max(
          0,
          Math.min(100, parseInt(newStepValue))
        );
        const circumference = 2 * Math.PI * 65; // Circumference of the circle
        const strokeDashArray = (circumference * normalizedProgress) / 100;

        stepBar.setAttribute(
          "stroke-dasharray",
          `${strokeDashArray} ${circumference}`
        );
        stepText.textContent = `${normalizedProgress}steps`;
        stepCountSpan.textContent = `${normalizedProgress}steps`;
      });

      //   sliders
      var firebaseSlide1 = firebase.database().ref().child(dbPathSlider1);
      var firebaseSlide2 = firebase.database().ref().child(dbPathSlider2);

      // Slider 1 - GPIO 13 - Update slider text value on web page
      firebaseSlide1.on("value", (snap) => {
        slider1.value = snap.val();
        sliderValue1.innerText = snap.val() + " %";
      });

      // Slider 1 - GPIO 13 - Update database slider value
      slider1.onchange = () => {
        firebase
          .database()
          .ref()
          .child(dbPathSlider1)
          .set(Number(slider1.value));
      };

      // Slider 1 - GPIO 13 - Update slider text value on web page
      firebaseSlide2.on("value", (snap) => {
        slider2.value = snap.val();
        sliderValue2.innerText = snap.val() + " %";
      });

      // Slider 1 - GPIO 13 - Update database slider value
      slider2.onchange = () => {
        firebase
          .database()
          .ref()
          .child(dbPathSlider1)
          .set(Number(slider2.value));
      };
    } else {
      // User is not signed in, redirect to login page
      window.location.href = "login.html";
    }
  });
});
