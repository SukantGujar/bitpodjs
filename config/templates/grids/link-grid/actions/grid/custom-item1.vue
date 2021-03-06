<template>
  <v-flex>
    <div class="text-center">
      <v-menu>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            color="blue darken-2"
            dark
            class="ma-3 block wd-full"
            v-on="on"
          >
            <i18n path="Common.CustomForms" />
          </v-btn>
        </template>

        <v-list>
          <v-list-item @click="registrations = !registrations">
            <v-list-item-title
              ><i18n path="Common.NewRegistration"
            /></v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>

    <v-dialog
      v-model="registrations"
      persistent
      scrollable
      content-class="slide-form-default"
    >
      <v-card>
        <v-toolbar dense flat dark fixed color="accent">
          <v-toolbar-title class="body-1"
            ><i18n path="Common.NewRegistration"
          /></v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon dark @click="registrations = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-divider></v-divider>
        <v-card-text>
          <v-row>
            <v-col cols="12" sm="6" md="6" class="mt-2">
              <v-text-field
                v-model="FormData.FirstName"
                :label="$t('Common.FirstN')"
                required
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6" class="mt-2">
              <v-text-field
                v-model="FormData.LastName"
                :label="$t('Common.LastName')"
                required
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                v-model="FormData.CellPhone"
                :label="$t('Common.PhoneRequired')"
                required
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                v-model="FormData.Email"
                :label="$t('Common.Email')"
                required
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                v-model="FormData.Organization"
                :label="$t('Common.Organization')"
                outlined
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="pl-4">
          <v-btn color="primary" depressed @click="onSave"
            ><i18n path="Drawer.Save"
          /></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-flex>
</template>

<script>
import gql from 'graphql-tag'

function buildMutationCreateQuery(modelName) {
  return `mutation($Inputs : ${modelName}CreateInput!){ ${modelName} { ${modelName}Create(input:$Inputs){ clientMutationId obj{ id } } } }`
}

export default {
  props: {
    onNewItemSave: {
      type: Function,
      default: () => {},
    },
    refresh: {
      type: null,
      default: null,
    },
  },
  data() {
    return {
      registrations: false,
      dialog: true,
      FormData: {
        FirstName: '',
        LastName: '',
        CellPhone: '',
        Email: '',
        Organization: '',
      },
    }
  },
  methods: {
    async onSave(event) {
      try {
        await this.onNewItemSave(this.FormData)
        this.registrations = false
      } catch {}
    },
    async onCustomSave(event) {
      this.registrations = false
      const modelName = 'Contact'
      const newItemMutation = buildMutationCreateQuery(modelName)
      await this.$apollo.mutate({
        mutation: gql(newItemMutation),
        variables: {
          Inputs: {
            data: this.FormData,
            clientMutationId: `${modelName} list item updated successfully.`,
          },
        },
      })
      this.refresh()
    },
  },
}
</script>
