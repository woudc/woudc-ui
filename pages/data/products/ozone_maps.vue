<template>
  <v-container>
    <h1>{{ $t('data.products.ozone_maps.title') }}</h1>
    <!-- <h2>{{ $t('data.products.common.search') }}</h2> -->
    <v-btn-toggle v-model="searchType" mandatory>
      <v-btn value="global">{{ $t('data.products.ozone_maps.global') }}</v-btn>
      <v-btn value="northern">
        {{ $t('data.products.ozone_maps.northernHemisphere') }}
      </v-btn>
      <v-btn value="southern">
        {{ $t('data.products.ozone_maps.southernHemisphere') }}
      </v-btn>
      <v-btn value="individual">
        {{ $t('data.products.ozone_maps.individualSourced') }}
      </v-btn>
      <v-btn value="archive">
        {{ $t('data.products.ozone_maps.archived') }}
      </v-btn>
    </v-btn-toggle>

    <section v-if="searchType === 'global'">
      <h3>{{ $t('data.products.ozone_maps.globalDesc') }}</h3>
      <v-row>
        <v-col>
          <img
            src="https://exp-studies.tor.ec.gc.ca/archive/ozone_maps/gl/current.gif"
            class="recent"
          />
        </v-col>
        <v-col>
          <img
            src="https://exp-studies.tor.ec.gc.ca/archive/ozone_maps/gl/current_1.gif"
            class="recent"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <img
            src="https://exp-studies.tor.ec.gc.ca/archive/ozone_maps/gl_dev/current.gif"
            class="recent"
          />
        </v-col>
        <v-col>
          <img
            src="https://exp-studies.tor.ec.gc.ca/archive/ozone_maps/gl_dev/current_1.gif"
            class="recent"
          />
        </v-col>
      </v-row>
    </section>

    <section v-if="searchType === 'northern'">
      <h3>{{ $t('data.products.ozone_maps.northernDesc') }}</h3>
      <v-row>
        <v-col>
          <img
            src="https://exp-studies.tor.ec.gc.ca/archive/ozone_maps/nh/current.gif"
            class="recent"
          />
        </v-col>
        <v-col>
          <img
            src="https://exp-studies.tor.ec.gc.ca/archive/ozone_maps/nh/current_1.gif"
            class="recent"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <img
            src="https://exp-studies.tor.ec.gc.ca/archive/ozone_maps/nh_dev/current.gif"
            class="recent"
          />
        </v-col>
        <v-col>
          <img
            src="https://exp-studies.tor.ec.gc.ca/archive/ozone_maps/nh_dev/current_1.gif"
            class="recent"
          />
        </v-col>
      </v-row>
    </section>

    <section v-if="searchType === 'southern'">
      <h3>{{ $t('data.products.ozone_maps.southernDesc') }}</h3>
      <v-row>
        <v-col>
          <img
            src="https://exp-studies.tor.ec.gc.ca/archive/ozone_maps/sh/current.gif"
            class="recent"
          />
        </v-col>
        <v-col>
          <img
            src="https://exp-studies.tor.ec.gc.ca/archive/ozone_maps/sh/current_1.gif"
            class="recent"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <img
            src="https://exp-studies.tor.ec.gc.ca/archive/ozone_maps/sh_dev/current.gif"
            class="recent"
          />
        </v-col>
        <v-col>
          <img
            src="https://exp-studies.tor.ec.gc.ca/archive/ozone_maps/sh_dev/current_1.gif"
            class="recent"
          />
        </v-col>
      </v-row>
    </section>

    <section v-if="searchType === 'individual'">
      <h3>{{ $t('data.products.ozone_maps.individualSourceDesc') }}</h3>
      <v-row>
        <v-col>
          <img
            src="https://exp-studies.tor.ec.gc.ca/tmp/to-n-to-e-9797523419to20231106.gif"
            class="recent"
          />
        </v-col>
        <v-col>
          <img
            src="https://exp-studies.tor.ec.gc.ca/tmp/tg-n-to-e-9797523419tg20231106.gif"
            class="recent"
          />
        </v-col>
        <v-col>
          <img
            src="https://exp-studies.tor.ec.gc.ca/tmp/tk-n-to-e-9797523419tk20231106.gif"
            class="recent"
          />
        </v-col>
      </v-row>
    </section>

    <section v-if="searchType === 'archive'">
      <h3>{{ $t('data.products.ozone_maps.mapsFromArchive') }}</h3>

      <v-row>
        <v-col>
          <v-select
            v-model="archivedHemisphere"
            :items="archivedMapHemispheres"
            :label="$t('data.products.ozone_maps.hemisphere')"
          ></v-select>
          <v-select
            v-model="archivedMeasurement"
            :items="archivedMeasurementTypes"
            :label="$t('data.products.ozone_maps.mapType')"
            multiple
            chips
            required
          ></v-select>
          <v-select
            v-model="archivedDateRangeType"
            :items="archivedDateRangeTypes"
            :label="$t('data.products.ozone_maps.dateRangeType')"
            @change="changeArchiveDateRangeType"
          ></v-select>
        </v-col>
        <v-col>
          <v-text-field
            v-model="archivedDate"
            :label="$t('data.products.ozone_maps.dateSelect')"
            :type="archivedInputRangeType"
            :max="archivedMaxDate"
            required
          ></v-text-field>

          <!-- <v-date-picker
            v-show="!archiveRangeType1IsMonthlyOr10Day"
            v-model="archivedDate"
            :max="archivedMaxDate"
          ></v-date-picker>
          <v-date-picker
            v-show="archiveRangeType1IsMonthlyOr10Day"
            v-model="archivedDate"
            :max="archivedMaxDate"
            type="month"
          ></v-date-picker> -->
          <v-text-field
            v-model="archivedNumToDisplay"
            :label="$t('data.products.ozone_maps.numToDisplay')"
            type="number"
            min="1"
            max="50"
          ></v-text-field>
          <v-text-field
            v-model="archivedIntervalNum"
            :label="$t('data.products.ozone_maps.interval')"
            type="number"
            min="1"
            max="14"
          ></v-text-field>
          <v-select
            v-model="archivedIntervalType"
            :items="archivedMapIntervals"
            :label="$t('data.products.ozone_maps.intervalType')"
          ></v-select>
        </v-col>
      </v-row>

      <h4>{{ $t('data.products.ozone_maps.results') }}</h4>
      <graph-carousel
        v-if="archivedMapSelPath.length > 0"
        :graphs="archivedMapSelPath"
      ></graph-carousel>
    </section>
  </v-container>
</template>

<script>
import { DateTime } from 'luxon'
import GraphCarousel from '~/components/GraphCarousel'

export default {
  components: {
    'graph-carousel': GraphCarousel,
  },
  data() {
    return {
      daysAgo: 1,
      date: '',
      observedOzone: true,
      forecastOzone: 'No',
      mapTypes: ['totalOzone'],
      regions: ['northern'],
      searchType: 'global',
      archivedMeasurement: ['to'],
      archivedDateRangeType: 'daily', // day / 10 day mean / monthly mean
      archivedDate: DateTime.now().minus({ days: 1 }).toISODate(),
      archivedMaxDate: DateTime.now().minus({ days: 1 }).toISODate(),
      archivedNumToDisplay: 1, // 1-20
      archivedIntervalNum: 1, // 1-14
      archivedIntervalType: 'day1',
      archivedHemisphere: 'nh',
    }
  },
  head() {
    return {
      title: this.$t('data.products.ozone_maps.title'),
      titleTemplate: this.$titleTemplate(
        this.$t('common.woudc'),
        this.$t('common.woudcFull')
      ),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('data.products.ozone_maps.description'),
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: this.$t('data.products.ozone_maps.keywords'),
        },
      ],
    }
  },
  computed: {
    archivedMeasurementTypes() {
      return [
        { value: 'de', text: this.$t('data.products.ozone_maps.deviation') }, // subpath: *_dev
        { value: 'to', text: this.$t('data.products.ozone_maps.totalOzone') },
      ]
    },
    archivedMapHemispheres() {
      return [
        { value: 'nh', text: this.$t('data.products.ozone_maps.north') },
        { value: 'sh', text: this.$t('data.products.ozone_maps.south') },
        { value: 'gl', text: this.$t('data.products.ozone_maps.globe') },
      ]
    },
    archivedDateRangeTypes() {
      return [
        { value: 'daily', text: this.$t('data.products.ozone_maps.daily') },
        {
          value: 'monthly', // subpath: *_m
          text: this.$t('data.products.ozone_maps.monthlyMean'),
        },
        {
          value: 'mean01', // subpath: *_x
          text: this.$t('data.products.ozone_maps.day01To10Mean'),
        },
        {
          value: 'mean11', // subpath: *_x
          text: this.$t('data.products.ozone_maps.day11To20Mean'),
        },
        {
          value: 'mean21', // subpath: *_x
          text: this.$t('data.products.ozone_maps.day21ToEndMean'),
        },
      ]
    },
    archivedMapIntervals() {
      let intervals = [
        { value: 'month', text: this.$t('data.products.ozone_maps.month') }, // specific to monthly,
        { value: 'year', text: this.$t('data.products.ozone_maps.year') },
      ]
      if (this.archivedDateRangeType === 'daily') {
        intervals.splice(0, 0, {
          value: 'day1',
          text: this.$t('data.products.ozone_maps.day1'),
        })
      } else if (this.archivedDateRangeType === 'monthly') {
        //
      } else {
        // 10 day mean
        intervals.splice(0, 0, {
          value: 'day10',
          text: this.$t('data.products.ozone_maps.day10'), // 10 day
        })
      }
      return intervals
    },
    archivedIntervals() {
      return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
    },
    archiveRangeType1IsMonthlyOr10Day() {
      return this.archivedDateRangeType !== 'daily'
    },
    archivedInputRangeType() {
      if (this.archivedDateRangeType !== 'daily') {
        return 'month'
      } else {
        return 'date'
      }
    },
    archivedMapSelPath() {
      return this.generateArchiveMapPaths(
        this.archivedDate,
        this.archivedHemisphere,
        this.archivedDateRangeType,
        this.archivedMeasurement,
        this.archivedNumToDisplay,
        this.archivedIntervalNum,
        this.archivedIntervalType
      )
    },
  },
  methods: {
    changeArchiveDateRangeType(changedType) {
      if (changedType === 'daily') {
        this.archivedDate = DateTime.fromISO(this.archivedDate).toISODate()
        this.archivedMaxDate = DateTime.now().minus({ days: 1 }).toISODate()
      } else {
        // monthly or 10 day mean switch to YYYY-MM format
        this.archivedMaxDate = DateTime.now()
          .minus({ months: 1 })
          .toFormat('yyyy-LL')
        if (this.archivedDate > this.archivedMaxDate) {
          this.archivedDate = this.archivedMaxDate.substring(0, 7)
        } else {
          this.archivedDate = this.archivedDate.substring(0, 7)
        }
        // omit daily intervals
        if (changedType.includes('mean')) {
          this.archivedIntervalType = 'day10'
        } else {
          this.archivedIntervalType = 'month'
        }
      }
    },
    /**
     * Returns the text value of a given items' value for Vuetify items
     * @param {string} value - item's value
     * @param {array} arr - the item array
     * @return {string} The item's text value
     */
    itemValueToText(value, arr) {
      const index = arr.map((e) => e.value).indexOf(value)
      return arr[index].text
    },
    /**
     * Returns an array of objects containing the url and text caption of each ozone map given the following queries
     * @param {string} date - YYYY-MM-DD date string
     * @param {string} hemisphere - North, south or the global hemisphere
     * @param {string} dateRangeType - The mean date range calculation type
     * @param {array} measurementTypes - The types of measurements to include: total ozone and/or deviation
     * @param {string} num - Number of past maps to display
     * @param {string} interval - Number of past maps to display by a certain interval time
     * @param {string} intervalType - Number of past maps to display by an interval type: day, 10 day, month, year
     * @return {array} An array of objects containing the url and text caption of each ozone map
     */
    generateArchiveMapPaths(
      date,
      hemisphere,
      dateRangeType,
      measurementTypes, // []
      num,
      interval,
      intervalType
    ) {
      let paths = []
      let initialDate = DateTime.fromISO(date)
      // pre-validation checks
      if (initialDate.isValid === false || measurementTypes.length === 0) {
        return paths
      }
      const meanToSubpathMapping = {
        monthly: '_m',
        mean01: '_x',
        mean11: '_x',
        mean21: '_x',
      }

      // captions
      let captionDateRangeType = this.itemValueToText(
        dateRangeType,
        this.archivedDateRangeTypes
      )
      const captionHemisphere = this.itemValueToText(
        hemisphere,
        this.archivedMapHemispheres
      )

      // index interval 10 day initialization
      let iDay10 = 0 // 0, 1, 2
      if (dateRangeType === 'mean01') {
        iDay10 = 0
      } else if (dateRangeType === 'mean11') {
        iDay10 = 1
      } else if (dateRangeType === 'mean21') {
        iDay10 = 2
      }
      let day10Weeks = [0, 1, 2] // index of 10-day means of a month; filename
      const numDay10Weeks = day10Weeks.length

      let iDeltaAgo = 0
      let day10sAgo = iDay10
      for (let i = 0; i < num; i++) {
        let path = 'https://exp-studies.tor.ec.gc.ca/archive/ozone_maps'
        path += `/${hemisphere}`

        // adjust date (i time ago)
        let iDate = DateTime.fromISO(date)
        if (iDate > this.archivedMaxDate) {
          continue // skip if date is more than max date
        }
        if (i !== 0) {
          iDeltaAgo = i * interval
          let iType = 'days'
          if (intervalType === 'day1') {
            iType = 'days'
          } else if (intervalType === 'day10') {
            iType = 'months'
          } else if (intervalType === 'month') {
            iType = 'months'
          } else if (intervalType === 'year') {
            iType = 'years'
          }

          // special handling for 10 day intervals
          if (intervalType === 'day10') {
            day10sAgo = iDay10 - iDeltaAgo
            const monthsAgo =
              parseInt(Math.ceil(iDay10) - iDeltaAgo) / numDay10Weeks
            iDate = DateTime.fromISO(
              iDate.plus({ [iType]: monthsAgo }).toISODate()
            )
          } else {
            iDate = DateTime.fromISO(
              iDate.minus({ [iType]: iDeltaAgo }).toISODate()
            )
          }
        }

        // 1st subpath: date range type: monthly or 10 day
        if (dateRangeType !== 'daily') {
          path += meanToSubpathMapping[dateRangeType]
        }

        // 1st subpath: deviation
        for (const measureType of measurementTypes) {
          let caption = []
          let pathByMeasureType = path
          if (measureType === 'de') {
            pathByMeasureType += '_dev'
          }

          // caption
          const captionMeasurementType = this.itemValueToText(
            measureType,
            this.archivedMeasurementTypes
          )
          let captionDate = iDate.toFormat('yyyy-LL-dd')

          // 2nd subpath: year
          pathByMeasureType += `/${iDate.toISODate().substring(0, 4)}/`

          // filename: measurement type (to or de)
          pathByMeasureType += `${measureType}`

          // filename: date range type
          if (dateRangeType === 'monthly') {
            pathByMeasureType += `${iDate.toFormat('yyyyLL')}.gif`
            captionDate = iDate.toFormat('yyyy-LL')
          } else if (dateRangeType === 'daily') {
            pathByMeasureType += `${iDate.toFormat('yyyyLLdd')}.gif`
          } else {
            // 10 day
            let i10DayWeek =
              day10Weeks[
                ((day10sAgo % numDay10Weeks) + numDay10Weeks) % numDay10Weeks
              ]
            pathByMeasureType += `${iDate.toFormat(
              'yyyyLL'
            )}${i10DayWeek}1_.gif`
            caption.push(iDate.toFormat('yyyy-LL'))
            captionDateRangeType = this.itemValueToText(
              `mean${i10DayWeek}1`,
              this.archivedDateRangeTypes
            )
          }
          caption.push(captionMeasurementType)
          caption.push(captionHemisphere)
          caption.push(captionDateRangeType)
          caption.push(captionDate)

          paths.push({
            url: pathByMeasureType,
            caption: caption.join(' / '),
          })
        }
      }
      return paths
    },
  },
  nuxtI18n: {
    paths: {
      en: '/data/products/ozone-maps',
      fr: `/donnees/produits/cartes-d'ozone`,
    },
  },
}
</script>

<style scoped>
.recent {
  max-width: 800px;
}
</style>
