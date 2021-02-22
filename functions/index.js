const functions = require('firebase-functions');
const admin = require('firebase-admin')
admin.initializeApp();

exports.addAdminRole = functions.https.onCall((data,context)=>{
    if(context.auth ===undefined){
      return{error:"only admins can add admins"}
    }
    if(context.auth.token.admin!==true){
        return {error:"only admins can add admins"}
    }
return admin.auth().getUserByEmail(data.email).then(user=>{
    return admin.auth().setCustomUserClaims(user.uid, {
        admin:true
    });
}).then(()=>{
    return {message:`success ${data.email} is now a admin`};
}).catch(err=>{
    return err;
});
});
