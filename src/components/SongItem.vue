<template lang="pug">
li(class="flex justify-between items-center p-3 pl-6 cursor-pointer transition duration-300 hover:bg-gray-50")
  div
    RouterLink(:to="{ name: 'song', params: { id: song.docID } }" class="font-bold block text-gray-600") {{ song.modified_name }}
    span.text-gray-500.text-sm {{ song.display_name }}

  .text-gray-600.text-lg
    RouterLink(custom :to="{ name: 'song', params: { id: song.docID }, hash: '#comments' }"
    v-slot="{navigate}")
      span.comments(@click="navigate")
        i.fa.fa-comments.text-gray-600 {{ song.comment_count }}
</template>

<script>
export default {
  name: "SongItem",
  props: ['song'],
}

</script>

<style lang="scss" scoped></style>