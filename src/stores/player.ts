import { defineStore } from "pinia";

export const playerStore = defineStore('player', {
  state: () => ({
    p1: {
      name: '',
      score: 0,
    },
    p2: {
      name: '',
      score: 0,
    }
  }),
  actions: {
    incrementScore(player: 1 | 2) {
      this[`p${player}`].score++;
    },
    setName(player: 1 | 2, name: string) {
      this[`p${player}`].name = name;
    }
  }
});
