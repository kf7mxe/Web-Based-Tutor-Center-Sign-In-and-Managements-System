import Firebase from "/scripts/Firebase.js"
import HTMLRenderer from "/scripts/HTMLRenderer.js"
import SignInListeners from "/scripts/SignInEventListeners.js"
export default class SignIn{
    constructor(){
        this.courses=[];
        firebase = new Firebase();
        this.signInListeners  = new SignInListeners(this);
        this.htmlRenderer = new HTMLRenderer("#signedInUsers");
        firebase.getCollectionDataSortedPromise("courses","coursePrefix").then(docData=>{
            this.setUpCoursesAndPrefixes(docData)
        })
        firebase.getCollectionRealtimeDataSearch('inPersonTracker','signedOut','==',false,this.htmlRenderer)

    }

    setUpCoursesAndPrefixes(docData){
        let prefix = "";
        let prefixArray=[];
        for(let i=0;i<docData.length;i++){
            let data = docData[i].data();
            if(prefixArray.indexOf(data.coursePrefix)===-1){
                prefixArray.push(data.coursePrefix)
                let prefixItem = `<option value="${data.coursePrefix}">${data.coursePrefix}</option>`;
                prefix = prefix + prefixItem;
                let tempPrefix = data.coursePrefix;
                courses[tempPrefix] = [`<option value="${data.course}">${data.course}</option>`]
              }
              else{
                courses[data.coursePrefix].push(`<option value="${data.course}">${data.course}</option>`)
              }
              document.getElementById('coursePrefixSelect').innerHTML = prefix+'<option value="Other">Other</option>';
              this.fillCourseFromPrefix(document.querySelector('#coursePrefixSelect').value)
        }
    }

    fillCourseFromPrefix(value){
        if(document.querySelector('#coursePrefixSelect').value==="Other"){
          document.querySelector('#selectCourseOtherTextInput').classList.remove("d-none");
          document.querySelector("#selectCourseOtherTextInput").setAttribute("required","required")
          document.querySelector('#selectCourse').classList.add("d-none");
        }else{
        let course = '';
        let tempCourses='';
        for(var i =0;i<=courses[value].length;i++){
          course = courses[value][i]
          tempCourses = tempCourses + course;
        }
        document.querySelector('#selectCourse').innerHTML =tempCourses +'<option value="Other">Other</option>';
        document.querySelector('#selectCourse').classList.remove("d-none");
        document.querySelector('#selectCourseOtherTextInput').classList.add("d-none");
        document.querySelector("#selectCourseOtherTextInput").removeAttribute("required")
      }
      }
      addSignInToFirebase(){
        let date = new Date();
        let weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      db.collection("inPersonTracker").add({
        aNumber: document.querySelector('#aNumberInput').value,
        classRank: document.querySelector('#rankInput').value,
        confidence: document.querySelector('#rateConfidence').value,
        course: document.querySelector('#selectCourse').value === "Other" ? document.querySelector('#selectCourseOtherTextInput').value : document.querySelector('#selectCourse').value,
        courseNumber: document.querySelector('#selectCourse').value === "Other" ? document.querySelector('#selectCourseOtherTextInput').value.split(' ')[1].split(':')[0] : document.querySelector('#selectCourse').value.split(' ')[1].split(':')[0],
        coursePrefix: document.querySelector('#coursePrefixSelect').value,
        date: `${months[date.getMonth()]} ${date.getDate()},${date.getFullYear()}`,
        dayOfWeek: weekday[date.getDay()],
        major: document.querySelector('#selectMajorInput').value,
        purposeOfVisit: document.querySelector('#purposeOfVisitInput').value,
        signedOut: false,
        timeIn: date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds(),
        timeOut: '',
        totalMinutes: ''
    })
    .then(function () {
        console.log("Document successfully written!");

        document.getElementById('signInSuccessAlert').classList.remove("d-none");
        setTimeout(function () {
            document.querySelector('#signInForm').reset();
            document.getElementById('signInSuccessAlert').classList.add("d-none");
            document.querySelector('#selectCourseOtherTextInput').classList.add("d-none");
            document.querySelector("#selectCourseOtherTextInput").removeAttribute("required")
            document.querySelector('#purposeOfVisitOther').classList.add("d-none");
            document.querySelector("#purposeOfVisitOther").removeAttribute("required")
        }, 3000)

    })
    .catch(function (error) {
        console.error("Error writing document: ", error);
        document.getElementById('signInSuccessAlert').classList.remove("d-none")
        setTimeout(function () {
            document.getElementById('signInSuccessAlert').classList.add("d-none");
            document.getElementById('signInSuccessAlert').innerHTML = `<h2>Error  ${error}</h2>`;
        }, 6000)
    });
}
}

let signIn = new SignIn();
