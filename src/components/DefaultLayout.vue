<template>
  <v-main>
    <div class="layout">
      <h1>STAR</h1>
      <h1>WARS</h1>
      <div class="layout-stars" />
    </div>
    <slot />
  </v-main>
</template>

<script>
  export default {
    name: 'DefaultLayout',
  };
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Russo+One&display=swap');


/* @keyframes move-twink-back {
    from {background-position:0 0;}
    to {background-position:-10000px 5000px;}
}
@-webkit-keyframes move-twink-back {
    from {background-position:0 0;}
    from {background-position:0 0;}
    to {background-position:-10000px 5000px;}
}
@-ms-keyframes move-twink-back {
    from {background-position:0 0;}
    to {background-position:-10000px 5000px;}
}
@-moz-keyframes move-twink-back {
    from {background-position:0 0;}
    to {background-position:10000px 0;}
} */


.layout {
  display: flex;
  flex: 1 1 auto;
  justify-content: center;
  gap: 12px;

  h1 {
    font-family: 'Russo One', sans-serif;
    font-size: 4em;
    color: #FFEE58;
    z-index: 2;
  }
  &-stars {
    background:#000 url(http://www.script-tutorials.com/demos/360/images/stars.png) repeat top center;
    position:absolute;
    top:0;
    left:0;
    right:0;
    bottom:0;
    width:100%;
    height:100%;
    z-index: 0;
  }


  /* &-stars::after {
    content: '';
    top:0;
    left:0;
    right:0;
    bottom:0;
    position: absolute;
    display: block;
    background:transparent url(http://www.script-tutorials.com/demos/360/images/twinkling.png) repeat top center;
    z-index: 0;

    -moz-animation:move-twink-back 200s linear infinite;
    -ms-animation:move-twink-back 200s linear infinite;
    -o-animation:move-twink-back 200s linear infinite;
    -webkit-animation:move-twink-back 200s linear infinite;
    animation:move-twink-back 200s linear infinite;
  } */
}

</style>
