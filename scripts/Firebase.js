export default class Firebase {
    constructor(confirebaseConfigfig){
          // Initialize Firebase
          if(firebase==null){firebase.initializeApp(confirebaseConfigfig);}
          this.auth = firebase.auth();
          this.db = firebase.firestore();
          this.storageRef = firebase.storage().ref();
          this.setUpOnAuthChangeListener();
    }

    getCollectionRealtimeData(collection,orderBy,data,renderer){
        data=[];
        this.db.collection(collection).orderBy(orderBy).onSnapshot(querySnapshot => {
            renderer.resetContainer();
            querySnapshot.forEach((doc) => {
                data.push(doc.data())
                renderer.selectRenderer(doc,collection)
            })
            //renderer(data)
        })
    }
    getCollectionRealtimeDataSearch(collection,where,comparatorOperator,value,renderer){
      //data=[];
      this.db.collection(collection).where(where,comparatorOperator,value).onSnapshot(querySnapshot => {
          renderer.resetContainer();
          querySnapshot.forEach((doc) => {
              //data.push(doc.data())
              console.log('in the getting the realitme data')
              console.log(doc.data())
              renderer.selectRenderer(doc,'signIn')
          })
          //renderer(data)
      })
    }
    getCollectionDocs(data,collection){
      data = [];
      this.db.collection(collection).get().then(function(querySnapshot){
        querySnapshot.forEach((doc) => {
          data.push(doc);
        })
        return data;
      })
    }

    getCollectionDataSortedPromise = (collection,orderBy)=>{
      return new Promise((resolve,reject)=>{
        let data = []
        this.db.collection(collection).orderBy(orderBy).get().then(function (querySnapshot){
          querySnapshot.forEach((doc) => {
            data.push(doc);
          })
          resolve(data);
          return ;
        })
        .catch(function(error){
          reject(error)
        })
      })
    }

    getCollectionDataPromise = (collection)=>{
      return new Promise((resolve, reject) => {
        let data = [];
        this.db.collection(collection).get().then(function(querySnapshot){
          querySnapshot.forEach((doc) => {
            data.push(doc);
          })
          resolve(data);
          return ;
        })
        .catch(function(error){
          reject(error)
        })
      });
    }

    updateCollectionDoc = (collectionToUpdate,docToUpdate,dataTupdate) =>{
      return new Promise((resolve, reject) =>{
        console.log("data to update",dataTupdate)
        db.collection(collectionToUpdate).doc(docToUpdate).set(dataTupdate)
      .then(function(docRef) {
        resolve("success")
      })
      .catch(function(error) {
        reject(error);
      });
      })
    }
    
    
    
    
      
    
    setUpOnAuthChangeListener(){
        auth.onAuthStateChanged(user=>{
            console.log('user ',user)
            if(!user){
              //$('#loginModal').modal('show')
              //setLogedOutElements(pageURLQuerySplit)
              //location.reload();
            }
            else{
            user.getIdTokenResult().then(idTokenResult =>{
              user.admin = idTokenResult.claims.admin
              if(user.admin){
                if(document.querySelector('#logInOut')!=undefined){
                  document.querySelector('#logInOut').innerHTML = `<a class="nav-link" href="">Log Out</a>`
                }
                //
                //setLogedInElements(pageURLQuerySplit)
              }
              else{
                if(document.querySelector('#logInOut')!=undefined){
                document.querySelector('#logInOut').innerHTML = `<a class="nav-link" href="" data-toggle="modal" data-target="#loginModal">Log in</a>`
                } 
                //setLogedOutElements(pageURLQuerySplit)
              }
          
          
            })
          }
        })
    }

}