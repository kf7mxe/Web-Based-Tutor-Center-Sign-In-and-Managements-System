export default class CoursesEventListeners {
    constructor(){
        this.coursesSetEventListeners();
    }

    coursesSetEventListeners(){
        document.getElementById('courses-table').addEventListener("click", function(e) {
            if(e.target && e.target.nodeName == "BUTTON" && e.target.innerHTML=="Delete") {
                let id = e.path[2].id
                document.querySelector('#confirmDeleteComponent').setAttribute("firebaseid",id)
                $('#confirmDeleteModal').modal('show')
            }
            if(e.target && e.target.nodeName == "BUTTON" && e.target.innerHTML=="Edit") {
                let id = e.path[2].id
                document.querySelector('#editCourseComponent').setAttribute("firebaseid",id)
                $('#editCourseModal').modal('show')
            }
        });
    }

    
}