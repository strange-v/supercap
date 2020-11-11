<template>
  <div id="app">
    <div id="header">
      <div class="name">Supercapacitor Discharge Calculator</div>
      <div class="center"></div>
      <div class="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/formulas">Formulas</router-link> |
        <router-link to="/about">About</router-link>
      </div>
    </div>
    <router-view/>
  </div>
</template>

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

input:focus, textarea:focus, select:focus{
  outline: none;
}
</style>
