
class LoginModal extends HTMLElement {
    constructor() {
        super()
        this.innerHTML = `<!-- Modal -->
        <div class="modal fade" id="loginModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            <form id="signInAdminForm">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Login</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label class="col-form-label font-weight-bold" for="exampleInputEmail1">Email</label>
                        <input type="email" class="form-control" id="signInInputEmail" aria-describedby="emailHelp"
                            placeholder="Enter First Name">
                        <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
                    </div>
                    <div class="form-group">
                        <label class="col-form-label font-weight-bold" for="exampleInputEmail1">Pasword</label>
                        <input type="password" class="form-control" id="signInInputPassword"
                            aria-describedby="emailHelp" placeholder="Password">
                        <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
                    </div>
                    <div class="row">
                    <div class="col-12">
                    <a href="javascript:void(0);" id="resetPassword">Reset Password</a>
                    </div>
                    </div>
                    <div class="row">
                    <div class="col-12">
                    <a href="javascript:void(0);" id="createAccount">Create Account</a>
                    </div>
                    </div>
                    <div class="alert alert-danger d-none" id="invalid-pass-error-message">
                    <h2>Error </h2>
                    </div>
                    <div class="alert alert-success d-none" id="reset-password-sent-alert">
                    <h2>Reset Password Sent </h2>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <input type="submit" value="Sign In" class="btn btn-primary" ></input>
                    </form>
                </div>
            </div>
        </div>
    </div>
        `
        document.querySelector("#signInAdminForm").addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('signInInputEmail').value;
            const password =  document.getElementById('signInInputPassword').value;
            auth.signInWithEmailAndPassword(email,password).then(cred =>{
              $("#loginModal").modal("hide")
              setTimeout(function(){
                  location.reload();
            },2000)
            }).catch(function(error){
              document.getElementById('invalid-pass-error-message').classList.remove('d-none');
              document.getElementById('invalid-pass-error-message').classList.remove('d-lg-none');
              document.getElementById('invalid-pass-error-message').innerHTML = `<h2>error ${error.message}</h2>`
              setTimeout(function(){
                document.getElementById('invalid-pass-error-message').classList.add("d-none");
                document.getElementById('invalid-pass-error-message').classList.add("d-lg-none")
              }, 10000)
            })
          })
          
          document.querySelector("#resetPassword").addEventListener('click',function(){
            const email = document.getElementById('signInInputEmail').value;
            auth.sendPasswordResetEmail(email).then(function() {
              // Email sent.
              document.getElementById('reset-password-sent-alert').classList.remove('d-none');
              document.getElementById('reset-password-sent-alert').classList.remove('d-lg-none');
              setTimeout(function(){
                document.getElementById('reset-password-sent-alert').classList.add("d-none");
                document.getElementById('reset-password-sent-alert').classList.add("d-lg-none")
              }, 10000)
            }).catch(function(error) {
                document.getElementById('invalid-pass-error-message').classList.remove('d-none');
                document.getElementById('invalid-pass-error-message').classList.remove('d-lg-none');
                document.getElementById('invalid-pass-error-message').innerHTML = `<h2>error ${error.message}</h2>`
                setTimeout(function(){
                  document.getElementById('invalid-pass-error-message').classList.add("d-none");
                  document.getElementById('invalid-pass-error-message').classList.add("d-lg-none")
                }, 10000)            
            });
          })

          document.querySelector('#createAccount').addEventListener('click',function(){
            $('#createAccountModal').modal('show')
            $("#loginModal").modal("hide")
          })
    }
}
class CreateAccountModal extends HTMLElement {
    constructor() {
        super()
        this.innerHTML = `<!-- Modal -->
        <div class="modal fade" id="createAccountModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            <form id="createAccountForm">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Create Account</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label class="col-form-label font-weight-bold" for="exampleInputEmail1">Enter Email</label>
                        <input type="email" class="form-control" id="createInputEmail" aria-describedby="emailHelp"
                            placeholder="Enter First Name">
                        <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
                    </div>
                    <div class="form-group">
                        <label class="col-form-label font-weight-bold" for="exampleInputEmail1">Pasword</label>
                        <input type="password" class="form-control" id="createInputPassword"
                            aria-describedby="emailHelp" placeholder="Password">
                        <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
                    </div>
                    <div class="alert alert-danger d-none" id="invalid-pass-error-message">
                    <h2>Error </h2>
                    </div>
                    <div class="alert alert-success d-none" id="account-created-alert">
                    <h2>Account Created</h2>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <input type="submit" value="Create Account" class="btn btn-primary"></input>
                    </form>
                </div>
            </div>
        </div>
    </div>`
    document.querySelector('#createAccountForm').addEventListener('submit',function(e){
        e.preventDefault();
        console.log("in event create thing")
        const email = document.getElementById('createInputEmail').value;
        const password =  document.getElementById('createInputPassword').value;
        console.log(email);
        console.log(password)
        auth.createUserWithEmailAndPassword(email,password).then(cred =>{
            document.getElementById('account-created-alert').classList.remove('d-none');
            document.getElementById('account-created-alert').classList.remove('d-lg-none');
            setTimeout(function(){
              document.getElementById('account-created-alert').classList.add("d-none");
              document.getElementById('account-created-alert').classList.add("d-lg-none")
              //$('#createAccountModal').modal('hide')
            }, 10000)
          }).catch(function(error) {
              document.getElementById('invalid-pass-error-message').classList.remove('d-none');
              document.getElementById('invalid-pass-error-message').classList.remove('d-lg-none');
              document.getElementById('invalid-pass-error-message').innerHTML = `<h2>error ${error.message}</h2>`
              setTimeout(function(){
                document.getElementById('invalid-pass-error-message').classList.add("d-none");
                document.getElementById('invalid-pass-error-message').classList.add("d-lg-none")
              }, 10000)

        }).catch(function(error){
          document.getElementById('invalid-pass-error-message').classList.remove('d-none');
          document.getElementById('invalid-pass-error-message').classList.remove('d-lg-none');
          document.getElementById('invalid-pass-error-message').innerHTML = `<h2>error ${error.message}</h2>`
          setTimeout(function(){
            document.getElementById('invalid-pass-error-message').classList.add("d-none");
            document.getElementById('invalid-pass-error-message').classList.add("d-lg-none")
          }, 10000)
        })
    })
    }
}



class AddCourseModal extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `  <div class="modal fade" id="addCourseModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            <form id="addCourseForm">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Add Course</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label class="col-form-label font-weight-bold" for="exampleInputPassword1">Course Prefix</label>
                        <select id="coursePrefixSelect" class="custom-select" required>
                        </select>
                        <input type="text" pattern="[A-Z]+" class="form-control mt-2" id="enterCoursePrefixTextInput" aria-describedby="emailHelp" placeholder="Enter Prefix" required>

                    </div>
                    <div class="form-group">
                        <label class="col-form-label font-weight-bold" for="exampleInputPassword1">Course Number</label>
                        <input type="text" pattern="[0-9]{4}" class="form-control" id="courseNumberTextInput" aria-describedby="emailHelp" placeholder="Course Number" required>

                    </div>
                    <div class="form-group">
                        <label class="col-form-label font-weight-bold" for="exampleInputEmail1">Enter
                            Description</label>
                        <input type="text" class="form-control" id="courseDescriptionTextInput" aria-describedby="emailHelp"
                            placeholder="Enter Description" required>
                        <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
                    </div>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <input type="submit" value="Add Course" class="btn btn-primary" id="addCourseButton"></input>
                </div>
            </div>
        </div>
    </div>`
        document.getElementById("addCourseForm").addEventListener('submit', function (event) {
            event.preventDefault()
            db.collection("courses").add({
                    course: document.querySelector("#coursePrefixSelect").value === "Not Listed" ? document.querySelector("#enterCoursePrefixTextInput").value : document.querySelector("#coursePrefixSelect").value + " " + document.querySelector("#courseNumberTextInput").value + ": " + document.querySelector("#courseDescriptionTextInput").value,
                    courseDescription: document.querySelector("#courseDescriptionTextInput").value,
                    courseNumber: document.querySelector("#courseNumberTextInput").value,
                    coursePrefix: document.querySelector("#coursePrefixSelect").value === "Not Listed" ? document.querySelector("#enterCoursePrefixTextInput").value : document.querySelector("#coursePrefixSelect").value
                })
                .then(function (docRef) {
                    console.log("Document written with ID: ", docRef.id);
                })
                .catch(function (error) {
                    console.error("Error adding document: ", error);
                });
        });


        document.getElementById("coursePrefixSelect").addEventListener('change', function () {
            let selection = document.getElementById("coursePrefixSelect").value;
            if (selection === "Not Listed") {
                document.querySelector("#enterCoursePrefixTextInput").classList.remove("d-none");
                document.querySelector("#enterCoursePrefixTextInput").setAttribute("required", "required")
            } else {
                document.querySelector("#enterCoursePrefixTextInput").classList.add("d-none");
                document.querySelector("#enterCoursePrefixTextInput").removeAttribute("required")
            }
        })
    }

    connectedCallback() {
        let prefix = "";
        let prefixArray = [];
        let courses = {};
        db.collection("courses").orderBy("coursePrefix").onSnapshot(querySnapshot => {
            querySnapshot.forEach((doc) => {
                let data = doc.data();
                if (prefixArray.indexOf(data.coursePrefix) === -1) {
                    prefixArray.push(data.coursePrefix)
                    let prefixItem = `<option value="${data.coursePrefix}">${data.coursePrefix}</option>`;
                    prefix = prefix + prefixItem;
                    let tempPrefix = data.coursePrefix;
                    courses[tempPrefix] = [`<option value="${data.course}">${data.course}</option>`]
                } else {
                    courses[data.coursePrefix].push(`<option value="${data.course}">${data.course}</option>`)
                }


            });
            prefix = `<option value="Not Listed">Not Listed</option>` + prefix
            document.getElementById('coursePrefixSelect').innerHTML = prefix;
        });
    }

}

class EditCourseModal extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `<div class="modal fade" id="editCourseModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Edit Course</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label class="col-form-label font-weight-bold" for="exampleInputPassword1">Course Prefix</label>
                        <select id="coursePrefixSelectUpdate" class="custom-select" required>
                        </select>
                        <input type="text" class="form-control mt-2" id="enterUpdateCoursePrefixTextInput" aria-describedby="emailHelp" placeholder="Enter Prefix">

                    </div>
                    <div class="form-group">
                        <label class="col-form-label font-weight-bold" for="exampleInputPassword1">Course Number</label>
                        <input type="text" class="form-control" id="updateCourseNumberTextInput" aria-describedby="emailHelp" placeholder="Course Number" required>

                    </div>
                    <div class="form-group">
                        <label class="col-form-label font-weight-bold" for="exampleInputEmail1">Enter
                            Description</label>
                        <input type="text" class="form-control" id="updateCourseDescriptionTextInput" aria-describedby="emailHelp"
                            placeholder="Enter Description" required>
                        <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
                    </div>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" id="updateCourseButton">Add Course</button>
                </div>
            </div>
        </div>
     </div>`
        let componentInstance = this;
        this.querySelector('#updateCourseButton').addEventListener('click', function () {
            db.collection("courses").doc(componentInstance.getAttribute("firebaseid")).update({
                    course: (document.querySelector("#coursePrefixSelectUpdate").value === "Not Listed" ? document.querySelector("#enterUpdateCoursePrefixTextInput").value : document.querySelector("#coursePrefixSelectUpdate").value) + " " + document.querySelector("#updateCourseNumberTextInput").value + ": " + document.querySelector("#updateCourseDescriptionTextInput").value,
                    courseDescription: document.querySelector("#updateCourseDescriptionTextInput").value,
                    courseNumber: document.querySelector("#updateCourseNumberTextInput").value,
                    coursePrefix: document.querySelector("#coursePrefixSelectUpdate").value === "Not Listed" ? document.querySelector("#enterUpdateCoursePrefixTextInput").value : document.querySelector("#coursePrefixSelectUpdate").value
                })
                .then(function (docRef) {
                    console.log("Document written with ID: ", docRef.id);
                    $('#editCourseModal').modal('hide')
                })
                .catch(function (error) {
                    console.error("Error adding document: ", error);
                });
        });


        document.getElementById("coursePrefixSelectUpdate").addEventListener('change', function () {
            let selection = document.getElementById("coursePrefixSelectUpdate").value;
            if (selection === "Not Listed") {
                document.querySelector("#enterUpdateCoursePrefixTextInput").classList.remove("d-none");
                document.querySelector("#enterUpdateCoursePrefixTextInput").setAttribute("required", "required")
            } else {
                document.querySelector("#enterUpdateCoursePrefixTextInput").classList.add("d-none");
                document.querySelector("#enterUpdateCoursePrefixTextInput").removeAttribute("required")
            }
        })
    }

    static get observedAttributes() {
        console.log("in observal attributes")
        return ['firebaseid'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log("attribute changed callback")
        if (name == "firebaseid") {
            let prefix = "";
            let prefixArray = [];
            let courses = {};
            let selectedPrefix = 'Not Listed'

            db.collection("courses").orderBy("coursePrefix").onSnapshot(querySnapshot => {
                querySnapshot.forEach((doc) => {
                    let data = doc.data();
                    if (prefixArray.indexOf(data.coursePrefix) === -1) {
                        prefixArray.push(data.coursePrefix)
                        let prefixItem = `<option value="${data.coursePrefix}">${data.coursePrefix}</option>`;
                        prefix = prefix + prefixItem;
                        let tempPrefix = data.coursePrefix;
                        courses[tempPrefix] = [`<option value="${data.course}">${data.course}</option>`]
                    } else {
                        courses[data.coursePrefix].push(`<option value="${data.course}">${data.course}</option>`)
                    }
                    if (doc.id == newValue) {
                        selectedPrefix = data.coursePrefix
                        document.getElementById('updateCourseNumberTextInput').value = data.courseNumber;
                        document.getElementById('updateCourseDescriptionTextInput').value = data.courseDescription;
                    }

                });
                prefix = `<option value="Not Listed">Not Listed</option>` + prefix
                document.getElementById('coursePrefixSelectUpdate').innerHTML = prefix;
                document.getElementById('coursePrefixSelectUpdate').value = selectedPrefix;
                if(selectedPrefix!=="Not Listed"){                
                    document.querySelector("#enterUpdateCoursePrefixTextInput").classList.add("d-none");
                 document.querySelector("#enterUpdateCoursePrefixTextInput").removeAttribute("required")
                }

            });
        }
    }
}

class AddPersonnelModal extends HTMLElement {
    constructor() {
        super()
        var uploadedImageFile = ''
        this.innerHTML = `<div class="modal fade" id="addPersonnelModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
          <form id="addPersonnelForm">

            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Add Personnel</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label class="col-form-label font-weight-bold" for="exampleInputEmail1">Enter First Name</label>
                    <input type="text" class="form-control" id="EnterFirstName" aria-describedby="emailHelp" placeholder="Enter First Name" required>
                    <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
                  </div>
                  <div class="form-group">
                    <label class="col-form-label font-weight-bold" for="exampleInputEmail1">Enter Last Name</label>
                    <input type="text" class="form-control" id="EnterLastName" aria-describedby="emailHelp" placeholder="Enter Last Name" required>
                    <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
                  </div>
                  <div class="form-group">
                  <label class="col-form-label font-weight-bold" for="selectMajorInput">Major</label>
                  <select id="selectMajorInput" class="custom-select" required="required" >
                      <option selected="true" value="">Select Major</option>
                      <option value="Biological">Biological</option>
                      <option value="Civil">Civil</option>
                      <option value="Computer">Computer</option>
                      <option value="Electrical">Electrical</option>
                      <option value="Environmental">Environmental</option>
                      <option value="Mechanical/Aerospace">Mechanical/Aerospace</option>
                  </select>
              </div>


                  <div class="form-group">
                  <label class="col-form-label font-weight-bold" for="exampleInputEmail1">Bio</label>
                  <textarea type="text" class="form-control" id="add-bio" aria-describedby="emailHelp" placeholder="Enter your bio"></textarea>
                </div>
                
                <div class="form-group">
                <label class="col-form-label font-weight-bold" for="exampleInputEmail1">Courses Tutor In</label>
                <textarea type="text" class="form-control" id="add-courses-tutor-in" aria-describedby="emailHelp" placeholder="Enter courses you can tutor"></textarea>
              </div>



                  <div class="form-group">
                    <label for="myfile">Upload image from computer:</label>
                    <input type="file" accept="image/*" id="imageInput" name="myfile" required>
                  </div>
                  <div id="uploadImageProgressBarContainer" class="progress d-none">
  <div class="progress-bar progress-bar-striped progress-bar-animated" id="uploadImageProgressBar" role="progressbar" style="width: 1%;" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100">25%</div>
</div>
<div class="alert alert-danger d-none" id="invalid-dimensions-error-message">
<h2>Error</h2>
</div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <input type="submit" value="Add Personnel" class="btn btn-primary" id="addPersonnelButton"></input>
              </div>
              </form>
            </div>
          </div>
        </div>`

        document.querySelector("#imageInput").addEventListener("change", function (event) {
            uploadedImageFile = event.target.files[0]
            if(uploadedImageFile!='undefined'){
                let reader = new FileReader();
                reader.readAsDataURL(event.target.files[0]);
                reader.onload = function(e){
                    let image = new Image();
                    image.src = e.target.result;
                    image.onload = function(){
                        if(this.height==600 && this.width==400){
                            document.querySelector('#invalid-dimensions-error-message').classList.add('d-none')
                        }
                        else{
                            document.querySelector('#invalid-dimensions-error-message').classList.remove('d-none')
                            document.querySelector('#invalid-dimensions-error-message').innerHTML = '<h2>Please upload a valid photo size of 400 x 600 </h2>'
                            uploadedImageFile = '';
                        }
                    }
                }
            }
        })

        document.querySelector("#addPersonnelForm").addEventListener("submit", function (event) {
            event.preventDefault()
            let db = firebase.firestore();
            console.log("in onsumbit")
            var metadata = {
                contentType: 'image/jpeg'
            };
            document.querySelector("#uploadImageProgressBarContainer").classList.remove("d-none");
            var uploadTask = storageRef.child('personnel/' + document.querySelector("#EnterFirstName").value + document.querySelector("#EnterLastName").value).put(uploadedImageFile);
            console.log("uploaded file")
            //var uploadTask = storageRef.child('images/desert.jpg').put(uploadedImageFile);
            uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
                function (snapshot) {
                    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    document.querySelector("#uploadImageProgressBar").style.width = `${progress}%`;
                    document.querySelector("#uploadImageProgressBar").innerHTML = progress
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                        case firebase.storage.TaskState.PAUSED: // or 'paused'
                            console.log('Upload is paused');
                            break;
                        case firebase.storage.TaskState.RUNNING: // or 'running'
                            console.log('Upload is running');
                            break;
                    }
                },
                function (error) {

                    switch (error.code) {
                        case 'storage/unauthorized':
                            break;

                        case 'storage/canceled':
                            break;
                        case 'storage/unknown':
                            break;
                    }
                },
                function () {
                    // Upload completed successfully, now we can get the download URL
                    uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                        console.log('File available at', downloadURL);
                        db.collection("personnel").add({
                                firstName: document.querySelector("#EnterFirstName").value,
                                lastName: document.querySelector("#EnterLastName").value,
                                imgUrl: downloadURL,
                                bio:document.querySelector("#add-bio").value,
                                coursesTutorIn:document.querySelector("#add-courses-tutor-in").value
                            })
                            .then(function (docRef) {
                                console.log("Document written with ID: ", docRef.id);
                            })
                            .catch(function (error) {
                                console.error("Error adding document: ", error);
                            });

                        document.querySelector("#uploadImageProgressBar").style.width = `0%`;
                        document.querySelector("#uploadImageProgressBar").innerHTML = "0%";
                        document.querySelector("#uploadImageProgressBarContainer").classList.add("d-none");
                        $("#addPersonnelModal").modal("hide")
                        document.querySelector("#EnterFirstName").value = ""
                        document.querySelector("#EnterLastName").value = ""
                        document.querySelector("#imageInput").value = ""
                    });
                });
        });
    }
}

class EditPersonnelModal extends HTMLElement {
    constructor() {
        super();
        var uploadedImageFile = '';
        this.innerHTML = `<div class="modal fade" id="editPersonnelModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Edit Personnel</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label class="col-form-label font-weight-bold" for="exampleInputEmail1">Enter First Name</label>
                    <input type="text" class="form-control" id="editEnterFirstName" aria-describedby="emailHelp" placeholder="Enter First Name">
                    <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
                  </div>
                  <div class="form-group">
                    <label class="col-form-label font-weight-bold" for="exampleInputEmail1">Enter Last Name</label>
                    <input type="text" class="form-control" id="editEnterLastName" aria-describedby="emailHelp" placeholder="Enter Last Name">
                    <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
                  </div>
                  <div class="form-group">
                  <label class="col-form-label font-weight-bold" for="selectMajorInput">Major</label>
                  <select id="selectMajorInput" class="custom-select" required="required" >
                      <option selected="true" value="">Select Major</option>
                      <option value="Biological">Biological</option>
                      <option value="Civil">Civil</option>
                      <option value="Computer">Computer</option>
                      <option value="Electrical">Electrical</option>
                      <option value="Environmental">Environmental</option>
                      <option value="Mechanical/Aerospace">Mechanical/Aerospace</option>
                  </select>
              </div>


                  <div class="form-group">
                    <label class="col-form-label font-weight-bold" for="exampleInputEmail1">Bio</label>
                    <textarea  type="text" class="form-control" id="edit-bio" aria-describedby="emailHelp" placeholder="Enter your bio"></textarea>
                  </div>
                  
                  <div class="form-group">
                  <label class="col-form-label font-weight-bold" for="exampleInputEmail1">Courses Tutor In</label>
                  <textarea  type="text" class="form-control" id="edit-courses-tutor-in" aria-describedby="emailHelp" placeholder="Enter courses you can tutor"></textarea>
                </div>
                



                  <div id="currentImageContainer" class="row d-none">
                  <div class="col-sm-6">
                  <div class="card mb-2">
                  <img id="currentImage" class="card-img-top" src="" alt="Card image cap">
                  <div id="editImageInputContainer" class="form-group d-none">
                  <label for="myfile">Upload image from computer:</label>
                  <input type="file" id="editImageInput" name="myfile">
                </div>
                </div>
                </div>
                <div class="col-sm-6">
                              <button type="button" id="changeImageButton" class="btn btn-primary">Change Image</button>

                </div>
                  </div>

                  <div class="row">
                  <div class="col-sm-12">
                  <div id="editUploadImageProgressBarContainer" class="progress d-none">
                 <div class="progress-bar progress-bar-striped progress-bar-animated" id="editUploadImageProgressBar" role="progressbar" style="width: 1%;" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100">25%</div>
                </div>
                </div>
<div class="alert alert-danger d-none" id="edit-invalid-dimensions-error-message">
<h2>Error</h2>
</div>
                </div>
                </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary" id="editPersonnelButton">Update Personnel</button>
            </div>
          </div>
        </div>
      </div>`
      document.querySelector("#changeImageButton").addEventListener("click",function(event){
        if(document.querySelector("#changeImageButton").innerHTML ==="Change Image"){
        document.querySelector("#currentImage").classList.add("d-none");
        document.querySelector("#editImageInputContainer").classList.remove("d-none");
        document.querySelector("#changeImageButton").innerHTML = "Change Back to Current image"
        }else{
            document.querySelector("#editImageInputContainer").classList.add("d-none");
            document.querySelector("#currentImage").classList.remove("d-none");
            document.querySelector("#changeImageButton").innerHTML = "Change Image"
        }
      })
      document.querySelector("#imageInput").addEventListener("change", function (event) {
        uploadedImageFile = event.target.files[0]
    })

        document.querySelector("#editImageInput").addEventListener("change", function (event) {
            uploadedImageFile = event.target.files[0]
            if(uploadedImageFile!='undefined'){
                let reader = new FileReader();
                reader.readAsDataURL(event.target.files[0]);
                reader.onload = function(e){
                    let image = new Image();
                    image.src = e.target.result;
                    image.onload = function(){
                        if(this.height==600 && this.width==400){
                            document.querySelector('#edit-invalid-dimensions-error-message').classList.add('d-none')
                        }
                        else{
                            document.querySelector('#edit-invalid-dimensions-error-message').classList.remove('d-none')
                            document.querySelector('#edit-invalid-dimensions-error-message').innerHTML = '<h2>Please upload a valid photo size of 400 x 600 </h2>'
                            uploadedImageFile = '';
                        }
                    }
                }
            }
        })
        let componenetInstance = this;
        document.querySelector("#editPersonnelButton").addEventListener("click", function () {
            if(uploadedImageFile!==''){
            document.querySelector("#editUploadImageProgressBarContainer").classList.remove("d-none");

            if ('personnel/' + componenetInstance.getAttribute("oldImg") != undefined) {
                console.log("image path deleting")
                var imgRef = storageRef.child( 'personnel/' + componenetInstance.getAttribute("oldImg"));
                // Delete the file
                console.log(imgRef)
                imgRef.delete().then(function () {
                    // File deleted successfully
                }).catch(function (error) {
                    // Uh-oh, an error occurred!
                    console.log(error)
                });
            }

            var uploadTask = storageRef.child('personnel/' + document.querySelector("#editEnterFirstName").value + document.querySelector("#editEnterLastName").value).put(uploadedImageFile);
            console.log("uploaded file")
            //var uploadTask = storageRef.child('images/desert.jpg').put(uploadedImageFile);
            uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
                function (snapshot) {
                    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    document.querySelector("#editUploadImageProgressBar").style.width = `${progress}%`;
                    document.querySelector("#editUploadImageProgressBar").innerHTML = progress
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                        case firebase.storage.TaskState.PAUSED: // or 'paused'
                            console.log('Upload is paused');
                            break;
                        case firebase.storage.TaskState.RUNNING: // or 'running'
                            console.log('Upload is running');
                            break;
                    }
                },
                function (error) {

                    switch (error.code) {
                        case 'storage/unauthorized':
                            break;

                        case 'storage/canceled':
                            break;
                        case 'storage/unknown':
                            break;
                    }
                },
                function () {
                    // Upload completed successfully, now we can get the download URL
                    uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                        console.log('File available at', downloadURL);
                        db.collection("personnel").doc(componenetInstance.getAttribute("firebaseid")).update({
                                firstName: document.querySelector("#editEnterFirstName").value,
                                lastName: document.querySelector("#editEnterLastName").value,
                                imgUrl: downloadURL,
                                major:document.querySelector("#selectMajorInput").value,
                                bio:document.querySelector("#edit-bio").value,
                                coursesTutorIn:document.querySelector("#edit-courses-tutor-in").value
                            })
                            .then(function (docRef) {
                                console.log("Document written with ID: ", docRef.id);
                            })
                            .catch(function (error) {
                                console.error("Error adding document: ", error);
                            });

                        document.querySelector("#editUploadImageProgressBar").style.width = `0%`;
                        document.querySelector("#editUploadImageProgressBar").innerHTML = "0%";
                        document.querySelector("#editUploadImageProgressBarContainer").classList.add("d-none");
                        $("#editPersonnelModal").modal("hide")
                        document.querySelector("#editEnterFirstName").value = ""
                        document.querySelector("#editEnterLastName").value = ""
                        document.querySelector("#editImageInput").value = ""
                    });
                });
            }
            else{
                db.collection("personnel").doc(componenetInstance.getAttribute("firebaseid")).update({
                    firstName: document.querySelector("#editEnterFirstName").value,
                    lastName: document.querySelector("#editEnterLastName").value,
                    bio:document.querySelector("#edit-bio").value,
                    coursesTutorIn:document.querySelector("#edit-courses-tutor-in").value
                })
                .then(function () {
                    $("#editPersonnelModal").modal("hide")
                })
                .catch(function (error) {
                    console.error("Error adding document: ", error);
                });
            }
        });

    }

    static get observedAttributes() {
        return ['firebaseid'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log("in attribute chaned ",name)
        if (name == "firebaseid") {
            console.log(newValue)
            db.collection("personnel").get().then(function (querySnapshot) {
                querySnapshot.forEach((doc) => {
                    let data = doc.data();
                    if (doc.id == newValue) {
                        document.getElementById('editEnterFirstName').value = data.firstName;
                        document.getElementById('editEnterLastName').value = data.lastName;
                        document.getElementById('edit-bio').value=data.bio;
                        document.getElementById('edit-courses-tutor-in').value = data.coursesTutorIn;
                        // if(data.ImgUrl!==undefined)
                        document.getElementById('currentImageContainer').classList.remove("d-none")
                        document.getElementById('currentImage').src=data.imgUrl
                    }
                });
            });
        }
    }

}

class SurveyModal extends HTMLElement {
    constructor() {
        super();
        this.innerHTML=`<div class="modal fade" id="surveyModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            <form id="request-survey">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Thank you for visiting the Tutoring Center! We appreciate the opportunity to provide you with additional academic support.</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                <p>Please take 2 minutes to fill out our feedback survey about your experience today. Provide your name and email below to request a link. <strong>Your survey responses will remain completely anonymous,</strong> and you may be completely truthful with your comments. As compensation for your time, you may choose to <strong>enter a drawing to win a $25 gift card!</strong> Drawings are held <strong>every two weeks</strong>, and <strong>each day you submit a response will increase your chances of winning cash!</strong> If you enter, you will be asked for the ,<strong>date of your tutoring session, name, and email address.</strong> Your information is collected using a separate link and stored independent from your response to keep your feedback anonymous. <strong>Drawing winners will be notified via email.</strong></p>
                    <div class="form-group">
                        <label class="col-form-label font-weight-bold" for="exampleInputPassword1">Full Name</label>
                        <input type="text" class="form-control mt-2" id="survey-full-name" aria-describedby="emailHelp" placeholder="Full Name" required>

                    </div>
                    <div class="form-group">
                        <label class="col-form-label font-weight-bold" for="exampleInputPassword1">Email</label>
                        <input type="email" class="form-control" id="survey-email" aria-describedby="emailHelp" placeholder="Email" required>

                    </div>
                    <div class="alert alert-success d-none" id="link-request-success">
                    <h2>An Email with the survey link will be sent soon.</h2>
                </div>
                    <div class="alert alert-danger d-none" id="error-link-request">
                        <h2>Error</h2>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <input type="submit" value="Request Your Link" class="btn btn-primary" id="submit-request-survey-button"></input>
                </div>
            </div>
        </div>
    </div>`
    this.querySelector('#request-survey').addEventListener('submit',function(event){
        event.preventDefault();
         db.collection("sendSurveys").add({
            fullName:document.querySelector("#survey-full-name").value,
            email:document.querySelector("#survey-email").value
         })
         .then(function(){
             document.querySelector("#link-request-success").classList.remove("d-none")
             document.querySelector("#error-link-request").classList.add("d-none")
             setTimeout(function(){
                document.querySelector("#link-request-success").classList.add("d-none")
                document.querySelector('#request-survey').reset();
                $("#surveyModal").modal("hide")
        }, 3000)
         })
         .catch(function (error) {
            document.querySelector("#error-link-request").classList.remove("d-none")
            document.querySelector("#link-request-success").classList.add("d-none")
            document.querySelector("#error-link-request").innerHTML = error
            setTimeout(function(){
                document.querySelector("#error-link-request").classList.add("d-none")
                document.querySelector('#request-survey').reset();
        }, 6000)
         })
    })
    }
}

class SignedInUserCard extends HTMLElement {
    constructor() {
        super();
        let aNumber = this.getAttribute("a-number");
        let timeIn = this.getAttribute("timeIn").split(':');
        let id = this.getAttribute("id");
        this.innerHTML = `<div class="card mb-2">
        <div class="card-body">
        <div class="row">
        <div class="col-sm-6">
          <h3>${aNumber}</h3>
          </div>
          <div class="col-sm-6">
          <button id="signOutButton" class="btn btn-primary float-right ">Sign Out</button>
          </div>
          </div>
        </div>
      </div>`;
        this.querySelector('#signOutButton').addEventListener('click', function () {
            let date = new Date();
            let userSignInRef = db.collection("inPersonTracker").doc(id);
            userSignInRef.update({
                signedOut: true,
                timeOut: date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds(),
                totalMinutes:(60*(date.getHours()-timeIn[0]))+(date.getMinutes()-timeIn[1])
            })
            .then($('#surveyModal').modal('show'))
        })
    }
}

class PersonnelCard extends HTMLElement {
    constructor() {
        super();
        let imgUrl = this.getAttribute("imgUrl");
        let firstName = this.getAttribute("firstName");
        let lastName = this.getAttribute("lastName");
        let id = this.getAttribute("id");
        this.innerHTML = `
        <div class="card mb-2">
            <img class="card-img-top" src="${imgUrl}" alt="Card image cap">
            <div class="card-body">
              <h5 class="card-title">${firstName} ${lastName}</h5>
              <button id="deleteButton" class="btn btn-danger float-right">Delete</button>
              <button id="editButton" class="btn btn-primary float-right mr-2">Edit</button>
            </div>
          </div>`;
        this.querySelector('#deleteButton').addEventListener('click', function () {
            document.querySelector('#confirmDeleteComponent').setAttribute("firebaseid", id)
            document.querySelector('#confirmDeleteComponent').setAttribute("imgToDeleteUrl", `${firstName}${lastName}`)
            $('#confirmDeleteModal').modal('show')
        })
        this.querySelector('#editButton').addEventListener('click', function () {
            document.querySelector('#editPersonnelModalComponent').setAttribute("firebaseid", id)
            document.querySelector('#editPersonnelModalComponent').setAttribute("oldImg",`${firstName}${lastName}`)
            $('#editPersonnelModal').modal('show')
        })


    }
}


class ConfirmDeleteModal extends HTMLElement {
    constructor() {
        super();
        let collectionToDelete = this.getAttribute("collectionToDelete");
        this.innerHTML = `<div class="modal fade" id="confirmDeleteModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Delete Item</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">

            <div class="alert alert-danger" role="alert">
            <h2>Are you sure you want to delete this</h2>
          </div>

            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
              <button type="button" class="btn btn-danger" id="modal-delete">Delete</button>
            </div>
          </div>
        </div>
      </div>`;
        let object = this

        this.querySelector('#modal-delete').addEventListener('click', function () {
            console.log(object.getAttribute("imgToDeleteUrl"))
            if (object.getAttribute("imgToDeleteUrl") != undefined) {
                console.log("image path deleting")
                console.log('personnel/' + object.getAttribute("imgToDeleteUrl"))
                var imgRef = storageRef.child('personnel/' + object.getAttribute("imgToDeleteUrl"));
                // Delete the file
                console.log(imgRef)
                imgRef.delete().then(function () {
                    // File deleted successfully
                }).catch(function (error) {
                    // Uh-oh, an error occurred!
                    console.log(error)
                });
            }
            db.collection(collectionToDelete).doc(object.getAttribute("firebaseid")).delete().then(function () {
                console.log("Document successfully deleted!");
                $("#confirmDeleteModal").modal("hide")
            }).catch(function (error) {
                console.log('testing deleting stuff',collectionToDelete)
                console.error("Error removing document: ", error);
            });
        });


    }
}


class EditSignInEntry extends HTMLElement{
    constructor(){
        super();
        this.innerHTML = `
                    <div class="modal fade" id="editSignInEntryModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <form id="editSignInEntryForm">
                        <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Edit Sign in Entry</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        </div>
                        <div class="modal-body">
                    <div class="form-group">
                    <label class="col-form-label font-weight-bold" for="aNumberInput">Enter Your A Number</label>
                    <input type="text" class="form-control" id="aNumberInput" aria-describedby="" placeholder="Enter A-Number" pattern="A[0-9]+">
                </div>
                <div class="form-group">
                    <label class="col-form-label font-weight-bold" for="selectMajorInput">Major</label>
                    <select id="selectMajorInput" class="custom-select" required="required">
                    <option value="" selected>Select Major</option>
                    <option value="Biological">Biological</option>
                    <option value="Environmental">Environmental</option>
                    <option value="Computer">Computer</option>
                    <option value="Electrical">Electrical</option>
                    <option value="Mechanical/Aerospace">Mechanical/Aerospace</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="col-form-label font-weight-bold" for="rankInput">Class Rank</label>
                    <select id="rankInput" class="custom-select" required="required">
                    <option value="" selected>Select Class Rank</option>
                    <option value="Freshman">Freshman</option>
                    <option value="Sophomore">Sophomore</option>
                    <option value="Junior">Junior</option>
                    <option value="Senior">Senior</option>
                    <option value="Graduate">Graduate</option>
                    </select>
                </div>

                <div class="form-group">
                    <label class="col-form-label font-weight-bold" for="coursePrefixSelect">Course Prefix</label>
                    <select id="coursePrefixSelect" class="custom-select" required="required">
                    <option selected>Select Course Prefix</option>
                    </select>

                </div>


                <div id="" class="form-group">
                    <label class="col-form-label font-weight-bold" for="selectCourse">Course</label>
                    <select id="selectCourse" class="custom-select" required>
                    <option value="" selected>Select Course</option>
                    </select>
                    <input type="text" class="form-control mt-2 d-none" id="selectCourseOtherTextInput" aria-describedby=""
                    placeholder="Enter class that isn't listed">
                </div>
                <div class="form-group">
                    <label class="col-form-label font-weight-bold" for="exampleInputPassword1">Purpose of Visit</label>

                    <select id="purposeOfVisitInput" class="custom-select" required="required" >
                        <option value="" selected>Select Purpose of Visit</option>
                        <option value="Homework Help">Homework Help</option>
                        <option value="Exam Preparation">Exam Preparation</option>
                        <option value="Group Study Session">Group Study Session</option>
                        <option value="Presentation Practice">Presentation Practice</option>
                        <option value="Other">Other</option>
                    </select>
                    <input type="text" class="form-control mt-2 d-none" id="purposeOfVisitOther" aria-describedby=""
                    placeholder="Other purpose of visit">

                </div>


                <div class="form-group">

                <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="sign-in-status" id="logged-in" value="logged-in">
                <label class="form-check-label" for="inlineRadio1">Logged In</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="sign-in-status" id="logged-out" value="logged-out">
                <label class="form-check-label" for="inlineRadio2">Logged Out</label>
              </div>
              </div>


                <div class="form-group">
                    <label class="col-form-label font-weight-bold" for="exampleInputPassword1">Please Rate how confident you
                    feel with the most recent material you learned in this course:</label>
                    <div class="row">
                    <div class="col-sm-6">
                        <input id="rateConfidence" type="range" min="1" max="5" list="tickmarks" class="form-control-range">
                        <datalist id="tickmarks">
                        <option value="1" label="1">1</option>
                        <option value="2" label="2">2</option>
                        <option value="3" label="3">3</option>
                        <option value="4" label="4">4</option>
                        </datalist>
                    </div>
                    <div class="col-sm-6">
                        <label id="selectedConfidenceLabel">Neutral</label>
                    </div>
                    </div>
                    <div class="form-group">
                    <label class="col-form-label font-weight-bold" for="exampleInputPassword1">Enter date of Visit</label>
                    <input type="date" id="editDateInput">
                    </div>
                    <div class="form-group">
                    <label class="col-form-label font-weight-bold" for="exampleInputPassword1">Time In: </label>
                    <input type="time" id="timeIn" name="timeIn" step="60">
                    </div>
                    <div class="form-group">
                    <label class="col-form-label font-weight-bold" for="exampleInputPassword1">Time Out: </label>
                    <input type="time" id="timeOut" name="timeOut" step="1">
                    </div>
                </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                    <input type="submit" value="Update" id="updateSignInRecord" class="btn btn-primary"></button>
                    </form>
                    </div>
                </div>
            </div>
            </div>`
            this.courses={};
            let prefix = "";
            let prefixArray=[];
            this.courses={};
            let componentInstance = this
            db.collection("courses").orderBy("coursePrefix").onSnapshot(querySnapshot => {
                querySnapshot.forEach((doc) => {
                    let data = doc.data();
                    if(prefixArray.indexOf(data.coursePrefix)===-1){
                      prefixArray.push(data.coursePrefix)
                      let prefixItem = `<option value="${data.coursePrefix}">${data.coursePrefix}</option>`;
                      prefix = prefix + prefixItem;
                      let tempPrefix = data.coursePrefix;
                      this.courses[tempPrefix] = [`<option value="${data.course}">${data.course}</option>`]
                    }
                    else{
                      this.courses[data.coursePrefix].push(`<option value="${data.course}">${data.course}</option>`)
                    }
                    document.getElementById('coursePrefixSelect').innerHTML = prefix+'<option value="Other">Other</option>';
                });
            });
      document.querySelector('#editSignInEntryForm').addEventListener('submit',function(event){
          event.preventDefault()
        let date = new Date(document.querySelector('#editDateInput').value);
        let weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        db.collection("inPersonTracker").doc(componentInstance.getAttribute("firebaseid")).update({
            aNumber: document.querySelector('#aNumberInput').value,
            classRank: document.querySelector('#rankInput').value,
            confidence: document.querySelector('#rateConfidence').value,
            course:document.querySelector('#selectCourse').value==="Other"?document.querySelector('#selectCourseOtherTextInput').value:document.querySelector('#selectCourse').value,
            //CourseNumber:document.querySelector('#selectCourse'),
            coursePrefix:document.querySelector('#coursePrefixSelect').value,
            date:`${months[date.getMonth()]} ${date.getDate()},${date.getFullYear()}`,
            dayOfWeek:weekday[date.getDay()],
            major:document.querySelector('#rankInput').value,
            purposeOfVisit:document.querySelector('#purposeOfVisitInput').value,
            signedOut:!document.querySelector('#logged-in').checked?true:false,
            timeIn:document.querySelector('#timeIn').value,
            timeOut:document.querySelector('#timeOut').value,
            totalMinutes:`${(60*(Number(document.querySelector('#timeOut').value.split(':')[0])-Number(document.querySelector('#timeIn').value.split(':')[0])))+(Number(document.querySelector('#timeOut').value.split(':')[1])-Number(document.querySelector('#timeIn').value.split(':')[1]))}`
        })
        .then(function() {
        console.log("Document successfully written!");
        $("#editSignInEntryModal").modal("hide")
        })
        .catch(function(error) {
        console.error("Error writing document: ", error);
        });
        
      })

      document.querySelector('#coursePrefixSelect').addEventListener('change',function(){
        if(document.querySelector('#coursePrefixSelect').value==="Other"){
          document.querySelector('#selectCourseOtherTextInput').classList.remove("d-none");
          document.querySelector("#selectCourseOtherTextInput").setAttribute("required","required")
          document.querySelector('#selectCourse').classList.add("d-none");

        }else{
        let course = '';
        let tempCourses='';
        for(var i =0;i<=componentInstance.courses[this.value].length;i++){
          course =  componentInstance.courses[this.value][i]
          tempCourses = tempCourses + course;
        }
        document.querySelector('#selectCourse').innerHTML =tempCourses +'<option value="Other">Other</option>';
        document.querySelector('#selectCourse').classList.remove("d-none");
        document.querySelector('#selectCourseOtherTextInput').classList.add("d-none");
        document.querySelector("#selectCourseOtherTextInput").removeAttribute("required")

      }
      })

      document.querySelector('#selectCourse').addEventListener('change',function(){
        if(document.querySelector('#selectCourse').value==="Other"){
          document.querySelector('#selectCourseOtherTextInput').classList.remove("d-none");
          document.querySelector("#selectCourseOtherTextInput").setAttribute("required","required")
        }
        else{
          document.querySelector('#selectCourseOtherTextInput').classList.add("d-none");
          document.querySelector("#selectCourseOtherTextInput").removeAttribute("required")
        }
        
      })
      document.querySelector('#purposeOfVisitInput').addEventListener('change',function(){
        if(document.querySelector('#purposeOfVisitInput').value==="Other"){
          document.querySelector('#purposeOfVisitOther').classList.remove("d-none");
        }
        else{
          document.querySelector('#purposeOfVisitOther').classList.add("d-none");
          document.querySelector("#purposeOfVisitOther").setAttribute("required","required")
        }
      })

      document.querySelector('#rateConfidence').addEventListener('change',function(){
        let labels = ['Not confidence at all','Somewhat unconfident','Neutral','Somewhat confident','Very Confident']
        document.querySelector('#selectedConfidenceLabel').innerHTML =`${labels[this.value-1]}`
      })
    }

    static get observedAttributes() {
        return ['firebaseid'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name == "firebaseid") {
            let componentContext = this;
            db.collection("inPersonTracker").doc(newValue).get().then(function (doc) {
                if (doc.exists) {
                    let data = doc.data();
                    console.log(data)
                    document.querySelector('#aNumberInput').value = data.aNumber;
                    document.querySelector('#selectMajorInput').value = data.major;
                    document.querySelector('#rankInput').value = data.classRank;
                    document.querySelector('#coursePrefixSelect').value = data.coursePrefix;

                    if(document.querySelector('#coursePrefixSelect').value==="Other"){
                        document.querySelector('#selectCourseOtherTextInput').classList.remove("d-none");
                        document.querySelector("#selectCourseOtherTextInput").setAttribute("required","required")
                        document.querySelector('#selectCourse').classList.add("d-none");
              
                      }else{
                      let course = '';
                      let tempCourses='';
                      for(var i =0;i<=componentContext.courses[document.querySelector('#coursePrefixSelect').value].length;i++){
                        course =  componentContext.courses[document.querySelector('#coursePrefixSelect').value][i]
                        tempCourses = tempCourses + course;
                      }
                      document.querySelector('#selectCourse').innerHTML =tempCourses +'<option value="Other">Other</option>';
                      document.querySelector('#selectCourse').classList.remove("d-none");
                      document.querySelector('#selectCourseOtherTextInput').classList.add("d-none");
                      document.querySelector("#selectCourseOtherTextInput").removeAttribute("required")
              
                    }
                    document.querySelector('#selectCourse').value = data.course;
                    console.log('in the component',data.purposeOfVisit)
                    document.querySelector('#purposeOfVisitInput').value = data.purposeOfVisit;
                    document.querySelector('#rateConfidence').value = data.confidence;
                    let tempDate = new Date(data.date)
                    console.log(`${String(tempDate.getFullYear()).padStart(4, '0')}-${String(Number(tempDate.getMonth()+1)).padStart(2, '0')}-${String((Number(tempDate.getDate()))).padStart(2, '0')}`)                    
                    document.querySelector('#editDateInput').value = `${String(tempDate.getFullYear()).padStart(4, '0')}-${String(Number(tempDate.getMonth()+1)).padStart(2, '0')}-${String((Number(tempDate.getDate()))).padStart(2, '0')}`
                    let timeIn = data.timeIn;
                    if(data.timeIn !==""|| data.TimeIn !==undefined){
                    if(data.timeIn.split(':')[0].length<2 || data.timeIn.split(':')[1].length<2 || data.timeIn.split(':')[2].length<2)
                    {
                        let hourIn = data.timeIn.split(':')[0].length<2?0+data.timeIn.split(':')[0]:data.timeIn.split(':')[0];
                        let minuteIn = data.timeIn.split(':')[1].length<2?0+data.timeIn.split(':')[1]:data.timeIn.split(':')[1];
                        let secondsIn = data.timeIn.split(':')[2].length<2?0+data.timeIn.split(':')[2]:data.timeIn.split(':')[2];
                        timeIn = `${hourIn}:${minuteIn}:${secondsIn}`
                    }
                }
                let timeOut = data.timeOut;

                if(data.timeOut!=="" || data.timeOut !==undefined){
                    if(data.timeOut.split(':')[0].length<2 || data.timeOut.split(':')[1].length<2 || data.timeOut.split(':')[2].length<2)
                    {
                        let hourOut = data.timeOut.split(':')[0].length<2?0+data.timeOut.split(':')[0]:data.timeOut.split(':')[0];
                        let minuteOut = data.timeOut.split(':')[1].length<2?0+data.timeOut.split(':')[1]:data.timeOut.split(':')[1];
                        let secondsOut = data.timeOut.split(':')[2].length<2?0+data.timeOut.split(':')[2]:data.timeOut.split(':')[2];
                        timeOut = `${hourOut}:${minuteOut}:${secondsOut}`
                    }
                }
                    document.querySelector('#timeIn').value = timeIn;
                    document.querySelector('#timeOut').value=timeOut;
					if(data.signedOut===true){
                        console.log("in here, sign out thing")
                        document.querySelector('#logged-out').setAttribute("checked","true")
                    }
                    else{
                        document.querySelector('#logged-in').setAttribute("checked","true")
                    }
                    }
                else{
                    console.log("no such documents")
                }
            }).catch(function(error){
                console.log("Error gettign document",error)
            });
        }
    }
}

class AddAdmin extends HTMLElement{
    constructor(){
        super();

        this.innerHTML = `<!-- Modal -->
        <div class="modal fade" id="makeAdminModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            <form id="admin-email-form">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Make Admin</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label class="col-form-label font-weight-bold" for="exampleInputEmail1">Email to make Admin</label>
                        <input type="email" class="form-control" id="emailToMakeAdmin" aria-describedby="emailHelp"
                            placeholder="email@email.email">
                    </div>
                    <div class="alert alert-danger d-none" id="invalid-pass-error-message">
                    <h2>Error </h2>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <input type="submit" value="Add Admin" class="btn btn-primary" id="signInAdminButton"></input>
                    </form>
                    <div id="success-message" class="alert alert-success mt-3 d-none d-lg-none" role="alert">
      <h2>Request successfully Sent</h2>
    </div>
    <div id="error-message" class="alert alert-danger mt-3 d-none d-lg-none" role="alert">
      <h2>Error</h2>
    </div>
                </div>
            </div>
        </div>
    </div>`

    document.getElementById("admin-email-form").addEventListener('submit',(e)=>{
        console.log("in here")
        const functions = firebase.functions();
        e.preventDefault();
        const adminEmail = document.querySelector('#emailToMakeAdmin').value;
        const adminRolefunction = functions.httpsCallable('addAdminRole');
        adminRolefunction({
          email:adminEmail
        })
        .then(result=>{
          if(result.data.error){
            document.querySelector('#error-message').classList.remove('d-none');
            document.querySelector('#error-message').classList.remove('d-lg-none');
            document.querySelector('#error-message').innerHTML = `<h2>Error ${result.data.error}</h2>`
          }
          if(result.data.message){
            document.querySelector('#success-message').classList.remove('d-none');
            document.querySelector('#success-message').classList.remove('d-lg-none');
            document.querySelector('#success-message').innerHTML = `<h2>Error ${result.data.message}</h2>`
          }
        }).catch(error=>{
          document.querySelector('#error-message').classList.remove('d-none');
          document.querySelector('#error-message').classList.remove('d-lg-none');
          document.querySelector('#error-message').innerHTML = `<h2>Error ${error.message}</h2>`    });
      })
    }
}

window.customElements.define('add-course-modal', AddCourseModal);
window.customElements.define('edit-course-modal', EditCourseModal)
window.customElements.define('login-modal', LoginModal);
window.customElements.define('survey-modal',SurveyModal)
window.customElements.define('create-account-modal',CreateAccountModal);
window.customElements.define('add-personnel-modal', AddPersonnelModal);
window.customElements.define('edit-personnel-modal', EditPersonnelModal)
window.customElements.define('signed-in-user-card', SignedInUserCard)
window.customElements.define('personnel-card', PersonnelCard)
window.customElements.define('confirm-delete-modal', ConfirmDeleteModal)
window.customElements.define('edit-sign-in-entry',EditSignInEntry)
window.customElements.define('add-admin',AddAdmin)