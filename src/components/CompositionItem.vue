<template lang="pug">
.border.border-gray-200.p-3.mb-4.rounded
  div(v-show='!showForm')
    h4.inline-block.text-2xl.font-bold {{ song.modified_name }}
    button.ml-1.py-1.px-2.text-sm.rounded.text-white.bg-red-600.float-right(@click.prevent='deleteSong')
      i.fa.fa-times
    button.ml-1.py-1.px-2.text-sm.rounded.text-white.bg-blue-600.float-right(@click.prevent='showForm = !showForm')
      i.fa.fa-pencil-alt
  div(v-show='showForm')
    .text-white.text-center.font-bold.p-4.mb-4(v-if='show_alert' :class='alert_variant')
      | {{ alert_message }}
    vee-form(@submit='edit' :validation-schema='schema' :initial-values='song')
      .mb-3
        label.inline-block.mb-2 Song Title
        vee-field.block.w-full.px-3.text-gray-800.border.border-gray-300.transition.duration-500.rounded(name='modified_name' type='text' class='py-1.5 focus:outline-none focus:border-black' placeholder='Enter Song Title' @input='updateUnsavedFlag(true)')
          errormessage.text-red-600(name='modified_name')
      .mb-3
        label.inline-block.mb-2 Genre
        vee-field.block.w-full.px-3.text-gray-800.border.border-gray-300.transition.duration-500.rounded(name='genre' type='text' class='py-1.5 focus:outline-none focus:border-black' placeholder='Enter Genre' @input='updateUnsavedFlag(true)')
          errormessage.text-red-600(name='genre')
      button.px-3.rounded.text-white.bg-green-600(type='submit' class='py-1.5' :disabled='in_submission')
        | Submit
      button.px-3.rounded.text-white.bg-gray-600(type='button' class='py-1.5' :disabled='in_submission' @click.prevent='showForm = false')
        | Go Back
</template>

<script>
import { songsCollection, storage } from "@/includes/firebase";

export default {
  name: "CompositionItem",
  props: {
    song: {
      type: Object,
      required: true,
    },
    updateSong: {
      type: Function,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
    removeSong: {
      type: Function,
      required: true,
    },
    updateUnsavedFlag: {
      type: Function,
    },
  },
  data() {
    return {
      showForm: false,
      schema: {
        modified_name: "required",
        genre: "alpha_spaces",
      },
      in_submission: false,
      show_alert: false,
      alert_variant: "bg-blue-500",
      alert_message: "Please wait! Updating song info",
    };
  },
  methods: {
    async edit(values) {
      this.in_submission = true;
      this.show_alert = true;
      this.alert_variant = "bg-blue-500";
      this.alert_message = "Please wait! Updating song info";

      try {
        await songsCollection.doc(this.song.docID).update(values);
      } catch (error) {
        this.in_submission = false;
        this.alert_variant = "bg-red-500";
        this.alert_message = "Something went wrong! Try again later";
        return;
      }

      this.updateSong(this.index, values);
      this.updateUnsavedFlag(false);

      this.in_submission = false;
      this.alert_variant = "bg-green-500";
      this.alert_message = "Success!";
    },
    async deleteSong() {
      const storageRef = storage.ref();
      const songRef = storageRef.child(`songs/${this.song.original_name}`);

      await songRef.delete();

      await songsCollection.doc(this.song.docID).delete();

      this.removeSong(this.index);
    },
  },
};
</script>
