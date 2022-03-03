<script>
import { Bar, mixins } from 'vue-chartjs'

export default {
  name: 'MetricsChart',
  extends: Bar,
  mixins: [mixins.reactiveData],
  props: {
    startdate: { type: Number, required: true },
    enddate: { type: Number, required: true },
    metrics: { type: Object, required: true },
  },
  data() {
    return {
      barChartOptions: {
        barValueSpacing: 20,
        legend: {
          position: 'top',
          align: 'end',
        },
        maintainAspectRatio: false,
        responsive: true,
        scales: {
          yAxes: [{ id: 'observations' }, { id: 'files' }],
        },
      },
    }
  },
  computed: {
    barChartDefinition() {
      return {
        labels: this.yearRange,
        datasets: [
          {
            label: 'Total Files',
            backgroundColor: this.$vuetify.theme.currentTheme.accent,
            data: this.createMetricsSummary('totalFiles'),
            yAxisID: 'files',
          },
          {
            label: 'Total Observations',
            backgroundColor: this.$vuetify.theme.currentTheme.primary,
            data: this.createMetricsSummary('totalObs'),
            yAxisID: 'observations',
          },
        ],
      }
    },
    yearRange() {
      return this.range(this.startdate, this.enddate)
    },
  },
  watch: {
    startdate() {
      this.renderChart(this.barChartDefinition, this.barChartOptions)
    },
    enddate() {
      this.renderChart(this.barChartDefinition, this.barChartOptions)
    },
    metrics() {
      this.renderChart(this.barChartDefinition, this.barChartOptions)
    },
  },
  mounted() {
    this.renderChart(this.barChartDefinition, this.barChartOptions)
  },
  methods: {
    // Create an array of integers starting from <start> and
    // increasing up to <end>.
    range(start, end) {
      return [...Array(end - start + 1).keys()].map((num) => {
        return (num + start).toString()
      })
    },
    // Returns an array of metrics named by the <key> argument as a key into
    // the <metrics> property. Each element corresponds to a year between
    // <startdate> and <enddate> in increasing order.
    createMetricsSummary(key) {
      return this.yearRange.map((year) => {
        if (year in this.metrics) {
          return this.metrics[year][key]
        } else {
          return 0
        }
      })
    },
  },
}
</script>
