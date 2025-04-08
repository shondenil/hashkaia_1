const firebaseConfig = {
    apiKey: "AIzaSyAbkZsdox_IoL_e5PT45LTt0cy89TeUtiY",
    authDomain: "irrigation-system-a3913.firebaseapp.com",
    databaseURL: "https://irrigation-system-a3913-default-rtdb.firebaseio.com",
    projectId: "irrigation-system-a3913",
    storageBucket: "irrigation-system-a3913.firebasestorage.app",
    messagingSenderId: "92270780500",
    appId: "1:92270780500:web:4d5d771b1e258d65e04dc1",
    measurementId: "G-6KTY2W5DK3"
  };
  // Инициализация Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.database();


function displayData() { 
    const dataRef = db.ref("שם-הנתיב-בפיירבייס"); 
    // יצירת הפנייה לנתיב מסוים בדאטאבייס ב-Firebase.

    dataRef.on("value", (snapshot) => { 
    // מאזין לשינויים בנתיב זה ומעדכן את הדף כל פעם שיש שינוי.
        const data = snapshot.val(); 
        // שליפת הנתונים הנוכחיים מהדאטאבייס.
        if (data) { 
            document.getElementById("output").innerHTML = JSON.stringify(data, null, 2); 
            // הצגת הנתונים ב-HTML בתצוגה קריאה ומעוצבת.
        } else { 
            document.getElementById("output").innerHTML = "לא נמצאו נתונים."; 
            // הצגת הודעת שגיאה במקרה שאין נתונים.
        }
    });
}

window.onload = displayData; 
// קריאה לפונקציה להצגת נתונים כאשר הדף נטען.
function modeSwitch(value) { 
    let mode = parseInt(value, 10); 
    // המרת הערך שנשלח לפונקציה למספר שלם.
    console.log("Mode:", mode); 
    // הדפסת מהירות המאוורר לקונסול.

    db.ref('/shodenil/RX').set(mode) 
    // שליחת הנתון החדש לדאטאבייס ב-Firebase.
    .then(() => console.log("mode changed:", mode)) 
    // אם הפעולה הצליחה, הדפסת הודעת הצלחה לקונסול.
    .catch(error => console.error("Error:", error)); 
    // אם התרחשה שגיאה, הצגת הודעת שגיאה.
}



function setFanSpeed(value) { 
    let speed = parseInt(value, 10); 
    // המרת הערך שנשלח לפונקציה למספר שלם.
    console.log("Fan speed selected:", speed); 
    // הדפסת מהירות המאוורר לקונסול.

    db.ref('/shodenil/RX').set(speed) 
    // שליחת הנתון החדש לדאטאבייס ב-Firebase.
    .then(() => console.log("Fan speed changed:", speed)) 
    // אם הפעולה הצליחה, הדפסת הודעת הצלחה לקונסול.
    .catch(error => console.error("Error:", error)); 
    // אם התרחשה שגיאה, הצגת הודעת שגיאה.
}

function toggleLampBtn(value) { 
    let mode = parseInt(value, 10); 
    // המרת הערך שנשלח לפונקציה למספר שלם.
    console.log(" Lamp:", mode); 
    // הדפסת מצב המאוורר לקונסול.

    db.ref('/shodenil/RX').set(mode) 
    // שליחת המצב החדש לדאטאבייס ב-Firebase.
    .then(() => console.log("lamp:", mode)) 
    // הדפסת הודעת הצלחה לקונסול.
    .catch(error => console.error("Error:", error)); 
    // הצגת הודעת שגיאה אם יש בעיה.
}


function togglePump(value) { 
    let regime = parseInt(value, 10); 
    // המרת הערך שנשלח לפונקציה למספר שלם.
    console.log(" pump:", regime); 
    // הדפסת מצב המאוורר לקונסול.

    db.ref('/shodenil/RX').set(regime) 
    // שליחת המצב החדש לדאטאבייס ב-Firebase.
    .then(() => console.log("pump:", regime)) 
    // הדפסת הודעת הצלחה לקונסול.
    .catch(error => console.error("Error:", error)); 
    // הצגת הודעת שגיאה אם יש בעיה.
}


function fetchUsers() { 
    const usersRef = ref(database, 'users'); 
    // יצירת הפנייה לנתיב המשתמשים בדאטאבייס.
    
    onValue(usersRef, (snapshot) => { 
        const users = snapshot.val(); 
        // שליפת הנתונים של המשתמשים.
        let outputHTML = "<h3>משתמשים רשומים:</h3><ul>"; 
        // הכנת HTML להצגת המשתמשים.
        
        for (let key in users) { 
            let user = users[key]; 
            // מעבר על כל משתמש בקובץ.
            outputHTML += `<li> ${user.email} - גיל: ${user.age} - מגדר: ${user.gender} </li>`; 
            // הוספת המשתמש לרשימה.
        }
        outputHTML += "</ul>"; 
        // סגירת הרשימה.
        document.getElementById("output").innerHTML = outputHTML; 
        // הצגת המשתמשים במסך.
    });
}

function updateSensorData(sensorId, value, unit = "") {
    document.getElementById(sensorId).textContent = value !== null ? value + unit : "--";
}

// קבלת נתונים עבור כל חיישן
db.ref("/shodenil/TX/A").on("value", (snapshot) => {
    const moisture = snapshot.val();
    if (moisture) {
        document.getElementById("moisture");
        console.log("moisture:", moisture); // הדפס את הערך בקונסול
    updateSensorData("moisture", moisture);
    }
});

db.ref("/shodenil/TX/B").on("value", (snapshot) => {
    const waterLevel = snapshot.val();
    console.log("waterLevel:", waterLevel); // הדפס את הערך בקונסול
    updateSensorData("waterLevel", waterLevel);
});

db.ref("/shodenil/TX/C").on("value", (snapshot) => {
    const ldr = snapshot.val();
    document.getElementById("ldr").innerText = "LDR: " + ldr;
    console.log("ldr:", ldr); // הדפס את הערך בקונסול
    updateSensorData("ldr", ldr, " lux");
});




fetchUsers(); 
// קריאה לפונקציה בהעלאת הדף.



// פונקציה לשמירת נתונים
function saveData() {
    const newData = {
        moisture: Math.floor(Math.random() * 100), // לדוגמה לחות אקראית
        waterLevel: Math.random() > 0.5, // מצב מים אקראי
    };

    // שמירת הנתונים ב-Firebase
    set(ref(database, "sensors"), newData) 
        .then(() => alert("הנתונים נשמרו בהצלחה!")) // הצגת הודעת הצלחה אחרי שמירת הנתונים
        .catch((error) => alert("שגיאה: " + error.message)); // הצגת הודעת שגיאה אם משהו השתבש
}

// רישום משתמשים למערכת (signup page)
document.addEventListener("DOMContentLoaded", function () { 
    const submitBtn = document.getElementById("submitBtn"); // מחפש את כפתור השמירה
    if (submitBtn) {
        submitBtn.addEventListener("click", function () { 
            const email = document.getElementById("email").value; // מקבל את כתובת המייל מהשדה
            const password = document.getElementById("password").value; // מקבל את הסיסמה מהשדה
            const age = parseInt(document.getElementById("age").value, 10); // מקבל את הגיל מהשדה וממיר למספר
            const gender = document.querySelector('input[name="gender"]:checked'); // בודק איזו אפשרות למין נבחרה

            if (!gender) { // אם לא נבחר מין
                alert("בחר מין"); // מציג הודעת שגיאה
                return;
            }
            if (password.length < 6) { // אם הסיסמה קצרה מ-6 תווים
                alert("הסיסמה חייבת להיות לפחות 6 תווים."); // מציג הודעת שגיאה
                return;
            }
            if (isNaN(age) || age < 16 || age > 100) { // אם הגיל לא בתווך המתאים
                alert("הגיל חייב להיות בין 16 ל-100."); // מציג הודעת שגיאה
                return;
            }

            // רישום משתמש חדש עם Firebase Authentication
            createUserWithEmailAndPassword(auth, email, password) 
                .then((userCredential) => { // אם הרישום הצליח
                    const user = userCredential.user; // מקבל את המשתמש שנרשם
                    alert("המשתמש נרשם בהצלחה!"); // מציג הודעת הצלחה
                })
                .catch((error) => { 
                    const errorCode = error.code; 
                    const errorMessage = error.message; 
                    alert(`שגיאה: ${errorMessage}`); // מציג את הודעת השגיאה
                });

            // מציג את פרטי המשתמש בעמוד
            document.getElementById("output").innerHTML = 
                `<p>כתובת מייל: ${email}</p>
                <p>סיסמה: ${'*'.repeat(password.length)}</p>
                <p>גיל: ${age}</p>
                <p>מין: ${gender.value === 'male' ? 'זכר' : 'נקבה'}</p>`;
        });
    }
});

// התחברות משתמשים למערכת (login page)
document.addEventListener("DOMContentLoaded", function () { 
    const loginBtn = document.getElementById("loginBtn"); // מחפש את כפתור ההתחברות
    if (loginBtn) {
        loginBtn.addEventListener("click", function () { 
            const email = document.getElementById("loginEmail").value; // מקבל את כתובת המייל מהשדה
            const password = document.getElementById("loginPassword").value; // מקבל את הסיסמה מהשדה

            signInWithEmailAndPassword(auth, email, password) 
                .then((userCredential) => { // אם ההתחברות הצליחה
                    const user = userCredential.user; 
                    alert(`ברוך הבא ${user.email}`); // מציג הודעת ברוך הבא למשתמש

                    // העברת המשתמש לדף הבית לאחר התחברות מוצלחת
                    window.location.href = "./index.html";  // כאן שים את שם הקובץ של דף הבית שלך
                })
                .catch((error) => { 
                    const errorCode = error.code; 
                    const errorMessage = error.message; 
                    alert(`שגיאה: ${errorMessage}`); // מציג את הודעת השגיאה
                });
        });
    }
});

// === פונקציה לטעינת נתוני המערכת ===
function loadSystemData() {
    const outputElement = document.getElementById('systemDataOutput'); // מחפש את האלמנט שבו יוצגו הנתונים
    if (!outputElement) return;

    outputElement.textContent = 'טוען נתונים...'; // מציג הודעה של טעינת נתונים

    // דוגמה לנתונים מה-Firebase
    get(child(ref(database), 'systemData/')) 
        .then(snapshot => { 
            const data = snapshot.val(); 
            if (data) { 
                outputElement.innerHTML = 
                    `<p>סטטוס מערכת: ${data.status}</p>
                    <p>לחות קרקע: ${data.soilMoisture}%</p>
                    <p>מצב מים: ${data.waterLevel ? 'יש מים' : 'אין מים'}</p>`; // מציג את הנתונים שנמצאו
            } else {
                outputElement.textContent = 'לא נמצאו נתונים'; // אם לא נמצאו נתונים מציג הודעה
            }
        })
        .catch(error => {
            outputElement.textContent = 'שגיאה בטעינת הנתונים'; // אם יש שגיאה, מציג הודעה על כך
            console.error(error);
        });
}

// פונקציות לעדכון ערכים ב-Firebase
function updateMoisture() {
    const newValue = prompt("הכנס ערך חדש ללחות קרקע:"); // מבקש מהמשתמש להכניס ערך חדש ללחות
    if (newValue !== null) { 
        // שליחת הערך ל-Firebase
        set(ref(database, 'sensors/moisture'), newValue); 

        // עדכון התצוגה בדף
        document.getElementById("moisture").textContent = newValue; // עדכון תצוגת הלחות בעמוד
    }
}

// קריאת נתונים בזמן אמת
onValue(ref(database, "sensors"), (snapshot) => { 
    const sensors = snapshot.val(); 
    document.getElementById("moisture").textContent = sensors.moisture || "לא זמין"; // מציג את הלחות אם היא זמינה
    document.getElementById("waterLevel").textContent = sensors.waterLevel ? "יש מים" : "אין מים"; // מציג את מצב המים
});

// מציאת האלמנטים ב-HTML
const pumpToggleBtn = document.getElementById("pumpToggleBtn"); // מציאת כפתור הפעלת המשאבה
const pumpStatus = document.getElementById("pumpStatus"); // מציאת אלמנט המצב של המשאבה


