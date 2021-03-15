# Web Based Tutor Center Sign In and Managements System
System for keeping record and generating reports for a Tutoring Center Using Firebase Authentication and Firebase Firestore. 

## Allow Students to Sign In 

![sign-in-page-screenshot](https://raw.githubusercontent.com/kf7mxe/Web-Based-Tutor-Center-Sign-In-and-Managements-System/master/other/sign-in-page-screenshot.jpeg)-

## Manage Courses and Personell

![courses-page](https://raw.githubusercontent.com/kf7mxe/Web-Based-Tutor-Center-Sign-In-and-Managements-System/master/other/courses-page.jpeg)-
![personnel-example-page](https://raw.githubusercontent.com/kf7mxe/Web-Based-Tutor-Center-Sign-In-and-Managements-System/master/other/personnel-example-page.jpeg)-

## Change Scheduler

## Generate graphs and PDFs of Dataset
![reports-page](https://raw.githubusercontent.com/kf7mxe/Web-Based-Tutor-Center-Sign-In-and-Managements-System/master/other/reports-page.jpeg)-

## Set Up

### Initialize Firstore and Firebase Authentication
In the scripts/firebaseInitial.js copy your firebase configuration that you can generate from your firebase console to the javascript file in the json object.
Also be sure to turn on firebase Authentication and Firstore on the firebase console

### Add Admin
This system uses Firebase Tokens to only allow admins to change data. 
In order for this to work you need to deploy the firebase function in the functions folder in the index.js file. Details on how to deploy firebase functions can be found on firebase http://firebase.google.com/. 

If you don't have an admin token added to a firebase auth account you will need to alter the function to turn off temporarelly the firebase admin token if statements to allow you to initially set up an admin when there is now admin. 
`    if(context.auth ===undefined){
      return{error:"only admins can add admins"}
    }
    if(context.auth.token.admin!==true){
        return {error:"only admins can add admins"}
    }`
Then re-enable the above code to lock down and secure your data and redeploy your functions. Now you can add Admins from the add admin UI.



