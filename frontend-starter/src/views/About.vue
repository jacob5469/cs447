<template>
  <div class="image">
    <img src="../assets/crime.jpg" alt="Baltimore Crime Data" width="100%" height="500" />
    <h1>
      <span>
        <span class="spacer"></span>About Baltimore Crime Data
      </span>
    </h1>
    
    <p class = "aboutPageDescription">
      <b>Baltimore</b> is the most populous city in the U.S. state of Maryland, as well as the 30th 
      most populous city in the United States, with a population of 602,495 in 2018 and also 
      the largest such independent city in the country. Baltimore was established by the Constitution 
      of Maryland[9] as an independent city in 1729. As of 2017, the population of the Baltimore 
      metropolitan area was estimated to be just under 2.802 million, making it the 21st largest 
      metropolitan area in the country.
    </p>
  </div>
</template>

<style>
.image { 
  width: 100%;
  height: 600px;
}

h1 {
  position: absolute; /* To place the text on the image*/
  top: 60px; /* The exact location of the text from the top of the image*/
  left: 0px;  /* Other beautification stuff */
  width: 100%;
}

h1 span 
 {
  color: white;
  font: bold 36px Helvetica, Sans-Serif;
  letter-spacing: -1px;
  padding: 10px;
}

h1 span.spacer {
  padding: 0 0px;
}

.aboutPageDescription {
    margin-top: 1cm;
    margin-left: 1cm;
    margin-right: 1cm;
    font: 20px Helvetica, Sans-Serif;
    text-align: left;
}
</style>