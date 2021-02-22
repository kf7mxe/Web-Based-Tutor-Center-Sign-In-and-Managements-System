// auth.onAuthStateChanged(user=>{
//     console.log('user ',user)
//     if(!user){
//       //$('#loginModal').modal('show')
//       //setLogedOutElements(pageURLQuerySplit)
//       //location.reload();
//     }
//     else{
//     user.getIdTokenResult().then(idTokenResult =>{
//       user.admin = idTokenResult.claims.admin
//       if(user.admin){
//         document.querySelector('#logInOut').innerHTML = `<a class="nav-link" href="">Log Out</a>`
//         //
//         //setLogedInElements(pageURLQuerySplit)
//       }
//       else{
//         document.querySelector('#logInOut').innerHTML = `<a class="nav-link" href="" data-toggle="modal" data-target="#loginModal">Log in</a>`
//         //setLogedOutElements(pageURLQuerySplit)
//       }
  
  
//     })
//   }
  
  // })
if(document.querySelector('#logInOut')!=undefined){
  document.querySelector('#logInOut').addEventListener('click',function(){
    if(this.innerHTML==`<a class="nav-link" href="">Log Out</a>`){
      firebase.auth().signOut().then(function() {
        this.innerHTML =`<a class="nav-link" href="" data-toggle="modal" data-target="#loginModal">Log in</a>`
        
      }, function(error) {
        // An error happened.
      });
    }
    else{
      $('#loginModal').modal('show')
    }
  })
}

