<template>
  <div class="text-5xl">
    <h1 class="font-bold m-2 text-6xl">TIC-TAC-TOE <button :class="{ 'animate-pulse': gameStore.gameOver }" @click="reset">🔄</button></h1>
    <div class="grid grid-cols-3 gap-4 place-items-center w-fit bg-teal-800 rounded-lg p-4 m-4">
      <button class="bg-slate-900 h-36 w-36 rounded-lg" v-for="(box, index) in gameStore.board" @click="makeMove(index)">{{ getBoxIcon(box) }}</button>
    </div>
    <h2 v-if="!gameStore.gameOver">It is {{ getCurrentPlayer() }}'s turn! {{ getBoxIcon(gameStore.currentPlayer) }}</h2>
    <h2 v-else-if="gameStore.gameWon">{{ getCurrentPlayer() }} WINS!✅</h2>
    <h2 v-else>{{ playerStore.p1.name }} and {{ playerStore.p2.name }} DRAW!🔷</h2>
  </div>
  <div class="bg-slate-700 rounded-xl text-5xl text-left p-4 grid grid-cols-2">
    <h1 class="font-bold text-6xl grid col-span-2 mb-4">Score Sheet</h1>
    <h2>{{ playerStore.p1.name }}</h2><h2 class="text-right">{{ playerStore.p1.score }}</h2>
    <h2>{{ playerStore.p2.name }}</h2><h2 class="text-right">{{ playerStore.p2.score }}</h2>
  </div>
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