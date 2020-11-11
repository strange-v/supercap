<template>
  <div id="app">
    <div id="header">
      <div class="name">Supercapacitor Discharge Calculator</div>
      <div class="center"></div>
      <div class="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/formulas">Formulas</router-link>
        <!-- <router-link to="/about">About</router-link> -->
      </div>
    </div>
    <router-view/>
  </div>
</template>
<script>
import Vue from 'vue';
import VueKatex from 'vue-katex';
import 'katex/dist/katex.min.css';

Vue.use(VueKatex, {
  globalOptions: {
  }
});

export default {
  
}
</script>
<style lang="scss">
body {
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  font-size: 14px;
}
#header {
  display: flex;
  padding: 12px 24px;
  margin-bottom: 24px;
  background: #1e1e1e;
  color: #fff;
  
  .name {
    margin-right: 24px;
    overflow: hidden;
    font-size: 16px;
  }
  .center {
    flex: 1;
  }
  .nav {
    a {
      color: #999;
      text-decoration: none;

      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }
}
.page {
  font-size: 14px;
  max-width: 900px;
  margin: auto;
  padding-bottom: 24px;

  h1 {
    margin-top: 24px;
    margin-bottom: 8px;
  }
  h2 {
    margin-top: 24px;
    margin-bottom: 8px;
  }
  h3 {
    margin-top: 16px;
    margin-bottom: 0;
  }
  p {
    margin: 8px 0 16px 0;
    line-height: 2em;

    &.center {
      text-align: center;
    }

    ul {
      margin: 0;
    }
  }
}
input:focus, textarea:focus, select:focus{
  outline: none;
}
</style>
