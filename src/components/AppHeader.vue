<template>
  <header id="header" class="bg-gray-700">
    <nav class="container mx-auto flex justify-start items-center py-5 px-4">
      <!-- App Name -->
      <RouterLink :to="{ name: 'home' }" class="text-white font-bold uppercase text-2xl mr-4"
        exact-active-class="no-active">Music
      </RouterLink>

      <div class="flex flex-grow items-center">
        <!-- Primary Navigation -->
        <ul class="flex flex-row mt-1">
          <!-- Navigation Links -->
          <li>
            <RouterLink to="/about" class="px-2 text-white">About</RouterLink>
          </li>
          <li v-if="!userStore.userLoggedIn">
            <a class="px-2 text-white" href="#" @click.prevent="toggleAuthModal">Login / Register</a>
          </li>
          <template v-else>
            <li>
              <RouterLink to="/manage" class="px-2 text-white">Manage</RouterLink>
            </li>
            <li>
              <a class="px-2 text-white" @click.prevent="userStore.signOut">Logout</a>
            </li>
          </template>

        </ul>
        <ul class="ml-auto">
          <a class="px-2 text-white" href="#" @click.prevent="changeLocale">
            {{ currentLocale }}
          </a>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
import { mapStores } from 'pinia';
import useModalStore from '@/stores/modal'
import useUserStore from '@/stores/user'

export default {
  name: "AppHeader",
  computed: {
    ...mapStores(useModalStore, useUserStore),
    currentLocale() {
      return this.$188n.locale === "fr" ? "French" : "English"
    }
  },
  methods: {
    toggleAuthModal() {
      this.modalStore.isOpen = !this.modalStore.isOpen
      console.log(this.modalStore.isOpen)
    },
    changeLocale() {
      this.$188n.locale = this.$188n.locale === 'fr' ? 'en' : 'fr'
    },
  }
}
</script>