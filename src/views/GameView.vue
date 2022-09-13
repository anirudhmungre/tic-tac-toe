<template>
  <h1 v-if="!gameStore.gameOver">It is {{ getCurrentPlayer() }}'s turn! {{ getBoxIcon(gameStore.currentPlayer) }}</h1>
  <h1 v-else-if="gameStore.gameWon">{{ getCurrentPlayer() }} WINS!✅</h1>
  <h1 v-else>{{ playerStore.p1.name }} and {{ playerStore.p2.name }} DRAW!🔷</h1>
  <h2>{{ playerStore.p1.name }}: {{ playerStore.p1.score }}</h2>
  <h2>{{ playerStore.p2.name }}: {{ playerStore.p2.score }}</h2>
  <div class="board">
    <button class="box" v-for="(box, index) in gameStore.board" @click="makeMove(index)">{{ getBoxIcon(box) }}</button>
  </div>
  <button class="reset-btn" v-if="gameStore.gameOver" @click="reset">RESET</button>
</template>

<script lang="ts">
  import { playerStore } from '@/stores/player'; 
  import { gameStore } from '@/stores/game'; 
  import { mapStores } from 'pinia';

  export default {
    data() {
      return {
        canIncrementScore: true,
      }
    },
    computed: {
      ...mapStores(playerStore, gameStore),
    },
    mounted() {
      if (!this.playerStore.p1.name || !this.playerStore.p2.name) {
        this.$router.push('/');
      }
    },
    methods: {
      getBoxIcon(boxValue: 0 | 1 | 2) {
        switch (boxValue) {
          case 1:
            return '❌';
          case 2:
            return '⭕';
          default:
            return '';
        }
      },
      getCurrentPlayer(): string {
        return this.playerStore[`p${this.gameStore.currentPlayer}`].name;
      },
      makeMove(boxIndex: number) {
        this.gameStore.makeMove(boxIndex);
        if (this.gameStore.gameOver) {
          if (this.gameStore.gameWon && this.canIncrementScore) {
            this.canIncrementScore = false;
            this.playerStore.incrementScore(this.gameStore.currentPlayer);
          }
        }
      },
      reset() {
        this.canIncrementScore = true;
        this.gameStore.$reset();
      }
    }
  }
</script>

<style>
  .board {
    width: 632px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px 16px;
    align-items: center;
    justify-items: center;
    background-color: #009B77;
  }

  .box {
    height: 200px;
    width: 200px;
    font-size: xx-large;
    background-color: aqua;
  }

  .box:hover {
    background-color: teal;
  }

</style>