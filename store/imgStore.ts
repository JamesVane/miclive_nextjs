import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

type ImageSrcType = {
  event: { [key: string]: string };
  performer: { [key: string]: string };
  dj: { [key: string]: string };
  promoter: { [key: string]: string };
  qr: { [key: string]: string };
  event3X1: { [key: string]: string };
  event4X1: { [key: string]: string };
  promoter3X1: { [key: string]: string };
  promoter4X1: { [key: string]: string };
};

type SetSrcPayload = {
  type: keyof ImageSrcType; 
  id: string;
  url: string;
};

const imageSrcSlice = createSlice({
  name: "imageSrc",
  initialState: {
    event: {},
    performer: {},
    dj: {},
    promoter: {},
    qr: {},
    event3X1: {},
    event4X1: {},
    promoter3X1: {},
    promoter4X1: {},
  } as ImageSrcType,
  reducers: {
    setSrc: (state, action: PayloadAction<SetSrcPayload>) => {
      const { type, id, url } = action.payload;
      state[type][id] = url;
    },
  },
});

export const { setSrc } = imageSrcSlice.actions;

export default imageSrcSlice.reducer;
