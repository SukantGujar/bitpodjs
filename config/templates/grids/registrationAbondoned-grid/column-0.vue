<template>
  <div class="d-inline-block text-truncate eventuser-name">
    <nuxt-link :to="route"> {{ value }}</nuxt-link>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => {},
      required: false,
    },
    value: {
      type: String,
      default: '',
      required: false,
    },
    context: {
      type: Object,
      default: () => {},
      required: false,
    },
  },
  computed: {
    route() {
      return this.localePath(
        `/apps/event${this.context.basePath}/${this.item.id}`
      )
    },
  },
}
</script>
<style scoped>
.eventuser-name {
  max-width: 150px;
}
</style>
