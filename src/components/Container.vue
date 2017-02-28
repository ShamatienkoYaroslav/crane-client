<template>
  <div id="container">
    <md-layout md-align="center">
      <div v-on:click="restartContainer">
        <md-button class="md-raised md-primary">
          <svg style="width:24px;height:24px" viewBox="0 0 24 24">
            <path fill="#000000" d="M11,4C13.05,4 15.09,4.77 16.65,6.33C19.78,9.46 19.77,14.5 16.64,17.64C14.81,19.5 12.3,20.24 9.91,19.92L10.44,17.96C12.15,18.12 13.93,17.54 15.24,16.23C17.58,13.89 17.58,10.09 15.24,7.75C14.06,6.57 12.53,6 11,6V10.58L6.04,5.63L11,0.68V4M5.34,17.65C2.7,15 2.3,11 4.11,7.94L5.59,9.41C4.5,11.64 4.91,14.39 6.75,16.23C7.27,16.75 7.87,17.16 8.5,17.45L8,19.4C7,19 6.12,18.43 5.34,17.65Z" />
          </svg>
          Restart
        </md-button>
      </div>
      <div v-on:click="startContainer">
        <md-button class="md-raised">
          <svg style="width:24px;height:24px" viewBox="0 0 24 24">
            <path fill="#000000" d="M8,5.14V19.14L19,12.14L8,5.14Z" />
          </svg>
          Start
        </md-button>
      </div>
      <div v-on:click="stopContainer">
        <md-button class="md-raised">
          <svg style="width:24px;height:24px" viewBox="0 0 24 24">
            <path fill="#000000" d="M14,19H18V5H14M6,19H10V5H6V19Z" />
          </svg>
          Stop
        </md-button>
      </div>
      <div v-on:click.prevent="updateContainer">
        <md-button class="md-raised md-accent">
          <svg style="width:24px;height:24px" viewBox="0 0 24 24">
            <path fill="#000000" d="M12,18A6,6 0 0,1 6,12C6,11 6.25,10.03 6.7,9.2L5.24,7.74C4.46,8.97 4,10.43 4,12A8,8 0 0,0 12,20V23L16,19L12,15M12,4V1L8,5L12,9V6A6,6 0 0,1 18,12C18,13 17.75,13.97 17.3,14.8L18.76,16.26C19.54,15.03 20,13.57 20,12A8,8 0 0,0 12,4Z" />
          </svg>
          Update
        </md-button>
      </div>
      <div v-on:click="pullImage">
        <md-button class="md-raised" >
          <svg style="width:24px;height:24px" viewBox="0 0 24 24">
            <path fill="#000000" d="M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z" />
          </svg>
          Pull
        </md-button>
      </div>
    </md-layout>
    <md-layout md-align="center" v-if="!loading">
      <div class="content">
        <p class="content-section">IMAGE</p>
        <p><span class="content-title">Image: </span>{{ image }}</p>
        <p><span class="content-title">Image ID: </span>{{ imageShortId }} <md-tooltip md-direction="bottom">{{ imageId }}</md-tooltip></p>
        <p><span class="content-title">Image Architecture: </span>{{ imageAttrs.Architecture }}</p>
        <p><span class="content-title">Image Author: </span>{{ imageAttrs.Author }}</p>
        <p><span class="content-title">Image Created At: </span>{{ imageAttrs.Created }}</p>
        <p class="content-section">CONTAINER</p>
        <p><span class="content-title">Container Name: </span>{{ containerName }}</p>
        <p><span class="content-title">Container ID: </span>{{ shortId }} <md-tooltip md-direction="bottom">{{ id }}</md-tooltip></p>
        <p><span class="content-title">Container Created At: </span>{{ attrs.Created }}</p>
        <p><span class="content-title">Container Started At: </span>{{ attrs.State.StartedAt }}</p>
        <p><span class="content-title">Container IP Address: </span>{{ attrs.NetworkSettings.IPAddress }}</p>
        <p><span class="content-title">Container Gateway: </span>{{ attrs.NetworkSettings.Gateway }}</p>
        <p><span class="content-title">Container Mac Address: </span>{{ attrs.NetworkSettings.MacAddress }}</p>
        <p><span class="content-title">Container PID: </span>{{ attrs.State.Pid }}</p>
        <p><span class="content-title">Container Status: </span>{{ status }}</p>
        <p class="content-section">PARAMS</p>
        <p><span class="content-title">Restart: </span>{{ restart }}</p>
        <p><span class="content-title">Privileged: </span>{{ privileged }}</p>
        <p><span class="content-title">Ports: </span>{{ ports }}</p>
        <p><span class="content-title">Volumes: </span>{{ volumes }}</p>
        <p><span class="content-title">Image Source: </span>{{ imageSource }}</p>
        <p class="content-section">DOCKER</p>
        <p><span class="content-title">Docker Version: </span>{{ imageAttrs.DockerVersion }}</p>
      </div>
    </md-layout>
    <md-layout md-align="center" v-else>
      <md-spinner :md-size="150" :md-stroke="1" md-indeterminate ></md-spinner>
    </md-layout>
  </div>
</template>

<script>
  export default {
    name: 'container',
    data() {
      return {
        loading: true,
        image: '',
        imageId: '',
        imageShortId: '',
        containerName: '',
        id: '',
        shortId: '',
        status: '',
        restart: '',
        privileged: '',
        ports: '',
        volumes: '',
        ftpUse: false,
        localPath: '',
        attrs: {
          Created: '',
          State: {
            StartedAt: '',
            Pid: ''
          },
          NetworkSettings: {
            IPAddress: '',
            Gateway: '',
            MacAddress: ''
          }
        },
        imageAttrs: {
          Architecture: '',
          Author: '',
          Created: '',
          DockerVersion: ''
        }
      }
    },
    created() {
      var self = this
      this.loading = true
      this.$http.get('/status')
        .then(function(res) {
          self.loading = false
          Object.assign(self, res.body)
          if (!self.attrs) {
            self.attrs = {
              Created: '',
              State: {
                StartedAt: '',
                Pid: ''
              },
              NetworkSettings: {
                IPAddress: '',
                Gateway: '',
                MacAddress: ''
              }
            }
          }
          if (!self.imageAttrs) {
            self.imageAttrs = {
              Architecture: '',
              Author: '',
              Created: '',
              DockerVersion: ''
            }
          }
        })
    },
    methods: {
      callAPI: function(url) {
        var self = this
        this.loading = true
        this.$http.get(url)
          .then(function(res) {
            return self.$http.get('/status')
          })
          .then(function(res) {
            self.loading = false
            Object.assign(self, res.body)
          })
      },
      startContainer: function() { this.callAPI('/start') },
      stopContainer: function() { this.callAPI('/stop') },
      restartContainer: function() { this.callAPI('/restart') },
      updateContainer: function() { this.callAPI('/update') },
      pullImage: function() { this.callAPI('/pull') }
    },
    computed: {
      imageSource: () => {
        if (this.ftpUse) {
          return 'FTP'
        } else if (this.localPath) {
          return 'Local Path'
        } else {
          return 'Web Hub'
        }
      }
    }
  }
</script>

<style>
  #container {
    margin-bottom: 60px;
  }

  .content {
    text-align: left;
    width: 600px;
    margin: 30px 0;
    font-size: 16px;
  }

  .content-section {
    margin-top: 30px;
    text-transform: uppercase;
    font-weight: bold;
  }

  .content-title {
    font-weight: 500;
  }
</style>
