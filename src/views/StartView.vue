<template>
  <form
    class="flex flex-col justify-around text-center m-10 h-[30rem] w-[45rem] justify-self-center align-middle rounded-3xl bg-slate-700"
  >
    <p class="text-5xl font-bold m-7">Welcome to TIC-TAC-TOE</p>
    <input
      type="text"
      v-model="nameP1"
      placeholder="Player 1 Name"
      class="m-5 h-24 text-5xl text-center uppercase rounded-full bg-slate-800"
    />
    <input
      type="text"
      v-model="nameP2"
      placeholder="Player 2 Name"
      class="m-5 h-24 w-auto text-5xl text-center uppercase rounded-full bg-slate-800"
    />
    <button
      type="submit"
      @click.prevent="startGame"
      class="m-5 h-24 w-auto rounded-full text-5xl bg-teal-800 active:bg-teal-900 hover:drop-shadow-lg hover:ring hover:ring-slate-400"
    >
      Start Game
    </button>
  </form>
</template>

<script lang="ts">
import { mapStores } from "pinia";
import { playerStore } from "@/stores/player";

export default {
  data() {
    return {
      nameP1: "",
      nameP2: "",
    };
  },
  computed: {
    ...mapStores(playerStore),
  },
  methods: {
    startGame() {
      if (this.nameP1 && this.nameP2) {
        this.playerStore.setName(1, this.nameP1.toUpperCase());
        this.playerStore.setName(2, this.nameP2.toUpperCase());
        this.$router.push("/game");
      }
    },
  },
};
</script>
