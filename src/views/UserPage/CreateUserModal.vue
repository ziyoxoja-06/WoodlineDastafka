<template>
  <v-dialog
      v-model="dialog"
      max-width="700"
      transition="dialog-top-transition"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
          icon
          v-bind="attrs"
          v-on="on"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </template>
    <template>
      <v-card class="w-full">
        <v-toolbar
            color="primary"
            dark
        >Пользователь Создать
        </v-toolbar>
        <v-card-text class="px-16 pt-5">
          <v-form
              ref="form"
              v-model="valid"
              lazy-validation>
            <v-text-field v-model="name" :rules="nameRules" dense label="Имя пользователя" outlined prepend-icon="mdi-account"/>
          </v-form>
        </v-card-text>
        <v-card-actions class="justify-end text-white">
          <v-btn
              color="red darken-4"
              @click="$refs.form.reset()"
          ><span class="white--text">Перезагрузить</span>
          </v-btn>
          <v-btn
              :disabled="loading||!valid"
              :loading="loading"
              color="warning"
              @click="submitFunk "
          >Отправить
          </v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>

</template>

<script>
export default {
  name: "CreateUserModal",
  data: () => ({
    dialog:false,
    loader: null,
    loading: false,
    valid: true,
    nameRules: [
      v => !!v || 'Требуется name',
    ],
    openmodal: true,
    name: '',
    alert: false,
  }),

  methods: {
    async submitFunk() {
      this.loader = 'loading'
      const l = this.loader
      this[l] = !this[l]
      if (this.$refs.form.validate()) {
        const user_name = this.name

        try {
          await this.$axios.post('user', {user_name})

          setTimeout(() => {
            this.$emit('closeModal')
            this.alert = false
            this[l] = false
          }, 2000)
          this.loader = null
          this.$refs.form.reset()
          this.dialog=false
        } catch (e) {
          console.log(e)
        }
      } else {
        this.name = ''
      }
    }
  },
}

export class CreateUserModal {
}
</script>