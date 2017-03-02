<template lang="html">
  <md-snackbar :md-position="'bottom center'" ref="snackbar" :md-duration=4000>
    <span>{{ msg }}</span>
    <md-button class="md-accent" @click.native="$refs.snackbar.close()">OK</md-button>
  </md-snackbar>
</template>

<script>
  export default {
    name: 'snackbar',
    props: ['msg'],
    methods: {
      show: function() {
        this.$refs.snackbar.open()
      }
    }
  }
</script>
