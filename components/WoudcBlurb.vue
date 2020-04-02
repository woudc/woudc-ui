<template>
  <span class="blurb">
    <span v-if="typeof items === 'string'">
      {{ items }}
    </span>
    <span v-for="(item, i) in $i18nToArray(items)" v-else :key="i">
      <span v-if="typeof item === 'string'">
        {{ item }}
      </span>
      <woudc-link v-else-if="item.link !== undefined" :link="item.link" />
      <b v-else-if="item.bold !== undefined">
        <woudc-blurb :items="[item.bold]" />
      </b>
      <i v-else-if="item.italic !== undefined">
        <woudc-blurb :items="[item.italic]" />
      </i>
      <span v-else-if="item.newlines !== undefined">
        <br v-for="j in item.newlines" :key="j">
      </span>
      <span v-else-if="item.text !== undefined">
        {{ item.text }}
      </span>
      <ul v-else-if="item['0'] !== undefined">
        <li v-for="(line, j) in item" :key="j">
          <woudc-blurb :items="line" />
        </li>
      </ul>
      <span v-else>
        {{ item }}
      </span>
    </span>
  </span>
</template>

<script>
import WoudcLink from '~/components/WoudcLink'

export default {
  name: 'WoudcBlurb',
  components: {
    'woudc-link': WoudcLink
  },
  props: {
    items: { type: [String, Array, Object], required: false, default: '' }
  }
}
</script>
