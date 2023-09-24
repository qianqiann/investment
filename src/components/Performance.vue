<template>
    <div>
        <apexchart width="500" type="line" :options="options" :series="series"></apexchart>
    </div>
</template>
<script>

import VueApexCharts from 'vue-apexcharts'
import { getPerformance } from '../service/rest.js'
export default {
    components: {
        apexchart: VueApexCharts
    },
    props: {
        fundDetail: { required: true, default: null }
    },
    data: () => ({
        options: {
            chart: {
                id: 'Performance (Rate)'
            },
            xaxis: {
                categories: [],
                labels: {
                    show: false,
                }
            }
        },
        series: [{
            name: 'Performance (MYR)',
            data: []
        }],

    }),
    async mounted() {
        if (this.fundDetail) {
            const resp = await getPerformance(this.fundDetail.id);
            if (resp.code == 200) {
                this.series[0].data = Object.keys(resp.data).map(item => resp.data[item]['1. open']);
            }
        }
    },
    watch: {
        async fundDetail() {
            const resp = await getPerformance(this.fundDetail.id);
            if (resp.code == 200) {
                this.series[0].data = Object.keys(resp.data).map(item => resp.data[item]['1. open']);
            }
        }
    }
}

</script>
