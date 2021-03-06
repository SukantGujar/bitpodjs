<template>
  <v-flex>
    <div>
      <confirm ref="confirm"></confirm>
      <v-snackbar v-model="snackbar" :timeout="2000" :top="true" width="10">
        <div class="toast text-center">
          {{ snackbarText }}
        </div>
      </v-snackbar>
      <v-menu left bottom :offset-y="offset" transition="slide-y-transition">
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon small v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list dense>
          <v-list-item class="cursorPointer" @click="openSnackbar">
            <v-list-item-content>
              <copy
                :text-to-copy="getKeyCopied(item.accesskey, item.accesssecret)"
                :label="$t('Drawer.Copy')"
                :hide-toast="true"
                :unique-id="'a' + item.id"
                icon-size="15"
              />
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            class="cursorPointer"
            @click="onDelete(item.accesskey, item.userId)"
          >
            <v-list-item-icon class="mr-2">
              <i class="fa fa-trash mr-1 mt-1" aria-hidden="true"></i>
            </v-list-item-icon>
            <v-list-item-content class="ml-n3">
              <v-list-item-title
                ><i18n path="Drawer.Delete"
              /></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
  </v-flex>
</template>

<script>
import copy from '~/components/common/copy'
export default {
  components: {
    copy,
  },
  props: {
    item: {
      type: Object,
      default: () => {},
      required: false,
    },
    refresh: {
      type: Function,
      required: false,
      default: () => false,
    },
    offset: { type: Boolean, default: false },
  },
  data() {
    return {
      snackbar: false,
      snackbarText: '',
    }
  },
  methods: {
    openSnackbar() {
      this.snackbar = true
      this.snackbarText = this.$t('Messages.Success.AccessKeySecretCopied')
    },
    getKeyCopied(accessKey, secretKey) {
      const key = `key:${accessKey}secret:${secretKey}`
      return key
    },
    async onDelete(accessKey, userName) {
      const url = this.$bitpod.getApiUrl()
      const check = await this.$refs.confirm.open(
        this.$t('Drawer.Delete'),
        this.$t('Messages.Warn.DeleteAccessKey'),
        { color: 'error lighten-1' }
      )
      if (check === true) {
        try {
          const res = await this.$axios.$delete(
            `${url}Users/${userName}/Accesskey/${accessKey}`
          )
          this.snackbar = true
          this.snackbarText = this.$t('Messages.Success.DeletedSuccessfully')
          this.refresh()
          return res
        } catch (e) {
          console.log(
            `Error in templates/grids/accessKey-grid/actions/grid/new-item.vue while making a DELETE call to Users model from method onDelete context:-URL:-${url}\n userName:${userName}\naccessKey:${accessKey}`,
            e
          )
        }
      }
    },
  },
}
</script>
