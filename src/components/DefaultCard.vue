<template>
  <v-card class="card">
    <div class="card-content">
      <slot />
    </div>
  </v-card>
</template>

<script>
  export default {
    name: 'DefaultCard'
  }
</script>

<style lang="scss" scoped>
.card {
  max-width: 75%;
  margin: 24px auto;
  z-index: 0;
  padding: 6px;
  background: linear-gradient(to right, #ffee58, #d53a9d);
  &-content {
    background: #fff;
    padding: 16px;
  }
}
</style>
