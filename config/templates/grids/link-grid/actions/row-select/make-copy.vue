<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      scrollable
      content-class="slide-form-default"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on">
          <i18n path="Drawer.MakeaCopy" />
        </v-btn>
      </template>
      <v-card>
        <v-toolbar dense flat dark fixed color="accent">
          <v-toolbar-title class="body-1"
            ><i18n path="Common.EditItem"
          /></v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-divider></v-divider>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                v-for="field in fields"
                :key="`${field.fieldName}${updateCount}`"
                cols="12"
                sm="6"
              >
                <component
                  :is="formControl(field) || null"
                  v-model="formData[field.fieldName]"
                  :field="field"
                  :field-name="field.fieldName"
                  :content="content"
                />
              </v-col>
            </v-row>
          </v-container>
          <small><i18n path="Common.IndicatesRequiredField" /></small>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="pl-4">
          <v-btn color="primary" depressed @click="onSave"
            ><i18n path="Drawer.Save"
          /></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import gql from 'graphql-tag'
import TextField from '~/components/common/form/text-field.vue'
import Lookup from '~/components/common/form/lookup.vue'
import Checkbox from '~/components/common/form/checkbox.vue'

function getGridFields(content, viewName) {
  const view = content.views[viewName]
  const fields = view.fields
  const editableFields = []
  for (const fieldName in fields) {
    const field = fields[fieldName]
    const newFormField = field.newForm === undefined ? true : field.newForm
    if (newFormField) {
      editableFields.push({
        ...field,
        fieldName,
      })
    }
  }
  editableFields.sort(
    (field1, field2) => field1.displayOrder - field2.displayOrder
  )
  return editableFields
}

function buildMutationUpsertQuery(modelName) {
  return `mutation($Inputs : ${modelName}UpsertWithWhereInput!){ ${modelName}{ ${modelName}UpsertWithWhere(input:$Inputs){ clientMutationId obj{ id } } } }`
}

function getModelName(content, viewName) {
  const view = content.views[viewName]
  const dataSource = view.dataSource
  return dataSource.model
}

export default {
  components: {
    TextField,
    Lookup,
    Checkbox,
  },
  props: {
    content: {
      type: null,
      default: null,
    },
    viewName: {
      type: String,
      default: '',
    },
    items: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    const fields = getGridFields(this.content, this.viewName)
    return {
      fields,
      formData: this.item,
      dialog: false,
      updateCount: 0,
    }
  },
  computed: {
    editData() {
      return this.item
    },
  },
  watch: {
    item(newValue, oldValue) {
      this.updateCount = this.updateCount + 1
      this.formData = newValue
    },
  },
  methods: {
    async onSave() {
      this.dialog = false
      const modelName = getModelName(this.content, this.viewName)
      const where = {
        id: this.formData.id,
      }
      const editItemMutation = buildMutationUpsertQuery(modelName)
      await this.$apollo.mutate({
        mutation: gql(editItemMutation),
        variables: {
          Inputs: {
            where,
            data: this.formData,
            clientMutationId: `${modelName} list item updated successfully.`,
          },
        },
      })
    },
    formControl(field) {
      switch (field.type) {
        case 'string':
        case 'number':
          return 'TextField'
        case 'lookup':
          return 'Lookup'
        case 'checkbox':
          return 'Checkbox'
      }
    },
  },
}
</script>
