<template>
  <v-autocomplete
    :value="value"
    :items="unpack(options)"
    :label="placeholder"
    :disabled="disabled"
    item-text="name"
    item-value="value"
    solo
    @input="$emit('input', $event)"
  />
</template>

<style>
.v-select-list > .v-list {
  padding: 0px;
}

.v-select-list .v-subheader {
  font-weight: bold;
  background-color: #e4e4e4;
  max-height: 40px;
  padding-left: 12px;
  margin-left: 0px;
}

.v-select .v-input__control .v-input__slot {
  max-width: 60%;
}

.v-select-list .v-list-item {
  padding-left: 24px;
}

.v-select-list .v-list-item,
.v-select-list .v-list-item__content {
  padding-top: 0px;
  padding-bottom: 0px;
  min-height: 32px;
}
</style>

<script>
function unpack(definitions) {
  const selectItems = []
  for (const def of definitions) {
    if (def.category === undefined) {
      selectItems.push({
        name: def.text,
        value: def.key
      })
    } else {
      selectItems.push({
        header: def.category
      })

      for (const option of def.children) {
        selectItems.push({
          name: option.text,
          value: option.key
        })
      }
    }
  }
  return selectItems
}

export default {
  name: 'WoudcSelect',
  props: {
    options: { type: Array, required: true },
    placeholder: { type: String, required: false, default: '...' },
    value: {
      type: String,
      required: false,
      default: () => {
        return this.options[0]
      }
    },
    disabled: { type: Boolean, required: false, default: false }
  },
  data() {
    return {
      selected: ''
    }
  },
  methods: { unpack }
}
</script>
