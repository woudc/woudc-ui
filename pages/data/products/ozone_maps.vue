<template>
  <v-container>
    <h1>{{ $t('data.products.ozone_maps.title') }}</h1>
    <!-- <h2>{{ $t('data.products.common.search') }}</h2> -->
    <v-btn-toggle v-model="ozoneMapTab" mandatory>
      <v-btn value="global">{{ $t('data.products.ozone_maps.global') }}</v-btn>
      <v-btn value="northern">
        {{ $t('data.products.ozone_maps.northernHemisphere') }}
      </v-btn>
      <v-btn value="southern">
        {{ $t('data.products.ozone_maps.southernHemisphere') }}
      </v-btn>
      <v-btn value="sourcedForecast">
        {{ $t('data.products.ozone_maps.sourcedForecast') }}
      </v-btn>
      <v-btn value="observed">
        {{ $t('data.products.ozone_maps.sourcedObserved') }}
      </v-btn>
      <v-btn value="archive">
        {{ $t('data.products.ozone_maps.archived') }}
      </v-btn>
    </v-btn-toggle>

    <section v-if="ozoneMapTab === 'global'">
      <h2>{{ $t('data.products.ozone_maps.globalDesc') }}</h2>
      <v-row>
        <v-col>
          <ozone-maps-info />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <img :src="`${baseOzoneURL}/gl/current.gif`" class="recent" />
        </v-col>
        <v-col>
          <img :src="`${baseOzoneURL}/gl/current_1.gif`" class="recent" />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <img :src="`${baseOzoneURL}/gl_dev/current.gif`" class="recent" />
        </v-col>
        <v-col>
          <img :src="`${baseOzoneURL}/gl_dev/current_1.gif`" class="recent" />
        </v-col>
      </v-row>
    </section>

    <section v-if="ozoneMapTab === 'northern'">
      <h2>{{ $t('data.products.ozone_maps.northernDesc') }}</h2>
      <v-row>
        <v-col>
          <ozone-maps-info />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <img :src="`${baseOzoneURL}/nh/current.gif`" class="recent" />
        </v-col>
        <v-col>
          <img :src="`${baseOzoneURL}/nh/current_1.gif`" class="recent" />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <img :src="`${baseOzoneURL}/nh_dev/current.gif`" class="recent" />
        </v-col>
        <v-col>
          <img :src="`${baseOzoneURL}/nh_dev/current_1.gif`" class="recent" />
        </v-col>
      </v-row>
    </section>

    <section v-if="ozoneMapTab === 'southern'">
      <h2>{{ $t('data.products.ozone_maps.southernDesc') }}</h2>
      <v-row>
        <v-col>
          <ozone-maps-info />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <img :src="`${baseOzoneURL}/sh/current.gif`" class="recent" />
        </v-col>
        <v-col>
          <img :src="`${baseOzoneURL}/sh/current_1.gif`" class="recent" />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <img :src="`${baseOzoneURL}/sh_dev/current.gif`" class="recent" />
        </v-col>
        <v-col>
          <img :src="`${baseOzoneURL}/sh_dev/current_1.gif`" class="recent" />
        </v-col>
      </v-row>
    </section>

    <section v-show="ozoneMapTab === 'sourcedForecast'">
      <h2>{{ $t('data.products.ozone_maps.sourcedForecastDesc') }}</h2>

      <v-row>
        <v-col>
          <ozone-maps-detailed-info></ozone-maps-detailed-info>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
            v-model="sourcedForecastDate"
            :label="$t('data.products.ozone_maps.dateSelect')"
            type="date"
            :max="sourcedMaxDate"
            :min="sourcedForecastMinDate"
            :rules="[ruleRequired, ruleSourcedForecastDate]"
            required
            @input="generateSourcedForecastMapPaths"
          ></v-text-field>
          <v-select
            v-model="sourcedForecastType"
            :items="itemsForecastTypes"
            :label="$t('data.products.ozone_maps.forecastType')"
            :rules="[ruleRequired]"
            required
            @change="generateSourcedForecastMapPaths"
          ></v-select>
          <v-select
            v-model="sourcedForecastMeasurement"
            :items="itemsMeasurementType"
            :label="$t('data.products.ozone_maps.mapType')"
            :rules="[ruleRequired]"
            multiple
            chips
            required
            @change="generateSourcedForecastMapPaths"
          ></v-select>
          <v-select
            v-model="sourcedForecastHemisphere"
            :items="itemsMapHemisphere"
            :label="$t('data.products.ozone_maps.hemisphere')"
            :rules="[ruleRequired]"
            multiple
            chips
            required
            @change="generateSourcedForecastMapPaths"
          ></v-select>

          <v-overlay absolute opacity="0.66" :value="sourcedForecastLoading">
            <v-progress-circular indeterminate />
          </v-overlay>
        </v-col>
      </v-row>

      <h3 class="mt-2">
        {{ $t('data.products.ozone_maps.sourcedForecastResults') }}
      </h3>

      <div v-if="Object.hasOwn(sourcedForecastMapPaths, '0')">
        <div
          v-for="(forecastDayNPaths, index) in sourcedForecastMapPaths"
          :key="index"
        >
          <h3 class="mt-2">
            {{
              $tc('data.products.ozone_maps.dayForecast', index, {
                forecastNum: index,
              })
            }}
            - {{ forecastDayNPaths.date }}
          </h3>
          <graph-carousel
            v-if="forecastDayNPaths.maps.length > 0"
            :key="sourcedForecastRerender"
            :graphs="forecastDayNPaths.maps"
          ></graph-carousel>
          <div v-else>
            <span class="font-italic">
              {{ $t('common.noResultsAvailable') }}
            </span>
          </div>
        </div>
      </div>
    </section>

    <section v-show="ozoneMapTab === 'observed'">
      <h2>{{ $t('data.products.ozone_maps.sourceObservedDesc') }}</h2>
      <v-row>
        <v-col>
          <v-text-field
            v-model="sourcedObservedDate"
            :label="$t('data.products.ozone_maps.dateSelect')"
            type="date"
            :max="sourcedMaxDate"
            :min="sourcedObservedMinDate"
            :rules="[ruleRequired, ruleSourcedObservedDate]"
            required
            @input="generateSourcedObservedMapPaths"
          ></v-text-field>
          <v-select
            v-model="sourcedObservedMeasurement"
            :items="itemsMeasurementType"
            :label="$t('data.products.ozone_maps.mapType')"
            :rules="[ruleRequired]"
            multiple
            chips
            required
            @change="generateSourcedObservedMapPaths"
          ></v-select>
          <v-select
            v-model="sourcedObservedHemisphere"
            :items="itemsMapHemisphere"
            :label="$t('data.products.ozone_maps.hemisphere')"
            :rules="[ruleRequired]"
            multiple
            chips
            required
            @change="generateSourcedObservedMapPaths"
          ></v-select>
        </v-col>
        <v-overlay absolute opacity="0.66" :value="sourcedObservedLoading">
          <v-progress-circular indeterminate />
        </v-overlay>
      </v-row>

      <h3 class="mt-2">
        {{ $t('data.products.ozone_maps.sourcedObservedResults') }}
      </h3>

      <div v-if="Object.keys(sourcedObservedMapPaths).length > 0">
        <div
          v-for="(pathsByHemisphere, index) in sourcedObservedMapPaths"
          :key="index"
        >
          <h3 class="mt-2">{{ pathsByHemisphere.hemisphere }}</h3>
          <graph-carousel
            v-if="pathsByHemisphere.maps.length > 0"
            :key="sourcedObservedRerender"
            :graphs="pathsByHemisphere.maps"
          ></graph-carousel>
          <div v-else>
            <span class="font-italic">
              {{ $t('common.noResultsAvailable') }}
            </span>
          </div>
        </div>
      </div>
    </section>

    <section v-show="ozoneMapTab === 'archive'">
      <h2>{{ $t('data.products.ozone_maps.mapsFromArchive') }}</h2>

      <v-row>
        <v-col>
          <v-expansion-panels accordion hover>
            <v-expansion-panel>
              <v-expansion-panel-header disable-icon-rotate>
                {{ $t('data.products.ozone_maps.ozoneMapsInfo') }}
                <template #actions>
                  <v-icon color="info">mdi-information</v-icon>
                </template>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-alert color="info" outlined text border="left">
                  <i18n
                    path="data.products.ozone_maps.aboutMeasurements"
                    tag="p"
                  ></i18n>
                  <i18n
                    path="data.products.ozone_maps.aboutDeviations"
                    tag="p"
                  ></i18n>
                  <i18n
                    path="data.products.ozone_maps.aboutPoorCoverage"
                    tag="p"
                  ></i18n>
                  <i18n
                    path="data.products.ozone_maps.aboutDateInterval"
                    tag="p"
                  ></i18n>
                </v-alert>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-select
            v-model="archivedHemisphere"
            :items="itemsMapHemisphere"
            :label="$t('data.products.ozone_maps.hemisphere')"
            :rules="[ruleRequired]"
          ></v-select>
          <v-select
            v-model="archivedMeasurement"
            :items="itemsMeasurementType"
            :label="$t('data.products.ozone_maps.mapType')"
            :rules="[ruleRequired]"
            multiple
            chips
            required
          ></v-select>
          <v-select
            v-model="archivedDateRangeType"
            :items="archivedDateRangeTypes"
            :label="$t('data.products.ozone_maps.dateRangeType')"
            :rules="[ruleRequired]"
            @change="changeArchiveDateRangeType"
          ></v-select>
        </v-col>
        <v-col>
          <v-text-field
            v-model="archivedDate"
            :label="$t('data.products.ozone_maps.dateSelect')"
            :type="archivedInputRangeType"
            :max="archivedMaxDate"
            :min="archivedMinDate"
            :rules="[ruleRequired, ruleArchivedDate]"
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
            :rules="[ruleRequired]"
            type="number"
            min="1"
            max="50"
          ></v-text-field>
          <v-text-field
            v-model="archivedIntervalNum"
            :label="$t('data.products.ozone_maps.interval')"
            :rules="[ruleRequired]"
            type="number"
            min="1"
            max="14"
          ></v-text-field>
          <v-select
            v-model="archivedIntervalType"
            :items="archivedMapIntervals"
            :label="$t('data.products.ozone_maps.intervalType')"
            :rules="[ruleRequired]"
          ></v-select>
        </v-col>
      </v-row>

      <h3 class="mt-2">{{ $t('data.products.ozone_maps.results') }}</h3>
      <graph-carousel
        v-if="archivedMapSelPath.length > 0"
        :graphs="archivedMapSelPath"
      ></graph-carousel>
      <div v-else>
        <span class="font-italic">
          {{ $t('common.noResultsAvailable') }}
        </span>
      </div>
    </section>
  </v-container>
</template>

<script>
import { DateTime } from 'luxon'
import GraphCarousel from '~/components/GraphCarousel'
import OzoneMapsInfo from '~/components/OzoneMapsInfo'
import OzoneMapsDetailedInfo from '~/components/OzoneMapsDetailedInfo'

export default {
  components: {
    'graph-carousel': GraphCarousel,
    'ozone-maps-info': OzoneMapsInfo,
    'ozone-maps-detailed-info': OzoneMapsDetailedInfo,
  },
  data() {
    return {
      baseOzoneURL: `${this.$config.WOUDC_UI_WAF_URL}/products/ozone_maps`,
      ozoneMapTab: 'global',
      archivedRerender: 0,
      archivedMeasurement: ['to'],
      archivedDateRangeType: 'daily', // day / 10 day mean / monthly mean
      archivedDate: DateTime.now().minus({ days: 1 }).toISODate(),
      archivedMaxDate: DateTime.now().minus({ days: 1 }).toISODate(),
      archivedMinDate: DateTime.fromISO('1970-01-01').toISODate(),
      archivedNumToDisplay: 4, // 1-20
      archivedIntervalNum: 1, // 1-14
      archivedIntervalType: 'day1',
      archivedHemisphere: 'nh',
      sourcedMaxDate: DateTime.now().minus({ days: 1 }).toISODate(),
      sourcedForecastRerender: 0,
      sourcedForecastMinDate: DateTime.fromISO('2002-01-01').toISODate(),
      sourcedForecastHemisphere: ['gl'], // north / south / global
      sourcedForecastDate: DateTime.now().minus({ days: 1 }).toISODate(),
      sourcedForecastType: 'onThisDay', // forecasts for this day / prepared on this day
      sourcedForecastMeasurement: ['to'], // total ozone / std dev.
      sourcedForecastSubPaths: [],
      sourcedForecastMapPaths: {},
      sourcedForecastPathsVerified: false,
      sourcedForecastLoading: false,
      sourcedObservedRerender: 0,
      sourcedObservedMinDate: DateTime.fromISO('2000-01-01').toISODate(),
      sourcedObservedDate: DateTime.now().minus({ days: 1 }).toISODate(),
      sourcedObservedHemisphere: ['gl'], // north / south / global
      sourcedObservedMeasurement: ['to'], // total ozone / std dev.
      sourcedObservedSubPaths: [],
      sourcedObservedMapPaths: {},
      sourcedObservedPathsVerified: false,
      sourcedObservedLoading: false,
      measurementTypeAbbreviations: {
        // for filepathing control
        de: 'd',
        to: 't',
      },
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
    // toYYYYMMDD.gif is Total Ozone (combination of all sources).
    // tv is TOVS, tt is TOAST, tg is Ground Based (i.e. Brewers), ts is SMOBA, tp is TOMS, tm is GOME.
    // All these are located whereever data were available.
    // For example nh500/2013 has plots for tg, tk, tm, to, tp, ts and tt.
    // Meanwhile nh500/2020 has only tg, tk, to and tt.  So any source can show up in any subdirectory.
    // e = deviation combined sources
    // o = total ozone combined sources
    sourcedAbbreviations() {
      return {
        observed: {
          o: this.$t('data.products.ozone_maps.dt.allSourcesBlended'),
          g: this.$t('data.products.ozone_maps.dt.groundBasedData'),
          m: this.$t('data.products.ozone_maps.dt.gome'),
          k: this.$t('data.products.ozone_maps.dt.knmi'),
          s: this.$t('data.products.ozone_maps.dt.smoba'),
          t: this.$t('data.products.ozone_maps.dt.toast'),
          p: this.$t('data.products.ozone_maps.dt.toms'),
          v: this.$t('data.products.ozone_maps.dt.tovs'),
        },
        forecasted: {
          k: this.$t('data.products.ozone_maps.dt.knmi'),
          n: this.$t('data.products.ozone_maps.dt.ncep'),
        },
      }
    },
    itemsMeasurementType() {
      return [
        { value: 'de', text: this.$t('data.products.ozone_maps.deviation') }, // subpath: *_dev
        { value: 'to', text: this.$t('data.products.ozone_maps.totalOzone') },
      ]
    },
    itemsMapHemisphere() {
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
    itemsForecastTypes() {
      return [
        {
          value: 'forThisDay',
          text: this.$t('data.products.ozone_maps.forecastOnThisDay'),
        },
        {
          value: 'onThisDay',
          text: this.$t('data.products.ozone_maps.forcastForThisDay'),
        },
      ]
    },
    archivedDateIsValid() {
      let date = DateTime.fromISO(this.archivedDate)
      if (this.archiveRangeType1IsMonthlyOr10Day) {
        return (
          date.isValid &&
          date.toFormat('yyyy-LL') <= this.archivedMaxDate &&
          date.toFormat('yyyy-LL') >= this.archivedMinDate
        )
      } else {
        return (
          date.isValid &&
          date.toFormat('yyyy-LL-dd') <= this.archivedMaxDate &&
          date.toFormat('yyyy-LL-dd') >= this.archivedMinDate
        )
      }
    },
    sourcedObservedDateIsValid() {
      let date = DateTime.fromISO(this.sourcedObservedDate)
      return (
        date.isValid &&
        date.toFormat('yyyy-LL-dd') <= this.sourcedMaxDate &&
        date.toFormat('yyyy-LL-dd') >= this.sourcedObservedMinDate
      )
    },
    sourcedForecastDateIsValid() {
      let date = DateTime.fromISO(this.sourcedForecastDate)
      return (
        date.isValid &&
        date.toFormat('yyyy-LL-dd') <= this.sourcedMaxDate &&
        date.toFormat('yyyy-LL-dd') >= this.sourcedForecastMinDate
      )
    },
    ruleRequired() {
      return (value) => {
        if (Array.isArray(value)) {
          return value.length > 0 || this.$t('error.requiredField')
        }
        return !!value || this.$t('error.requiredField')
      }
    },
    ruleSourcedForecastDate() {
      return (
        !!this.sourcedForecastDateIsValid ||
        this.$t('error.dateOutOfRange', {
          dateStart: this.sourcedForecastMinDate,
          dateEnd: this.sourcedMaxDate,
        })
      )
    },
    ruleSourcedObservedDate() {
      return (
        !!this.sourcedObservedDateIsValid ||
        this.$t('error.dateOutOfRange', {
          dateStart: this.sourcedObservedMinDate,
          dateEnd: this.sourcedMaxDate,
        })
      )
    },
    ruleArchivedDate() {
      return (
        !!this.archivedDateIsValid ||
        this.$t('error.dateOutOfRange', {
          dateStart: this.archivedMinDate,
          dateEnd: this.archivedMaxDate,
        })
      )
    },
  },
  watch: {
    ozoneMapTab: function (newTab) {
      if (newTab === 'observed') {
        this.generateSourcedObservedMapPaths()
      } else if (newTab === 'sourcedForecast') {
        this.generateSourcedForecastMapPaths()
      }
    },
  },
  methods: {
    changeArchiveDateRangeType(changedType) {
      if (changedType === 'daily') {
        this.archivedDate = DateTime.fromISO(this.archivedDate).toISODate()
        this.archivedMaxDate = DateTime.now().minus({ days: 1 }).toISODate()
        this.archivedMinDate = DateTime.fromISO('1970-01-01').toISODate()
      } else {
        // monthly or 10 day mean switch to YYYY-MM format
        this.archivedMaxDate = DateTime.now()
          .minus({ months: 1 })
          .toFormat('yyyy-LL')
        this.archivedMinDate =
          DateTime.fromISO('1970-01-01').toFormat('yyyy-LL')
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

      // pre-validation checks
      if (!this.archivedDateIsValid || measurementTypes.length === 0) {
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
        this.itemsMapHemisphere
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
        let path = this.baseOzoneURL
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
            this.itemsMeasurementType
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

      this.archivedRerender++
      return paths
    },
    /**
     * Updates sourcedForecastMapPaths; an object of arrays by forecast number containing the url and text caption of each ozone map given the following queries
     */
    generateSourcedForecastMapPaths() {
      let paths = {} // breakdown by forecast number
      this.sourcedForecastSubPaths = []
      this.sourcedForecastPathsVerified = false
      let iDate = DateTime.fromISO(this.sourcedForecastDate)

      // pre-validation checks
      if (
        !this.sourcedForecastDateIsValid ||
        this.sourcedForecastHemisphere.length === 0 ||
        this.sourcedForecastMeasurement.length === 0
      ) {
        this.sourcedForecastMapPaths = {}
        this.sourcedForecastRerender++
        return false
      }

      // hemisphere type
      for (const hemisphere of this.sourcedForecastHemisphere) {
        const captionHemisphere = this.itemValueToText(
          hemisphere,
          this.itemsMapHemisphere
        )
        const captionForecastType = this.itemValueToText(
          this.sourcedForecastType,
          this.itemsForecastTypes
        )
        let pathByHemisphere = this.baseOzoneURL
        pathByHemisphere += `/f${hemisphere}500`

        // measurement type
        for (const measureType of this.sourcedForecastMeasurement) {
          const captionMeasurementType = this.itemValueToText(
            measureType,
            this.itemsMeasurementType
          )

          let pathByMeasureType = pathByHemisphere
          if (measureType === 'de') {
            pathByMeasureType += '_dev'
          }

          // determine subpaths for URL validation
          const subPath = pathByMeasureType.split('/').slice(-1)[0]
          if (!this.sourcedForecastSubPaths.includes(subPath)) {
            this.sourcedForecastSubPaths.push(subPath)
          }

          const measureTypeAbbr = this.measurementTypeAbbreviations[measureType]
          pathByMeasureType += '/'

          // forecast number from 0 to 4
          for (let forecastNum = 0; forecastNum <= 4; forecastNum++) {
            iDate = DateTime.fromISO(this.sourcedForecastDate) // reset
            if (!Object.hasOwn(paths, forecastNum)) {
              paths[forecastNum] = {
                date: '',
                maps: [],
              }
            }
            let pathByForecastNum = pathByMeasureType

            // date adjustment depending on forecastType
            // forecasts prepared on this day
            if (this.sourcedForecastType === 'onThisDay') {
              iDate = iDate.plus({ days: forecastNum })
            }
            const captionDate = iDate.toFormat('yyyy-LL-dd')
            paths[forecastNum].date = captionDate
            pathByForecastNum += `${iDate.toFormat('yyyy')}-${forecastNum}/`

            for (const abbr in this.sourcedAbbreviations.forecasted) {
              let pathBySource = pathByForecastNum
              let caption = []
              const captionSourceName =
                this.sourcedAbbreviations.forecasted[abbr]
              pathBySource += `${measureTypeAbbr}${abbr}${iDate.toFormat(
                'yyyyLLdd'
              )}.gif`

              caption.push(captionMeasurementType)
              caption.push(captionHemisphere)
              caption.push(captionSourceName)
              caption.push(captionDate)
              caption.push(captionForecastType)
              caption.push(
                this.$tc('data.products.ozone_maps.dayForecast', forecastNum, {
                  forecastNum: forecastNum,
                })
              )

              // breakdown path arrays by forecast number
              paths[forecastNum].maps.push({
                url: pathBySource,
                caption: caption.join(' / '),
              })
            }
          }
        }
      }

      // validate paths
      this.validateSourcedForecastPaths(paths)
    },
    /**
     * Updates sourcedObservedMapPath containing the url and text caption of each ozone map given the following queries
     */
    generateSourcedObservedMapPaths() {
      let paths = {}
      this.sourcedObservedSubPaths = []
      this.sourcedObservedPathsVerified = false

      let iDate = DateTime.fromISO(this.sourcedObservedDate)

      // pre-validation checks
      if (
        !this.sourcedObservedDateIsValid ||
        this.sourcedObservedHemisphere.length === 0 ||
        this.sourcedObservedMeasurement.length === 0
      ) {
        this.sourcedObservedMapPaths = {}
        this.sourcedObservedRerender++
        return false
      }

      // hemisphere type
      for (const hemisphere of this.sourcedObservedHemisphere) {
        const captionHemisphere = this.itemValueToText(
          hemisphere,
          this.itemsMapHemisphere
        )

        if (!Object.hasOwn(paths, hemisphere)) {
          paths[hemisphere] = {
            hemisphere: captionHemisphere,
            maps: [],
          }
        }

        // measurement type
        for (const measureType of this.sourcedObservedMeasurement) {
          let path = this.baseOzoneURL

          const captionMeasurementType = this.itemValueToText(
            measureType,
            this.itemsMeasurementType
          )

          path += `/${hemisphere}500`

          let pathByMeasureType = path
          if (measureType === 'de') {
            pathByMeasureType += '_dev'
          }

          // determine subpaths for URL validation
          const subPath = pathByMeasureType.split('/').slice(-1)[0]
          if (!this.sourcedObservedSubPaths.includes(subPath)) {
            this.sourcedObservedSubPaths.push(subPath)
          }

          const measureTypeAbbr = this.measurementTypeAbbreviations[measureType]
          pathByMeasureType += `/${iDate.toFormat('yyyy')}`

          // sources
          for (let abbr in this.sourcedAbbreviations.observed) {
            let pathBySource = pathByMeasureType
            let caption = []
            const captionSourceName = this.sourcedAbbreviations.observed[abbr]

            // change abbreviation for deviation; d{e}YYYYMMDD.gif
            if (abbr === 'o' && measureType === 'de') {
              abbr = 'e'
            }
            pathBySource += `/${measureTypeAbbr}${abbr}${iDate.toFormat(
              'yyyyLLdd'
            )}.gif`

            caption.push(captionMeasurementType)
            caption.push(captionHemisphere)
            caption.push(captionSourceName)
            caption.push(iDate.toFormat('yyyy-LL-dd'))

            // breakdown path arrays by hemisphere
            paths[hemisphere].maps.push({
              url: pathBySource,
              caption: caption.join(' / '),
            })
          }
        }
      }

      // validate paths
      this.validateSourcedObservedPaths(paths)
    },
    async validateSourcedForecastPaths(paths) {
      // group available list fetching
      let availableListDispatchGroup = []
      this.sourcedForecastLoading = true
      for (const iSubPath of this.sourcedForecastSubPaths) {
        availableListDispatchGroup.push(
          this.$store.dispatch(
            'ozoneMaps/retrieveAvailableListByPathId',
            iSubPath
          )
        )
      }
      // handler after all relavant available lists are retrieved
      Promise.all(availableListDispatchGroup)
        .then(() => {
          const forecastNum = Object.keys(paths)
          for (const fn of forecastNum) {
            for (let i = 0; i < paths[fn].maps.length; i++) {
              let urlToCheck = paths[fn].maps[i].url
              const substrSearch = 'ozone_maps/'
              const lenSearch = substrSearch.length
              urlToCheck = urlToCheck.substring(
                urlToCheck.indexOf(substrSearch) + lenSearch
              )
              const urlParts = urlToCheck.split('/')
              const subPathPart = urlParts[0]
              const availableList =
                this.$store.getters['ozoneMaps/getAvailableListByPathId'](
                  subPathPart
                )
              // remove map path that is not available
              if (availableList.indexOf(urlToCheck) === -1) {
                paths[fn].maps.splice(i, 1)
                i-- // adjust i because current i will become i+1 (the next i)
              }
            }
          }

          // update modified paths (reduced via splice)
          this.sourcedForecastMapPaths = paths
          this.sourcedForecastRerender++

          this.sourcedForecastPathsVerified = true
        })
        .finally(() => {
          this.sourcedForecastLoading = false
        })
    },
    async validateSourcedObservedPaths(paths) {
      // group available list fetching
      let availableListDispatchGroup = []
      this.sourcedObservedLoading = true
      for (const iSubPath of this.sourcedObservedSubPaths) {
        availableListDispatchGroup.push(
          this.$store.dispatch(
            'ozoneMaps/retrieveAvailableListByPathId',
            iSubPath
          )
        )
      }
      // handler after all relavant available lists are retrieved
      Promise.all(availableListDispatchGroup)
        .then(() => {
          const hemispheres = Object.keys(paths)
          for (const hp of hemispheres) {
            for (let i = 0; i < paths[hp].maps.length; i++) {
              // extract out the subPath for validation: "{hemisphere}500/{yyyy}/{measureType}{sourceAbbrv}{yyyymmdd}.gif"
              let urlToCheck = paths[hp].maps[i].url
              const substrSearch = 'ozone_maps/'
              const lenSearch = substrSearch.length
              urlToCheck = urlToCheck.substring(
                urlToCheck.indexOf(substrSearch) + lenSearch
              )
              // extract out the "{hemisphere}500"
              const urlParts = urlToCheck.split('/')
              const subPathPart = urlParts[0]
              const availableList =
                this.$store.getters['ozoneMaps/getAvailableListByPathId'](
                  subPathPart
                )
              // remove map path that is not available
              if (availableList.indexOf(urlToCheck) === -1) {
                paths[hp].maps.splice(i, 1)
                i-- // adjust i because current i will become i+1 (the next i)
              }
            }
          }

          // update modified paths (reduced via splice)
          this.sourcedObservedMapPaths = paths
          this.sourcedObservedRerender++
          this.sourcedObservedPathsVerified = true
        })
        .finally(() => {
          this.sourcedObservedLoading = false
        })
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
