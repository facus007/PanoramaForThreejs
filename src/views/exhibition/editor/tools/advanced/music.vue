<template>
  <div class="centering fill">
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
    background-position: -32.5px -97.5px;
}
.icon-music-mute{
    background-position: -97.5px -32.5px;
}
</style>
