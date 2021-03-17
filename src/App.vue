<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
    <!-- insight-pack：tailwindcss 使用到的样式 -->
    <i
      v-show="false"
      class=" 
      text-red-500 text-xs mt-3 w-full clear-both text-sm ml-5 p-0 text-center  
      border rounded bg-white relative head p-4 px-5 border-b border-solid 
      border-gray-200 text-base inline-block m-0 font-bold text-gray-900  p-5 
      relative py-2 font-bold text-gray-800 ml-1.5 -top-0.5 el-rate inline-block 
      ml-2.5 relative ellipsis-two mr-5 my-5 text-gray-700 block font-bold mt-5 
      text-center text-gray-700 text-lg mt-1.5 text-center text-gray-500 
      text-xs text-gray-500 mr-3 mr-1 mt-1 mr-0.5 text-right
    "
    />
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

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
