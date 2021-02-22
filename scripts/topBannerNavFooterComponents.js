class TopBannerComponent extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = ` 
        <div class="container">
        <div class="row mt-2 mb-2">
        <div class=" col-sm">
          <a href="My Site"><img class="mt-3 mb-2" width="100%"  src="https://placeholder.com/wp-content/uploads/2018/10/placeholder.com-logo3.jpg" alt=""></a>
        </div>
        <div class="col-sm mt-3">
        <h4 class="mt-3 center" > <strong href="index.html">Tutor Center</strong></h4>
        </div>
        <div class="col-sm mt-3">
        </div>
        <div class="col-sm mt-3">
        </div>
      </div>
    </div>`;
    }
}



class TopNavComponent extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `<nav class="navbar navbar-expand-lg navbar-dark bg-dark ">
        <div class="container">
        <div class="nav">
        
        <a class="nav-item nav-link text-white" href="admin.html">Admin</a>
          <a  class="nav-item nav-link text-white"  id="logOutTopNav href="">Log in</a>
        </div>
        </div>
      </nav>`;


    }

}

class FooterComponent extends HTMLElement{
    constructor(){
        super();
        this.innerHTML = ` <div class="row bg-dark text-white mt-2">
        <div class="container">
          <div class=" ml-3 mt-3 mb-3">
          <h2>Your Organization</h2>
          <p>123 Street Name<br>
          City, ST<br>
          1234-567889<br>
          (123) 456-7890</p>
        </div>
      </div>
      </div>`
    }
}

class SideNav extends HTMLElement{
  constructor(){
    super();
    let active = this.getAttribute('currentPage')
    this.innerHTML=` <ul class="nav flex-column  nav-pills navbar-light bg-light">
    <li class="nav-item mt-2">
        <a class="nav-link ${active=="courses"?"active":""}" href="courses.html">Courses<span
                class="material-icons float-right">chevron_right</span></a>
    </li>
    <li class="nav-item mt-2">
        <a class="nav-link ${active=="personnel"?"active":""}" href="personnel.html">Personnel<span
                class="material-icons float-right">chevron_right</span></a>
    </li>
    <li class="nav-item mt-2">
        <a class="nav-link ${active=="online-schedule"?"active":""}"  href="online-schedule.html">Online Schedule<span
                class="material-icons float-right">chevron_right</span></a>
    </li>
    <li class="nav-item mt-2">
    <a class="nav-link ${active=="in-person-schedule"?"active":""}"  href="in-person-schedule.html">In Person Schedule<span
            class="material-icons float-right">chevron_right</span></a>
</li>
    <li class="nav-item mt-2 mb-2">
        <a class="nav-link ${active=="reports"?"active":""}" href="reports.html">Reports<span
                class="material-icons float-right">chevron_right</span></a>
    </li>
    <li class="nav-item mt-2 mb-2">
        <a class="nav-link ${active=="editor"?"active":""}" href="facility-tracker-editor.html">Facility Tracker Editor<span
                class="material-icons float-right">chevron_right</span></a>
    </li>
    <li id="logInOut" class="nav-item mt-2 mb-2"><a class="nav-link" href="" data-toggle="modal"
    data-target="#loginModal">Log in</a></li>
    <li class="nav-item mt-2 mb-2"><a class="nav-link" href="" data-toggle="modal"
    data-target="#makeAdminModal">Add Admin</a></li>
</ul>`
  }
}


window.customElements.define('top-banner', TopBannerComponent);
window.customElements.define('top-nav', TopNavComponent);
window.customElements.define('custom-footer',FooterComponent)
window.customElements.define('side-nav',SideNav)
