<template>
  <v-layout>
    <v-form ref="form" v-model="valid">
      <v-dialog
        v-model="editOrgInfo"
        persistent
        scrollable
        content-class="slide-form-default"
      >
        <v-card>
          <v-card-title
            class="pl-md-10 pl-lg-10 pl-xl-15 pr-1 pb-0 pt-1 d-flex align-start"
          >
            <h2 class="black--text pt-5 pb-2 text-h5">
              <i18n path="Common.EditOrganizationInformation" />
            </h2>
            <v-spacer></v-spacer>
            <div>
              <v-btn icon @click="onClose">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </div>
          </v-card-title>
          <v-card-text class="px-xs-2 px-md-10 px-lg-10 px-xl-15 pt-0">
            <v-row>
              <v-col cols="12" class="pb-0">
                <v-text-field
                  v-model="formData.Name"
                  :label="$t('Common.NameRequired')"
                  :rules="[rules.required]"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" class="pb-0">
                <v-textarea
                  v-model="formData.About"
                  :label="$t('Common.About')"
                  outlined
                  dense
                ></v-textarea>
              </v-col>
              <v-col cols="12" md="6" class="pb-0">
                <v-text-field
                  v-model="formData.Email"
                  :label="$t('Common.Email')"
                  :rules="[rules.required, rules.email]"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6" class="pb-0">
                <v-text-field
                  v-model="formData.Mobile"
                  :label="$t('Common.PhoneRequired')"
                  :rules="[rules.required]"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <i18n path="Common.Address" class="ml-3" />
              <v-col cols="12" class="pb-0">
                <v-text-field
                  v-model="venueAddress.AddressLine"
                  :label="$t('Common.Address')"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" class="pb-0">
                <v-text-field
                  v-model="venueAddress.City"
                  :label="$t('Common.City')"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" class="pb-0">
                <v-text-field
                  v-model="venueAddress.State"
                  :label="$t('Common.State')"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" class="pb-0">
                <v-text-field
                  v-model="venueAddress.PostalCode"
                  :label="$t('Common.Zip')"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" class="pb-0">
                <v-text-field
                  v-model="venueAddress.Country"
                  :label="$t('Common.Country')"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions
            class="px-xs-3 px-md-10 px-lg-10 px-xl-15 px-xs-10 pl-xs-10"
          >
            <SaveButton
              v-if="editOrgInfo"
              color="primary"
              :disabled="!valid"
              depressed
              :action="onSave"
              class="ml-2"
              ><i18n path="Drawer.Save"
            /></SaveButton>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-form>
  </v-layout>
</template>

<script>
import gql from 'graphql-tag'
import { rules } from '~/utility/rules.js'
import { formatGQLResult } from '~/utility/gql.js'
import organization from '~/config/apps/admin/gql/organization.gql'
import SaveButton from '~/components/common/saveButton'

export default {
  components: {
    SaveButton,
  },
  props: {
    editOrgInfo: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      valid: false,
      rules: rules(this.$i18n),
      formData: {},
      venueAddress: {},
      data: {
        organization: {},
      },
    }
  },
  methods: {
    onReset() {
      this.formData.Name = ''
      this.formData.About = ''
      this.formData.Email = ''
      this.formData.Mobile = ''
      this.venueAddress.AddressLine = ''
      this.venueAddress.City = ''
      this.venueAddress.State = ''
      this.venueAddress.PostalCode = ''
      this.venueAddress.Country = ''
    },
    onClose() {
      this.$emit('update:editOrgInfo', false)
      this.onReset()
    },
    refresh() {
      this.$refs.form.$parent.$parent.refresh()
    },
    setAddress() {
      this.formData._CurrentAddress.AddressLine = this.venueAddress.AddressLine
      this.formData._CurrentAddress.City = this.venueAddress.City
      this.formData._CurrentAddress.State = this.venueAddress.State
      this.formData._CurrentAddress.PostalCode = this.venueAddress.PostalCode
      this.formData._CurrentAddress.Country = this.venueAddress.Country
      this.formData._CurrentAddress.id = this.venueAddress.id
    },
    async onSave() {
      const url = this.$bitpod.getApiUrl()
      this.setAddress()
      delete this.formData._CurrentAddress.LatLng
      try {
        const res = await this.$axios.$patch(
          `${url}OrganizationInfos/${this.$route.params.id}`,
          this.formData
        )
        if (res) {
          this.onClose()
          this.$emit('update:snackbar', true)
          this.$store.commit('setCurrentOrgInfo', this.formData)
          this.refresh()
        }
      } catch (e) {
        console.log(
          `Error in pages/apps/organization/_id/editOrgInfoForm while making a PATCH call to Organization Info model from method onSave context:-URL:-${url}\nformData:-${this.formData}`,
          e
        )
      }
    },
  },
  apollo: {
    data: {
      query() {
        return gql`
          ${organization}
        `
      },
      variables() {
        return {
          filters: {
            where: {
              id: this.$route.params.id,
            },
          },
        }
      },
      update(data) {
        const organization = formatGQLResult(data, 'OrganizationInfo')
        this.formData = { ...organization[0] }
        this.formData.id = this.$route.params.id
        this.formData._PaymentGatewaySetting.id = this.formData
          ._PaymentGatewaySetting.id
          ? atob(this.formData._PaymentGatewaySetting.id).split(':')[1]
          : ''
        this.venueAddress = { ...organization[0]._CurrentAddress }
        this.venueAddress.id = this.venueAddress.id
          ? atob(this.venueAddress.id).split(':')[1]
          : ''
        return {
          organization: organization.length > 0 ? organization[0] : {},
        }
      },
      result({ data, loading, networkStatus }) {},
      error(error) {
        this.error = error
        this.loading = 0
        console.log(
          'Error while fetching data from organization model while making GQL call from apollo data query section',
          error
        )
      },
      prefetch: false,
      loadingKey: 'loading',
      skip: false,
      pollInterval: 0,
    },
  },
}
</script>
