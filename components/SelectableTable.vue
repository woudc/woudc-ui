<template>
  <v-data-table
    :headers="headers"
    :hide-default-footer="elements.length < 5"
    :items="elements"
    :items-per-page="rowsPerPage"
    :page="selectedPage"
    :loading="loading"
    class="elevation-1"
    @update:items-per-page="rowsPerPage = $event; jumpToSelection()"
  >
    <template v-slot:item="row">
      <tr
        :class="{ 'selected-row': isSelected(row.item) }"
        @click="emitSelection(row.item)"
      >
        <slot name="row" :item="row.item" />
      </tr>
    </template>
  </v-data-table>
</template>

<script>
export default {
  name: 'SelectableTable',
  props: {
    elements: { type: Array, required: true },
    headers: { type: Array, required: true },
    selected: { type: Object, required: false, default: null },
    loading: { type: Boolean, required: false, default: false }
  },
  data() {
    return {
      rowsPerPage: 10,
      selectedPage: 1
    }
  },
  watch: {
    elements(newList, oldList) {
      this.jumpToSelection()
    },
    selected(newSelection, oldSelection) {
      this.jumpToSelection()
    }
  },
  methods: {
    emitSelection(element) {
      if (this.selected !== null && element.identifier === this.selected.identifier) {
        // Deselect if clicking on an already selected element.
        this.$emit('select', null)
      } else {
        // Selecting a new element.
        this.$emit('select', element)
      }
    },
    isSelected(element) {
      return this.selected !== null && element.identifier === this.selected.identifier
    },
    jumpToSelection() {
      const index = this.elements.indexOf(this.selected)

      if (index === -1) {
        const numPages = Math.ceil(this.elements.length / this.rowsPerPage)
        this.selectedPage = Math.min(this.selectedPage, numPages)
      } else {
        const page = Math.ceil((index + 1) / this.rowsPerPage)
        this.selectedPage = page
      }
    }
  }
}
</script>

<style>
.selected-row {
  background-color: palegreen;
}

.selected-row:hover {
  background-color: lightgreen !important;
}
</style>
