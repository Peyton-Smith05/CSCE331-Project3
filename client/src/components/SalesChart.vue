<template>
    <div class="chart">
        <Bar
        :options="chartOptions"
        :data="chartData"
        />
        <span>
            <button @click="getSalesData()"> Get Data</button>
        </span>
    </div>
    

    <ejs-calendar
    id="calendar-view"
        :min="minDate"
        :max="maxDate"
        :is-multi-selection="isMultiSelection"
        :change="onValueChange"
    />
</template>

<script>
// Importing Calendar.
import { CalendarComponent } from '@syncfusion/ej2-vue-calendars'

// Importing  Chart analysis.
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import InventoryPopupVue from './InventoryPopup.vue'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
    name: 'SalesChart',
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
            datesSelected: [],

            chartData: {
                labels: [ 'January', 'February', 'March' ],
                datasets: [ { data: [40, 20, 12] } ]
            },
            chartOptions: {
                responsive: true
            }
        }
    },
    methods: {
        // Getting sales data from db.
        getSalesData() {
            let date = this.datesSelected[0];
            let offset = date.getTimezoneOffset();
            let utc = new Date(date.getTime() + offset * 60000);
            console.log(date);
        },

        onValueChange: function (args) {
            this.datesSelected = args.values;
        }
    },
  }
</script>

<style>
    /* Importing necessary styling modules to make calendar look pretty. */
    @import "../../node_modules/@syncfusion/ej2-base/styles/material.css";
    @import "../../node_modules/@syncfusion/ej2-buttons/styles/material.css";
    @import "../../node_modules/@syncfusion/ej2-vue-calendars/styles/material.css";

    .chart {
        position: relative;
        top: 20vh;
    }

    #calendar-view {
        position: relative;
        top: 20vh;
        left: 20vw;
        max-height: 40vh;
    }

</style>