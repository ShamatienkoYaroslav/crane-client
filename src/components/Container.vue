<template>
  <div id="container">
    <md-layout md-align="center">
      <div v-on:click="restartContainer">
        <md-button class="md-raised md-primary">
          <svg style="width:24px;height:24px" viewBox="0 0 24 24">
            <path fill="#000000" d="M11,4C13.05,4 15.09,4.77 16.65,6.33C19.78,9.46 19.77,14.5 16.64,17.64C14.81,19.5 12.3,20.24 9.91,19.92L10.44,17.96C12.15,18.12 13.93,17.54 15.24,16.23C17.58,13.89 17.58,10.09 15.24,7.75C14.06,6.57 12.53,6 11,6V10.58L6.04,5.63L11,0.68V4M5.34,17.65C2.7,15 2.3,11 4.11,7.94L5.59,9.41C4.5,11.64 4.91,14.39 6.75,16.23C7.27,16.75 7.87,17.16 8.5,17.45L8,19.4C7,19 6.12,18.43 5.34,17.65Z" />
          </svg>
          <md-tooltip md-direction="bottom">Restart container</md-tooltip>
          Restart
        </md-button>
      </div>
      <div v-on:click="startContainer">
        <md-button class="md-raised">
          <svg style="width:24px;height:24px" viewBox="0 0 24 24">
            <path fill="#000000" d="M8,5.14V19.14L19,12.14L8,5.14Z" />
          </svg>
          <md-tooltip md-direction="bottom">Start container</md-tooltip>
          Start
        </md-button>
      </div>
      <div v-on:click="stopContainer">
        <md-button class="md-raised">
          <svg style="width:24px;height:24px" viewBox="0 0 24 24">
            <path fill="#000000" d="M14,19H18V5H14M6,19H10V5H6V19Z" />
          </svg>
          <md-tooltip md-direction="bottom">Stop container</md-tooltip>
          Stop
        </md-button>
      </div>
      <div v-on:click="removeContainer">
        <md-button class="md-raised md-warn">
          <svg style="width:24px;height:24px" viewBox="0 0 24 24">
            <path fill="#000000" d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
          </svg>
          <md-tooltip md-direction="bottom">Remove container</md-tooltip>
          Remove
        </md-button>
      </div>
      <div v-on:click="pullImage">
        <md-button class="md-raised" >
          <svg style="width:24px;height:24px" viewBox="0 0 24 24">
            <path fill="#000000" d="M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z" />
          </svg>
          <md-tooltip md-direction="bottom">Pull image</md-tooltip>
          Pull
        </md-button>
      </div>
      <div v-on:click.prevent="updateContainer">
        <md-button class="md-raised md-accent">
          <svg style="width:24px;height:24px" viewBox="0 0 24 24">
            <path fill="#000000" d="M12,18A6,6 0 0,1 6,12C6,11 6.25,10.03 6.7,9.2L5.24,7.74C4.46,8.97 4,10.43 4,12A8,8 0 0,0 12,20V23L16,19L12,15M12,4V1L8,5L12,9V6A6,6 0 0,1 18,12C18,13 17.75,13.97 17.3,14.8L18.76,16.26C19.54,15.03 20,13.57 20,12A8,8 0 0,0 12,4Z" />
          </svg>
          <md-tooltip md-direction="bottom">Pull image and restart container</md-tooltip>
          Update
        </md-button>
      </div>
    </md-layout>
    <md-layout md-align="center" v-if="!loading">
      <div class="content">
        <p class="content-section">IMAGE</p>
        <p><span class="content-title">Image: </span>{{ image }}</p>
        <p><span class="content-title" v-if="!!imageShortId">Image ID: </span>{{ imageShortId }} <md-tooltip md-direction="bottom">{{ imageId }}</md-tooltip></p>
        <p><span class="content-title" v-if="!!imageAttrs.Architecture">Image Architecture: </span>{{ imageAttrs.Architecture }}</p>
        <p><span class="content-title" v-if="!!imageAttrs.Author">Image Author: </span>{{ imageAttrs.Author }}</p>
        <p><span class="content-title" v-if="!!imageAttrs.Created">Image Created At: </span>{{ imageAttrs.Created }}</p>
        <p class="content-section">CONTAINER</p>
        <p><span class="content-title">Container Name: </span>{{ containerName }}</p>
        <p><span class="content-title" v-if="!!shortId">Container ID: </span>{{ shortId }} <md-tooltip md-direction="bottom">{{ id }}</md-tooltip></p>
        <p><span class="content-title" v-if="!!attrs.Created">Container Created At: </span>{{ attrs.Created }}</p>
        <p><span class="content-title" v-if="!!attrs.State.StartedAt">Container Started At: </span>{{ attrs.State.StartedAt }}</p>
        <p><span class="content-title" v-if="!!attrs.NetworkSettings.IPAddress">Container IP Address: </span>{{ attrs.NetworkSettings.IPAddress }}</p>
        <p><span class="content-title" v-if="!!attrs.NetworkSettings.Gateway">Container Gateway: </span>{{ attrs.NetworkSettings.Gateway }}</p>
        <p><span class="content-title" v-if="!!attrs.NetworkSettings.MacAddress">Container Mac Address: </span>{{ attrs.NetworkSettings.MacAddress }}</p>
        <p><span class="content-title" v-if="!!attrs.State.Pid">Container PID: </span>{{ attrs.State.Pid }}</p>
        <p><span class="content-title">Container Status: </span>{{ containerStatus }}</p>
        <p class="content-section">PARAMS</p>
        <p><span class="content-title">Restart: </span>{{ restart }}</p>
        <p><span class="content-title">Privileged: </span>{{ privileged }}</p>
        <p><span class="content-title" v-if="!!ports">Ports: </span>{{ ports }}</p>
        <p><span class="content-title" v-if="!!volumes">Volumes: </span>{{ volumes }}</p>
        <p><span class="content-title">Image Source: </span>{{ imageSource }}</p>
        <p class="content-section" v-if="!!imageAttrs.DockerVersion">DOCKER</p>
        <p><span class="content-title" v-if="!!imageAttrs.DockerVersion">Docker Version: </span>{{ imageAttrs.DockerVersion }}</p>
      </div>
    </md-layout>
    <md-layout md-align="center" v-else>
      <md-spinner :md-size="150" :md-stroke="1" md-indeterminate ></md-spinner>
    </md-layout>
    <snackbar :msg="snackbarMsg" ref="snackbar"></snackbar>
  </div>
</template>

<script>
  import { API_URL_RESTART, API_URL_START, API_URL_STOP, API_URL_UPDATE, API_URL_REMOVE, API_URL_PULL, API_URL_STATUS } from '../consts'
  import Snackbar from './Snackbar'

  export default {
    name: 'container',
    components: {
      Snackbar
    },
    data() {
      return {
        loading: true,
        snackbarMsg: '',
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
      this.$http.get(API_URL_STATUS)
        .then(function(res) {
          self.loading = false
          self.updateData(res.body)
        })
    },
    methods: {
      callAPI: function(url) {
        var self = this
        this.loading = true
        this.$http.get(url)
          .then(function(res) {
            return self.$http.get(API_URL_STATUS)
          })
          .then(function(res) {
            self.updateData(res.body)
            self.showSnackbar(url)
            self.loading = false
          })
      },
      startContainer: function() { this.callAPI(API_URL_START) },
      stopContainer: function() { this.callAPI(API_URL_STOP) },
      restartContainer: function() { this.callAPI(API_URL_RESTART) },
      updateContainer: function() { this.callAPI(API_URL_UPDATE) },
      removeContainer: function() { this.callAPI(API_URL_REMOVE) },
      pullImage: function() { this.callAPI(API_URL_PULL) },
      showSnackbar: function(url) {
        if (url === API_URL_START) {
          this.snackbarMsg = 'Container started.'
        } else if (url === API_URL_STOP) {
          this.snackbarMsg = 'Container stopped.'
        } else if (url === API_URL_RESTART) {
          this.snackbarMsg = 'Container restarted.'
        } else if (url === API_URL_REMOVE) {
          this.snackbarMsg = 'Container removed.'
        } else if (url === API_URL_PULL) {
          this.snackbarMsg = 'Image pulled.'
        } else if (url === API_URL_UPDATE) {
          this.snackbarMsg = 'Image pulled and container restarted.'
        }
        this.$refs.snackbar.show()
      },
      updateData: function(data) {
        Object.assign(this, data)
        if (!this.attrs) {
          this.attrs = {
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
        if (!this.imageAttrs) {
          this.imageAttrs = {
            Architecture: '',
            Author: '',
            Created: '',
            DockerVersion: ''
          }
        }
      }
    },
    computed: {
      imageSource: function() {
        if (this.ftpUse == true) {
          return 'FTP'
        } else if (!!this.localPath) {
          return 'Local Path'
        } else {
          return 'Web Hub'
        }
      },
      containerStatus: function() {
        if (!!this.status) {
          return this.status
        } else {
          return 'not created'
        }
      }
    }
  }
</script>

<style scoped>
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
