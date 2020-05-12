<template>
  <div class>
    <div>
      <img
        src="../assets/baltimore.jpg"
        class="headerImage"
        alt="Baltimore Crime Data"
        width="100%"
        height="600"
      />
      <h1>
        <span> <span class="spacer"></span>Baltimore Crime Data </span>
      </h1>
    </div>
    <div class="container">
      <div class="row">
        <div class="col">
          <img src="../assets/graph.png" />
          <h3 class="text-center">Visual Statistics</h3>
        </div>

        <div class="col">
          <img src="../assets/wan_map.png" />
          <h3 class="text-center">Real Time Heat Map</h3>
        </div>

        <div class="col">
          <img src="../assets/filter.png" />
          <h3 class="text-center">Powerful Filter</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.headerImage {
  filter: brightness(65%);
}

h1 {
  position: absolute; /* To place the text on the image*/
  top: 140px; /* The exact location of the text from the top of the image*/
  left: 0px; /* Other beautification stuff */
  width: 100%;
}
h1 span {
  color: white;
  font: bold 40px Helvetica, Sans-Serif;
  letter-spacing: -1px;
  padding: 10px;
}
h1 span.spacer {
  padding: 0 0px;
}

.table {
  display: table; /* Allow the centering to work */
  margin: 0 auto;
}

.text-center {
  margin-top: 40px;
}

ul#horizontal-list {
  min-width: 400px;
  list-style: none;
  padding-top: 20px;
}
ul#horizontal-list li {
  display: inline;
  margin: 100px 100px;
}
</style>
