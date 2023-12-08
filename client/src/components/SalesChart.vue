<template>
    <div class="sales-wrapper">
        <div class="chart">
            <Bar
            :options="computedChartOptions"
            :data="computedChartData"
            />
        </div>
        
        <div class="right-wrap">
            <ejs-calendar
            id="calendar-view"
            :min="minDate"
            :max="maxDate"
            :value="initDate"
            :is-multi-selection="isMultiSelection"
            :change="onValueChange"
            />
            <button id="get-data-btn" @click="getSalesData()"> Get Data</button>
        </div>
    </div>
</template>

<script>
// Importing Calendar.
import { CalendarComponent } from '@syncfusion/ej2-vue-calendars'

// Importing  Chart analysis.
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import { Colors } from 'chart.js'

// API-specific
import axios from 'axios';
const apiRedirect = (window.location.href.slice(0,17) == "http://localhost:") ? "http://localhost:3000/api" : "/api";

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, Colors)

export default {
    components: {
        Bar,
        'ejs-calendar': CalendarComponent
    },
    data() {
        return {
            // Calendar-specific variables.
            isMultiSelection: true,
            
            // Min and max date.
            minDate: new Date("01/01/2022"),
            maxDate: new Date(),
            initDate: new Date("01/01/2022"),
            
            axiosAPIBody: {
                datesSelected: [],
            },
            
            chartData: {
                labels: [],
                datasets: [ { 
                    label: 'Total Sales',
                    data: [],
                    borderColor: '#220000FF',
                    backgroundColor: '#FF000055', 
                } ],
                legend: "Sales"
            },
            chartOptions: {
                responsive: true,
                maintainAspectRation: false,
            }
        }
    },
    methods: {
        // Getting sales data from db.
        async getSalesData() {
            if (this.axiosAPIBody.datesSelected.length == 0) {return;}
            // Create API Request to request dats.
            const dataRequestAPI = apiRedirect + "/manager/api/orders_data";
            try {
                const response = await axios.get(dataRequestAPI, this.axiosAPIBody);
                
                let data = response.data.result;
                this.plotGraph(data);
            } catch(err) {
                console.error(err);
                err = "Could get sales data.";
            }
        },
        
        // Note data has format:
        /*
        result = [DataObject]
        Where DataObject=
        {
            dataDate: "" // Date data was retrieved.
            data: [{
                rows: [{
                    total: // Value we want to extract.
                }]
            }] // Array containing all the resulting data resulting from dataDate;
        }
        */
       plotGraph(result) {
           // Creating arrays for labeling.
           var resultingLabels = [];
           var resultingTotals = [];
           for(let index = 0; index < result.length; index++) {
               resultingLabels.push(result[index].dataDate);
               let curSales = result[index].data.rows;
               let curTotalSum = 0;
               for(let data_index = 0; data_index < curSales.length ; data_index++) {
                   curTotalSum += curSales[data_index].total;
                }
                resultingTotals.push(Math.round(curTotalSum));
            }  
            
            // Transfering resulting information to chart.
            this.chartData = {
                labels: resultingLabels,
                datasets: [ { 
                    label: 'Total Sales',
                    data: resultingTotals,
                    borderColor: '#220000FF',
                    backgroundColor: '#FF000055', 
                } ],
                legend: "Sales"
            };

            this.chartOptions = {
                responsive: true,
                maintainAspectRation: false,
            };
        },
        
        onValueChange: function (args) {
            this.axiosAPIBody.datesSelected = args.values;
        },
    },
    computed: {
      computedChartData: function() { return this.chartData; },
      computedChartOptions: function() { return this.chartOptions; },
    },
}
</script>

<style>
    /* Importing necessary styling modules to make calendar look pretty. */
    @import "../../node_modules/@syncfusion/ej2-base/styles/material.css";
    @import "../../node_modules/@syncfusion/ej2-buttons/styles/material.css";
    @import "../../node_modules/@syncfusion/ej2-vue-calendars/styles/material.css";
    
    
    .sales-wrapper {
        --bone_white: #ccc;
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
    }
    
    .chart {
        background: white;
        border: 20px solid var(--bone_white);
        position: relative;
        top: 20vh;
        left: 10vw;
        width: 50vw;
        height: 60vh;
    }
    
    .right-wrap {
        display: flex;
    }
    
    #calendar-view {
        border: 50px solid var(--bone_white);
        position: absolute;
        top: 20vh;
        right: 10vw;
        max-width: 25vw;
        max-height: 50vh;
    }

    #get-data-btn {
        position: absolute;
        top: 70vh;
        right: 20vw;
        background-color: #ff0000;
        color: #fff;
        border: none;
        padding: 10px 20px;
        margin: 10px;
        cursor: pointer;
    }

</style>
