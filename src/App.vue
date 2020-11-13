<template>
  <div id="app">
    <div id="header">
      <div class="name">Supercapacitor Discharge Calculator</div>
      <div class="name name-short">Calculator</div>
      <div class="center"></div>
      <div class="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/formulas">Formulas</router-link> |
        <router-link to="/about">About</router-link>
      </div>
    </div>
    <div class="page-container">
      <router-view/>
    </div>
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
* {
  box-sizing: border-box;
}
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
  position: fixed;
  width: 100%;
  display: flex;
  padding: 12px 24px;
  margin-bottom: 24px;
  background: #1e1e1e;
  color: #fff;
  z-index: 10;
  
  .name {
    margin-right: 24px;
    overflow: hidden;
    font-size: 16px;
  }
  .name-short {
    display: none;
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
.page-container {
  padding-top: 60px;
}
.page {
  font-size: 14px;
  max-width: 900px;
  margin: auto;
  padding-bottom: 24px;

  h1 {
    margin-top: 16px;
    margin-bottom: 8px;
  }
  h2 {
    margin-top: 16px;
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
input:focus, textarea:focus, select:focus {
  outline: none;
}
@media only screen and (max-width:480px) {
  #header {
    margin-bottom: 12px;

    .name {
      display: none;
    }
    .name-short {
      display: block;
    }
  }
  .page {
    box-sizing: border-box;
    width: 100%;
    margin: 0;
    padding: 0 12px 24px 12px;
  }
}
</style>
