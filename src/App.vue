<template>
  <v-app id="app">
    <default-layout>
      <router-view style="z-index: 1" />
    </default-layout>
  </v-app>
</template>

<script>
  export default {
    name: 'App',

    data: () => ({
    //
    }),
  };
</script>

<style lang="scss" scoped>

</style>
