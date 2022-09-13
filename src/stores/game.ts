import { defineStore } from "pinia";

export const gameStore = defineStore("game", {
  state: () => ({
    board: new Array(9).fill(0),
    currentPlayer: 1 as 1 | 2,
  }),
  getters: {
    boardFull: (state) => state.board.every((v) => v !== 0),
    gameWon: (state) => {
      // Manually inputting win condition index's to KISS
      return [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8], // These are horizontals
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8], // These are verticals
        [0, 4, 8],
        [2, 4, 6], // These are diagonals
      ].some(
        (winCondition) =>
          state.board[winCondition[0]] !== 0 &&
          winCondition.every(
            (v) => state.board[v] === state.board[winCondition[0]]
          )
      );
    },
    gameOver(): boolean {
      return this.boardFull || this.gameWon;
    },
  },
  actions: {
    makeMove(index: number) {
      if (this.board[index] === 0 && !this.gameOver) {
        this.board[index] = this.currentPlayer;
        if (!this.gameOver) {
          this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
        }
      }
    },
  },
});
