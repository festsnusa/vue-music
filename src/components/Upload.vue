<template lang="pug">
.bg-white.rounded.border.border-gray-200.relative.flex.flex-col
  .px-6.pt-6.pb-5.font-bold.border-b.border-gray-200
    span.card-title Upload
    i.fas.fa-upload.float-right.text-green-400.text-2xl
  .p-6
    // Upload Dropbox
    .w-full.px-10.py-20.rounded.text-center.cursor-pointer.border.border-dashed.border-gray-400.text-gray-400.transition.duration-500(class='hover:text-white hover:bg-green-400 hover:border-green-400 hover:border-solid' :class="{ 'bg-green-400 border-green-400 border-solid': is_dragover }" @drag.prevent.stop='' @dragstart.prevent.stop='' @dragend.prevent.stop='is_dragover = true' @dragover.prevent.stop='is_dragover = true' @dragenter.prevent.stop='is_dragover = true' @dragleave.prevent.stop='is_dragover = false' @drop.prevent.stop='upload($event)')
      h5 Drop your files here
    input(type='file' multiple='' @change='upload($event)')
    hr.my-6
    // Progess Bars
    .mb-4(v-for='upload in uploads' :key='upload.name')
      // File Name
      .font-bold.text-sm(:class='upload.text_class')
        i(:class='upload.icon')
        | {{ upload.name }}
      .flex.h-4.overflow-hidden.bg-gray-200.rounded
        // Inner Progress Bar
        .transition-all.progress-bar(:class='upload.variant' :style="{ width: upload.current_progress + '%' }")
</template>

<script>
import { storage, auth, songsCollection } from '@/includes/firebase'

export default {
  name: "Upload-view",
  data() {
    return {
      is_dragover: false,
      uploads: []
    }
  },
  methods: {
    upload($event) {
      this.is_dragover = false

      const files = $event.dataTransfer ? [...$event.dataTransfer.files]
        : [...$event.target.files]

      files.forEach((file) => {
        if (file.type !== 'audio/mpeg') {
          return
        }

        if (!navigator.onLine) {
          this.uploads.push({
            task: {},
            current_progress: 100,
            name: file.name,
            variant: 'bg-red-400',
            icon: 'fas fa-times',
            text_class: 'text-red-400',
          })
        }

        const storageRef = storage.ref()
        const songsRef = storageRef.child(`songs/${file.name}`)
        const task = songsRef.put(file)

        const uploadIndex = this.uploads.push({
          task,
          current_progress: 0,
          name: file.name,
          variant: 'bg-blue-400',
          icon: 'fas fa-spinner fa-spin',
          text_class: '',
        }) - 1

        task.on('state_changed', (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          this.uploads[uploadIndex].current_progress = progress
        }, (error) => {
          this.uploads[uploadIndex].variant = 'bg-red-400'
          this.uploads[uploadIndex].icon = 'fas fa-times'
          this.uploads[uploadIndex].text_class = 'text-red-400'
          console.log(error)
        }, async () => {

          const song = {
            uid: auth.currentUser.uid,
            display_name: auth.currentUser.displayName,
            original_name: task.snapshot.ref.name,
            modified_name: task.snapshot.ref.name,
            genre: '',
            comment_count: 0,
          }

          song.url = await task.snapshot.ref.getDownloadURL()
          await songsCollection.add(song)

          this.uploads[uploadIndex].variant = 'bg-green-400'
          this.uploads[uploadIndex].icon = 'fas fa-check'
          this.uploads[uploadIndex].text_class = 'text-green-400'

        })
      })

    },
    beforeUnmount() {
      this.uploads.forEach((upload) => {
        upload.task.cancel()
      })
    }
  }
}
</script>