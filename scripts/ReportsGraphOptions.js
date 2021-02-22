export default class ReportsGraphOptions{
    
    constructor(){
    }
    generateOptions(graph) {
        let options = {}
        let text = ''
        let yLableString = ''
        if (graph == 'hourlyAnalysisChart') {
            text = 'Student Count per Hour by Day'
        }
        if (graph == 'dailyAnalysisChart') {
            text = 'Student Count per Hour by Major'
        }
        if (graph == 'topCourses') {
            text = 'Top Courses by Major'
        }
        if (graph == 'usageById') {
            text = 'Most Frequent Patrons'
        }
        if (graph == 'sessionLength') {
            text = 'Average Session Time per Major by Rank'
            yLableString = 'Minutes'
        }
        if (graph == 'confidenceLevel') {
            text = 'Level of Confidence with Course Material'
        }
        if (graph == 'purposeOfVisit') {
            text = 'Purpose of Student Visits to Tutor Center'
        }
        if (graph == 'hourlyAnalysisChart' || graph == 'dailyAnalysisChart' || graph == 'sessionLength' || graph ==
            'confidenceLevel' || graph == 'purposeOfVisit' || graph == 'topCourses' || graph == 'usageById') {
            options = {
                title: {
                    display: true,
                    text: graph = text
                },
                tooltips: {
                    mode: 'index',
                    intersect: false
                },
                responsive: true,
                scales: {
                    xAxes: [{
                        stacked: true,
                    }],
                    yAxes: [{
                        stacked: true,
                        scaleLabel: {
                            display: true,
                            labelString: yLableString
                        }
                    }]
                },
                animation:{
                    duration:0
                },
                tooltips:{
                    enabled:false
                }
            }
        }

        if (graph == 'usageChart') {
            options = {
                plugins: {
                    filler: {
                        propagate: false
                    }
                },
                spanGaps: false,
                elements: {
                    line: {
                        tension: 0.000001
                    },
                },
                scales: {
                    yAxes: [{
                        stacked: true
                    }]
                },
                animation:{
                    duration:0
                },
                tooltips:{
                    enabled:false
                }
            }
        }
        return options
    }
}