<template lang="pug">
main
  section.mb-8.py-20.text-white.text-center.relative
    .absolute.inset-0.w-full.h-full.bg-contain.introduction-bg(style="background-image: url(assets/img/header.png)")
    .container.mx-auto
      .text-white.main-header-content
        h1.font-bold.text-5xl.mb-5 Listen to Great Music!
        p(class="w-full md:w-8/12 mx-auto") Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
          | et dolor mollis, congue augue non, venenatis elit. Nunc justo eros,
          | suscipit ac aliquet imperdiet, venenatis et sapien. Duis sed magna
          | pulvinar, fringilla lorem eget, ullamcorper urna.
    img(class="relative block mx-auto mt-5 -mb-20 w-auto max-w-full" src="/assets/img/introduction-music.png" alt="introduction")

  section.container.mx-auto
    .bg-white.rounded.border.border-gray-200.relative.flex.flex-col
      .px-6.pt-6.pb-5.font-bold.border-b.border-gray-200
        span.card-title Songs
        i.fa.fa-headphones-alt.float-right.text-green-400.text-xl
      ol#playlist
        SongItem(v-for="song in songs" :key="song.docID" :song="song")
</template>

<script>
import { songsCollection } from '@/includes/firebase'
import SongItem from '@/components/SongItem.vue'

export default {
  name: "HomeView",
  data() {
    return {
      songs: [],
      maxPerPage: 3,
      pendingRequest: false,
    }
  },
  components: {
    SongItem,
  },
  async created() {
    this.getSongs()

    window.addEventListener('scroll', this.handleScroll)
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      const { scrollTop, offsetHeight } = document.documentElement
      const { innerHeight } = window
      const bottomOfWindow = Math.round(scrollTop) + innerHeight === offsetHeight

      if (bottomOfWindow) {
        this.getSongs()
      }
    },
    async getSongs() {

      if (this.pendingRequest) return

      this.pendingRequest = true

      let snapshots

      if (this.songs.length) {
        const lastDocument = await songsCollection
          .doc(this.songs[this.songs.length - 1].docID)
          .get()
        snapshots = await songsCollection
          .orderBy('modified_name')
          .startAfter(lastDocument)
          .limit(this.maxPerPage)
          .get()
      } else {
        snapshots = await songsCollection
          .orderBy('modified_name')
          .limit(this.maxPerPage)
          .get()
      }


      snapshots.forEach((document) => {
        this.songs.push({
          docID: document.id,
          ...document.data(),
        })
      })

      this.pendingRequest = false
    }
  }
}
</script>