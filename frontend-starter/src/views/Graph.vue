<template>
  <div>
    <!-- <div class="main-view">
      <Graphs />
    </div> -->
    <Graphs />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Graphs from "../components/Graphs.vue";

@Component({
  components: {
    Graphs,
  }
})
export default class Graph extends Vue {
}
</script>

<style>
/* .main-view {
  width: 100%;
  height: 100%;
}

.graphs {
  width: 80%;
  height: 100%;
  background-color: yellow;
} */

</style>
