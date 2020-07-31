<template>
  <div class="fill centering">
    <div class="icon icon-music" @click="$emit('click')"/>
  </div>
</template>

<style scoped>
.icon {
    width: 25px;
    height: 25px;
    background-image: url(../../../../../assets/img/icon_maps.png);
    background-repeat: no-repeat;
    background-size: 155px 125px;
    cursor: pointer;
    pointer-events: auto;
}
.icon-music {
    background-position: -2.5px -97.5px;
}
</style>
