<template>
  <div class="d-flex flex-column ma-1 mxcol-200">
    <div>
      <v-img
        :src="imageUrl"
        aspect-ratio="0.75"
        height="50"
        max-height="50"
        position="left"
        max-width="40"
        contain
      ></v-img>
    </div>
    <div class="body-2 d-block text-truncate">
      {{ profileName }}
    </div>
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
  data() {
    return {
      imageUrl: this.item.MetaData.Image,
      profileName: this.item.ProfileName,
    }
  },
}
</script>
