import HTMLElementRenderer from "/scripts/HTMLRenderer.js"
export default class FacilityTrackerEventListeners {
    constructor(context) {
        this.context = context
        this.HTMLElementRenderer = new HTMLElementRenderer()
        this.inPersonTrackerTableClickListener();
        $('.modal').on('hide.bs.modal', function (e) {
            context.fillRowsWithData();
            // enable your handler
          })
    }
    inPersonTrackerTableClickListener(){
            document.getElementById('inPersonTrackerTable').addEventListener("click", function (e) {
                console.log("in Event listeners")
            let id = e.path[2].id
            // e.target is the clicked element!
            // If it was a list item

            if (e.target && e.target.nodeName == "BUTTON" && e.target.innerHTML == "Delete") {
                let id = e.path[2].id
                document.querySelector('#confirmDeleteComponent').setAttribute("firebaseid", id)
                $('#confirmDeleteModal').modal('show')
            }
            if (e.target && e.target.nodeName == "BUTTON" && e.target.innerHTML == "Edit") {
                let id = e.path[2].id
                document.querySelector('#editSignInComponent').setAttribute("firebaseid", id)
                $('#editSignInEntryModal').modal('show')
            }
        });
    }
}