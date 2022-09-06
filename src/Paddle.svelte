<script lang="ts">
  import type { Paddle } from "./game";
  export let leftPaddle: Paddle;
  export let rightPaddle: Paddle;
</script>

<section
  style="width: {leftPaddle.width}px; height: {leftPaddle.length}px; top: {leftPaddle.y}px; left: {leftPaddle.x}px;"
  id="leftPaddle"
/>
<section
  style="width: {rightPaddle.width}px; height: {rightPaddle.length}px; top: {rightPaddle.y}px; left: {rightPaddle.x}px;"
  id="rightPaddle"
/>

<style>
  #leftPaddle,
  #rightPaddle {
    position: absolute;
    border: solid black 1px;
    background-color: goldenrod;
  }
</style>
