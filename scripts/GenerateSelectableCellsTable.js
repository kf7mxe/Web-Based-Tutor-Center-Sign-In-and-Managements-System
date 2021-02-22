export default class GenerateSelectableCellsTable{
    constructor(){
        this.tableHtml = '';
        this.time=0;
    }


generateEditTable(data,tableConfig, incrementTimeFunction,headerFunction,rowRendererFunction){
    this.tableHtml ='';
    this.time = tableConfig.startingTime;
    for(let i=0;i<tableConfig.rows;i++){
        this.tableHtml = this.tableHtml + `<tr>`
        //time = i%2==0?time+100:time;

        incrementTimeFunction(i);
        this.time = incrementTimeFunction(i,this.time)

        for(let j=0;j<tableConfig.cols;j++){
            //let headerTime = (i%2==0?time:time)>1200?((i%2==0?time+70-100:time))-1170:(i%2==0?time:time+30)
            let headerRow = headerFunction(i,this.time);
            this.tableHtml = rowRendererFunction(i,j,data,headerRow,this.tableHtml)

        }
        this.tableHtml = this.tableHtml + `</tr>`
    }
    return this.tableHtml;
}

incrementTimeEveryThirtyMin(i,time){
    return (i%2==0?time+100:time);
}

getHeaderTime(i,time){
     return (i%2==0?time:time)>1200?((i%2==0?time+70-100:time))-1170:(i%2==0?time:time+30)
}

tutorCenterScheduleRenderer(i,j,data,headerTime,tableHtml){
    if(j==0){
        tableHtml = tableHtml + `<td class="" headers="ColHdrBE RowHdr2000Hrs">${data[i][j]}</td>`
    }
    if(j==1){
        tableHtml = tableHtml + `<td id="${i},${j}" class="${data[i][j]=="X"?"bg-info":"text-white"} " headers="ColHdrBE RowHdr${headerTime}Hrs">${data[i][j]}</td>`
    }
    if(j==2){
        tableHtml = tableHtml + `<td id="${i},${j}" class="${data[i][j]=="X"?"bg-success":"text-white"} " headers="ColHdrCEE RowHdr${headerTime}Hrs">${data[i][j]}</td>`
    }
    if(j==3){
        tableHtml = tableHtml + `<td id="${i},${j}" class="${data[i][j]=="X"?"bg-warning":"text-white"} " headers="ColHdrEE RowHdr${headerTime}Hrs">${data[i][j]}</td>`
    }
    if(j==4){
        tableHtml = tableHtml + `<td id="${i},${j}" class="${data[i][j]=="X"?"bg-warning":"text-white"} " headers="ColHdrCMPE RowHdr${headerTime}Hrs">${data[i][j]}</td>`
    }
    if(j==5){
        tableHtml = tableHtml + `<td id="${i},${j}" class="${data[i][j]=="X"?"bg-danger":"text-white"} " headers="ColHdrMAE RowHdr${headerTime}Hrs">${data[i][j]}</td>`
    }
    return tableHtml;
}
}