
export default class SignInEventListeners {
    constructor(context) {
        this.signInObject = context;
        document.querySelector('#rateConfidence').addEventListener('change', function () {
            let labels = ['Not confidence at all', 'Somewhat unconfident', 'Neutral', 'Somewhat confident', 'Very Confident']
            document.querySelector('#selectedConfidenceLabel').innerHTML = `${labels[this.value-1]}`
        })

        document.querySelector('#coursePrefixSelect').addEventListener('change', function () {
            context.fillCourseFromPrefix(this.value);
        });


        document.querySelector('#selectCourse').addEventListener('change', function () {
            if (document.querySelector('#selectCourse').value === "Other") {
                document.querySelector('#selectCourseOtherTextInput').classList.remove("d-none");
                document.querySelector("#selectCourseOtherTextInput").setAttribute("required", "required")
            } else {
                document.querySelector('#selectCourseOtherTextInput').classList.add("d-none");
                document.querySelector("#selectCourseOtherTextInput").removeAttribute("required")
            }

        })
        document.querySelector('#purposeOfVisitInput').addEventListener('change', function () {
            if (document.querySelector('#purposeOfVisitInput').value === "Other") {
                document.querySelector('#purposeOfVisitOther').classList.remove("d-none");
                document.querySelector("#purposeOfVisitOther").setAttribute("required", "required")

            } else {
                document.querySelector('#purposeOfVisitOther').classList.add("d-none");
                document.querySelector("#purposeOfVisitOther").removeAttribute("required")
            }
        })

        this.formSubmitEventListenerSetUp();
    }


    formSubmitEventListenerSetUp() {
        let context = this.signInObject;
        document.querySelector('#signInForm').addEventListener('submit', function (event) {
            event.preventDefault();
            // Add a new document in collection "cities"
            context.addSignInToFirebase();


        })
    }

}