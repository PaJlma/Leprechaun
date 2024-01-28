import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface InitialState {
  isPlaying: boolean;
  isFullscreen: boolean;
  played: number;
}

const initialState: InitialState = {
  isPlaying: true,
  isFullscreen: false,
  played: 0,
};

export const videoInfoSlice = createSlice({
  name: "videoInfo",
  initialState,
  reducers: {
    setIsPlaying(state, action: PayloadAction<boolean>) {
      state.isPlaying = action.payload;
    },
      
    toggleIsPlaying(state) {
      state.isPlaying = !state.isPlaying;
    },
    
    setIsFullscreen(state, action: PayloadAction<boolean>) {
      state.isFullscreen = action.payload;
    },
    
    toggleIsFullscreen(state) {
      state.isFullscreen = !state.isFullscreen;
    },
    
    setPlayed(state, action: PayloadAction<number>) {
      state.played = action.payload;
    },

    reset() {
      return initialState;
    }
  },
});
