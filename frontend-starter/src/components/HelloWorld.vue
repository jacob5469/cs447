<template>
  <div>
    <v-menu offset-y>
      <v-btn
        slot="activator"
        color="primary"
        dark
      >
        Dropdown
      </v-btn>
      <v-list>
        <v-list-tile>
          <v-list-tile-title>Choice 1</v-list-tile-title>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-title>Choice 1</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
    <v-btn color="secondary">Click me!</v-btn>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;

  // Stuff I was messing around with
  private someProperty = "Some computed property";
  get someComputedProperty(): string {

    return this.someProperty;

  }
  set someComputedProperty(val : string) {

    this.someProperty = val;

  }

  echo(msg : string) : string {

    return msg;

  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
