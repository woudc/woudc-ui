<template>
  <span class="woudc-link">
    <a v-if="typeof link === 'string'" :href="link">
      {{ link }}
    </a>
    <a v-else-if="link.type === 'external'" :href="link.to">
      {{ link.text }}
    </a>
    <nuxt-link
      v-else-if="link.selector === undefined"
      :to="localePath(link.to)"
    >
      {{ link.text }}
    </nuxt-link>
    <nuxt-link v-else :to="pathSelector(link.to, link.selector)">
      {{ link.text }}
    </nuxt-link>
  </span>
</template>

<script>
function pathSelector(path, selector) {
  return this.localePath(path) + selector
}

export default {
  name: 'WoudcLink',
  props: {
    link: { type: [String, Object], required: true }
  },
  methods: { pathSelector }
}
</script>
