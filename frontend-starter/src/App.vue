<template>
  <div id="app">
    <v-app id="inspire">
      <v-app-bar class="navbar" color="orange" dark app>
        <v-toolbar-title>Baltimore Crime Data</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-sm-and-down">
          <router-link to="/" tag="button">Home</router-link>
          <v-divider class="mx-10" vertical></v-divider>
          <router-link to="/graph" tag="button">Graph</router-link>
          <v-divider class="mx-10" vertical></v-divider>
          <router-link to="/heatmap" tag="button">Heat Map</router-link>
        </v-toolbar-items>
      </v-app-bar>
      <v-content class="vcontent">
        <router-view />
      </v-content>
    </v-app>
    <div class="bottomTab">
      <div class="bottomTabText">
         <p>University of Maryland Baltimore County @ 2020</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.navbar {
  z-index: 9999;
}

.vcontent {
  z-index: 0;
}

.bottomTab {
    margin-top: 60px;
    background: orange;
    width: 100%;
    height: 4vw;
}
.bottomTabText {
    color: white;
    text-align: center;
    position: relative;
    top: 30%;
}

</style>
