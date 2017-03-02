<template>
  <div id="top">
    <md-layout md-align="center" md-gutter="16">
      <p id="top-label">Crane</p>
    </md-layout>
    <md-layout id="versin-wrapper" md-align="center" md-gutter="16">
      <p id="version">{{ version }}</p>
    </md-layout>
  </div>
</template>

<script>
  export default {
    name: 'top',
    data() {
      return {
        versionNumber: ''
      }
    },
    created() {
      let self = this
      this.$http.get('/about')
        .then(function(res) {
          self.versionNumber = res.body.version
        })
    },
    computed: {
      version: function() {
        if (this.versionNumber) {
          return `v ${this.versionNumber}`
        }
        return ''
      }
    }
  }
</script>

<style scoped>
  #top {
    margin-bottom: 60px;
  }

  #top-label {
    font-weight: bold;
    font-size: 6em;
    text-transform: uppercase;
  }

  #versin-wrapper {
    margin-top: -60px;
  }
</style>
