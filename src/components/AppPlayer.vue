<template lang="pug">
div(class="fixed bottom-0 left-0 bg-white px-4 py-2 w-full")
  // Track Info
  .text-center(v-if="current_song.modified_name")
    span.song-title.font-bold {{ current_song.modified_name }} 
    span by 
    span.song-artist {{current_song.display_name}}
  div(class="flex flex-nowrap gap-4 items-center")
    // Play/Pause Button
    button(type="button" @click.prevent="toggleAudio")
      i.fa.text-gray-500.text-xl(:class="{'fa-play': !playing, 'fa-pause': playing}")
    // Current Position
    .player-currenttime {{ seek }}
    // Scrub Container
    div(class="w-full h-2 rounded bg-gray-200 relative cursor-pointer")
      // Player Ball
      span(class="absolute -top-2.5 -ml-2.5 text-gray-800 text-lg" :style="{left: playerProgress}")
        i.fas.fa-circle
      // Player Progress Bar
      span(class="block h-2 rounded bg-gradient-to-r from-green-500 to-green-400" :style="{width: playerProgress}")
    // Duration
    .player-duration {{ duration }}
</template>

<script>
import { mapActions, mapState } from 'pinia'
import usePlayerStore from "@/stores/player"
export default {
  name: "AppPlayer",
  methods: {
    ...mapActions(usePlayerStore, ["toggleAudio"]),
  },
  computed: {
    ...mapState(usePlayerStore, [
      "playing",
      "duration",
      "seek",
      "playerProgress",
      "current_song",
    ]),
  }
}
</script>

<style lang="scss" scoped></style>