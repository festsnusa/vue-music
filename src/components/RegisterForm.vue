<template lang="pug">
div(class="text-white text-center font-bold p-4 rounded mb-4" v-if="reg_show_alert" :class="reg_alert_variant") {{ reg_alert_msg }}
VeeForm(:validation-schema="schema" @submit="register" :initial-values="userData")
  // Name
  .mb-3
    label.inline-block.mb-2 Name
    VeeField(type="text" name="name"
      class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
      placeholder="Enter Name" :rule="'required'")
    ErrorMessage.text-red-600(name="name")
  // Email
  .mb-3
    label.inline-block.mb-2 Email
    VeeField(type="email" name="email"
      class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
      placeholder="Enter Email")
    ErrorMessage.text-red-600(name="email")
  // Age
  .mb-3
    label.inline-block.mb-2 Age
    VeeField(type="number" name="age"
      class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded")
    ErrorMessage.text-red-600(name="age")
  // Password
  .mb-3
    label.inline-block.mb-2 Password
    VeeField(type="password" name="password" :bails="false" v-slot="{ field, errors }")
      input(
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Password" v-bind="field")
      .text-red-600(v-for="error in errors" :key="error") {{ error }}
    ErrorMessage.text-red-600(name="password")
  // Confirm Password
  .mb-3
    label.inline-block.mb-2 Confirm Password
    VeeField(type="password" name="confirm_password"
      class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
      placeholder="Confirm Password")
    ErrorMessage.text-red-600(name="confirm_password")
  // Country
  .mb-3
    label.inline-block.mb-2 Country
    VeeField(as="select" name="country"
      class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded")
      option(value="USA") USA
      option(value="Mexico") Mexico
      option(value="Germany") Germany
      option(value="Antarctica") Antarctica
    ErrorMessage.text-red-600(name="country")
  // TOS
  .mb-3.pl-6
    VeeField(type="checkbox" name="tos" value="1" class="w-4 h-4 float-left -ml-6 mt-1 rounded")
    label.inline-block Accept terms of service
    ErrorMessage.text-red-600.block(name="tos")
  button(type="submit" class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700"
    :disabled="reg_in_submission") Submit
</template>

<script>
import { ErrorMessage } from 'vee-validate';
import { mapActions } from 'pinia';
import useUserStore from '@/stores/user'

export default {
  name: "RegisterForm",
  data() {
    return {
      tab: "login",
      schema: {
        name: "required|min:3|max:100|alpha_spaces",
        email: "required|min:3|max:100|email",
        age: "required|min_value:18|max_value:120",
        password: "required|min:9|max:100|excluded:password",
        confirm_password: "password_mismatch:@password",
        country: "required|country_excluded:Antarctica",
        tos: "tos",
      },
      userData: {
        country: 'USA'
      },
      reg_in_submission: false,
      reg_show_alert: false,
      reg_alert_variant: "bg-blue-500",
      reg_alert_msg: "Please wait! Your account is being created.",
    };
  },

  methods: {
    ...mapActions(useUserStore, {
      createUser: "register",
    }),
    async register(values) {
      this.reg_show_alert = true
      this.reg_in_submission = true
      this.reg_alert_variant = "bg-blue-500"
      this.reg_alert_msg = "Please wait! Your account is being created."

      try {
        await this.createUser(values)
      } catch (error) {
        this.reg_in_submission = false
        this.reg_alert_variant = "bg-red-500"
        this.reg_alert_msg = "An unexpected error occured. Please try again later."
        return
      }

      this.reg_alert_variant = "bg-green-500"
      this.reg_alert_msg = "Success! Your account has been created."

      window.location.reload()

    },
  },
  components: { ErrorMessage }
}
</script>