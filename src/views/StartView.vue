<template>
  <form>
    <input v-model="nameP1" type="text" />
    <input v-model="nameP2" type="text" />
    <button type="submit" @click.prevent="startGame">Start Game</button>
  </form>
</template>

<script lang="ts">
  import { mapStores } from 'pinia';
  import { playerStore } from '@/stores/player';

  export default {
    data() {
      return {
        nameP1: '',
        nameP2: '',
      };
    },
    computed: {
      ...mapStores(playerStore),
    },
    methods: {
      startGame() {
        if (this.nameP1 && this.nameP2) {
          this.playerStore.setName(1, this.nameP1);
          this.playerStore.setName(2, this.nameP2);
          this.$router.push('/game');
        }
      },
    }
  };
</script>
