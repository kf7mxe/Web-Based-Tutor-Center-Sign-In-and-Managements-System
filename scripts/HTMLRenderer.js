export default class HTMLRenderer {
    constructor(htmlContainerId){
        this.container = document.querySelector(htmlContainerId)
    }
    selectRenderer(data,whichRenderer){
        switch(whichRenderer){
            case 'courses':
                this.coursesHtmlRenderer(data);
                break;
            case 'personnel':
                this.personnelHtmlRenderer(data);
                break;
            case 'signIn':
                this.signInCardHtmlRenderer(data);
        }
    }
    
    coursesHtmlRenderer(doc){
        let data = doc.data();
        let item = ` <tr id=${doc.id}>
<td>${data.coursePrefix}</td>
<td>${data.courseNumber}</td>
<td>${data.courseDescription}</td>
<td>${data.course}</td>
<td><button class="btn btn-primary">Edit</button></td>
<td><button class="btn btn-danger">Delete</button></td>
</tr>`
this.container.innerHTML = this.container.innerHTML  + item;
    }

    personnelHtmlRenderer(doc){
        let data = doc.data();
        let item =
            `<div class="col-sm-3">
<personnel-card id="${doc.id}" imgUrl="${data.imgUrl}" firstName="${data.firstName}" lastName="${data.lastName}"></personnel-card></div>`;
        this.container.innerHTML = this.container.innerHTML  + item;
    }

    facilityTrackerEditorHtmlRenderer(doc){
        if(doc!=undefined){
        let data = doc.data();
        let listItem = ` <tr id=${doc.id} >
                        <td>${data.aNumber}</td>
                        <td>${data.major}</td>
                        <td>${data.classRank}</td>
                        <td>${data.confidence}</td>
                        <td>${data.course}</td>
                        <td>${data.dayOfWeek}</td>
                        <td>${data.date}</td>
                        <td>${data.timeIn}</td>
                        <td>${data.timeOut}</td>
                        <td><button class="btn btn-primary">Edit</button></td>
                        <td><button class="btn btn-danger">Delete</button></td>
                        </tr>`
                        document.getElementById('inPersonTrackerTable').innerHTML += listItem;
                    }
    }

    signInCardHtmlRenderer(doc){
        let item =  `<signed-in-user-card a-number="${doc.data().aNumber}" timeIn="${doc.data().timeIn}" id="${doc.id}"></signed-in-user-card>`
        this.container.innerHTML = this.container.innerHTML  + item;
    }

    resetContainer(){
        if(this.container!=null){
            this.container.innerHTML = '';
        }
    }
}