<template>
  <v-progress-circular
    class="preloader"
    indeterminate
    color="primary" />
</template>

<script>

export default {
  name: 'DefaultPreloader',
}
</script>

<style lang="scss" scoped>
.preloader {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
}
</style>
