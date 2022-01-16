<template>
  <v-card class="card">
    <div class="card-content">
      <slot name="nav" />
      <slot
        v-if="!loading"
        name="content" />
      <default-preloader v-else />
    </div>
  </v-card>
</template>

<script>
  export default {
    name: 'DefaultCard',
    props: {
      loading: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style lang="scss" scoped>
.card {
  max-width: 75%;
  margin: 24px auto;
  z-index: 0;
  padding: 6px;
  background: linear-gradient(to right, #FFE81F, #381010);
  &-content {
    position: relative;
    background: #fff;
    min-height: 400px;
    padding: 16px;
  }
}
</style>
