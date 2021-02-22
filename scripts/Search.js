export default class search {
    constructor(){

    }
    filterHtml(searchHtmlInputId,htmlElementsToSearch){
        $(document).ready(function () {
            $(searchHtmlInputId).on("keyup", function () {
                var value = $(this).val().toLowerCase();
                $(htmlElementsToSearch).filter(function () {
                    $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
                });
            });
        });
    }
    lazyLoadSearchListener(searchHtmlInputId,dataToSearchThrough,searchFilterFunction,context,renderer,itemContainer){
        $(searchHtmlInputId).on("keyup", function() {
            console.log(document.querySelector(itemContainer).innerHTML)
            document.querySelector(itemContainer).innerHTML = ''
            console.log('data to search through',dataToSearchThrough)
			var value = $(this).val().toLowerCase();
            let searchResults = [];
            context.index = 0;
            context.currentLoginItems=[]
            for(let i=0;i<dataToSearchThrough.length;i++){
                if(searchFilterFunction(dataToSearchThrough[i],value)){
                    searchResults.push(context.loginItems[i])
                    context.currentLoginItems.push(searchResults[i])
                }
            }
            context.lengthcurrentLoginItems = searchResults
            if(searchResults.length!==0){
            for(let i=0;i<10;i++){
                if(searchResults.length>=i){
                    renderer(searchResults[i])
                    //createRow(searchResults[i])
                }
            }
            searchResults=[]
        }

		});
    }


}