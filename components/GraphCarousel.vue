<template>
  <div>
    <v-row v-for="(row, rowIndex) in graphRows" :key="rowIndex">
      <v-col
        v-for="({ url, caption }, columnIndex) in row"
        :key="url"
        :cols="12 / graphsPerRow"
      >
        <v-hover v-slot:default="{ hover }">
          <v-card
            class="pt-4 px-2"
            :class="{ 'mouse-pointer': hover }"
            :elevation="hover ? 12 : 2"
          >
            <v-img
              :src="url"
              aspect-ratio="1.5"
              contain
              @click="selectImage((rowIndex * graphsPerRow) + columnIndex)"
            />
            <v-card-text>{{ caption }}</v-card-text>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>
    <v-dialog v-model="imagePreviewActive" fullscreen>
      <div id="preview-background" @click="exitPreview">
        <div id="preview-content-wrapper" class="full-height mt-6">
          <v-row class="full-height" justify="center">
            <v-col
              v-if="graphs.length > 1"
              class="side-column pa-0"
              align-self="center"
            >
              <v-btn icon class="float-right white--text" @click="step(-1)">
                <v-icon x-large>
                  mdi-menu-left
                </v-icon>
              </v-btn>
            </v-col>
            <v-col class="mx-6 full-height">
              <v-row class="flex-column full-height">
                <v-col class="flex-grow-0 flex-shrink-1 pa-0">
                  <div class="float-left mt-1">
                    {{ imagePreviewLabel }}
                  </div>
                  <v-btn
                    icon
                    class="float-right white--text mb-1"
                    @click="imagePreviewActive = false"
                  >
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                </v-col>
                <v-col id="preview-container" class="pa-0">
                  <img
                    class="full-height"
                    alt="graphs[imagePreviewIndex].caption"
                    :src="graphs[imagePreviewIndex].url"
                  >
                  <div class="text-left">
                    <slot name="preview-caption" :item="graphs[imagePreviewIndex]">
                      {{ graphs[imagePreviewIndex].caption }}
                    </slot>
                  </div>
                </v-col>
              </v-row>
            </v-col>
            <v-col
              v-if="graphs.length > 1"
              class="side-column pa-0"
              align-self="center"
            >
              <v-btn icon class="float-left white--text" @click="step(1)">
                <v-icon x-large>
                  mdi-menu-right
                </v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </div>
      </div>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'GraphCarousel',
  props: {
    graphs: { type: Array, required: true }
  },
  data() {
    return {
      graphsPerRow: 4,
      imagePreviewActive: false,
      imagePreviewIndex: 0
    }
  },
  computed: {
    graphRows() {
      const rows = []
      for (let index = 0; index <  this.graphs.length; index += this.graphsPerRow) {
        const row = this.graphs.slice(index, index + this.graphsPerRow)
        rows.push(row)
      }

      return rows
    },
    imagePreviewLabel() {
      const index = this.imagePreviewIndex + 1  // Switch from zero-based to one-based.
      const template = this.$t('data.products.common.viewing-label')

      // Replace '*' characters in the template with integers.
      const filledTemplate1 = template.replace('*', `${index}`)
      const filledTemplate2 = filledTemplate1.replace('*', `${this.graphs.length}`)
      return filledTemplate2
    }
  },
  methods: {
    exitPreview(event) {
      const sourceID = event.target.id

      // Exit only if the background (and not any buttons on top) was clicked.
      if (sourceID === 'preview-background') {
        this.imagePreviewActive = false
      }
    },
    step(amount) {
      const to = this.imagePreviewIndex + amount

      if (to < 0) {
        this.imagePreviewIndex = this.graphs.length - 1
      } else if (to >= this.graphs.length) {
        this.imagePreviewIndex = 0
      } else {
        this.imagePreviewIndex = to
      }
    },
    selectImage(index) {
      this.imagePreviewIndex = index
      this.imagePreviewActive = true
    }
  }
}
</script>

<style>
.mouse-pointer {
  cursor: pointer;
}

#preview-background {
  position: fixed;
  background-color: rgba(0, 0, 0, 0.8);
  text-align: center;

  width: 100%;
  height: 100%;
}

#preview-content-wrapper {
  display: inline-block;
  color: white;
}

#preview-container {
  position: relative;

  height: 70%;
  max-height: 70%;
}

#preview-container div {
  position: absolute;
}

.v-dialog img {
  max-height: 100%;
  width: auto;
}

.full-height {
  height: 100%;
}

.side-column {
  position: relative;
  bottom: 5%;
}
</style>
