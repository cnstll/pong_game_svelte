<script lang="ts">
  import Ball from "./Ball.svelte";
  import Paddle from "./Paddle.svelte";
  import { GameController } from "./game";
  const game = new GameController();
  let frame = game.newGame();

  setInterval(() => {
    frame = game.nextFrame();
  }, 8);

  function handleKeys(event) {
    game.handleKeys(event);
  }
  function startGame() {
    frame = game.startGame();
  }
</script>

<main style="width: {frame.width}px; height: {frame.height}px;" class="game">
  <Ball ball={frame.ball} />
  <Paddle leftPaddle={frame.leftPaddle} rightPaddle={frame.rightPaddle} />
  {#if !frame.gameStarted}
    <button on:click={startGame}> Start Game</button>
  {/if}
  {#if frame.pointScored}
    <section id="score">
      <h2>Score !</h2>
      <h2>{frame.leftPaddle.score} | {frame.rightPaddle.score}</h2>
    </section>
    <button on:click={startGame}> Another One ! </button>
  {/if}
</main>
<pre>
    {JSON.stringify(frame, null, 2)}
</pre>
<svelte:window on:keydown|preventDefault={handleKeys} />

<style>
  main {
    position: relative;
    border: solid black 1px;
    background-color: lightcoral;
    margin: auto;
    padding: 1px;
  }

  pre {
    position: relative;
  }

  h2 {
    position: relative;
    text-align: center;
    background-color: blanchedalmond;
  }
</style>
