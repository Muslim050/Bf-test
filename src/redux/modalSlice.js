import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showAdvertiser: false,
  showAdvertiserUser: false,
  showAdvertiserAgency: false,
  showAdvertiserAgencyUser: false,
  showPablisher: false,
  showPablisherUser: false,
  showChannel: false,
  showChannelUser: false,
  showInventory: false,
  showOrder: false,
  showSelectedInventory: false,
  showVerify: false,
  showVideo: false,
  showVideoLinked: false,
  showChangePassword: false,
  showPayment: false,
  paymentData: "",
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    showModalAdvertiser: (state) => {
      state.showAdvertiser = true;
    },
    hideModalAdvertiser: (state) => {
      state.showAdvertiser = false;
    },
    showModalAdvertiserUser: (state) => {
      state.showAdvertiserUser = true;
    },
    hideModalAdvertiserUser: (state) => {
      state.showAdvertiserUser = false;
    },
    showModalAdvertiserAgency: (state) => {
      state.showAdvertiserAgency = true;
    },
    hideModalAdvertiserAgency: (state) => {
      state.showAdvertiserAgency = false;
    },
    showModalAdvertiserAgencyUser: (state) => {
      state.showAdvertiserAgencyUser = true;
    },
    hideModalAdvertiserAgencyUser: (state) => {
      state.showAdvertiserAgencyUser = false;
    },
    showModalPablisher: (state) => {
      state.showPablisher = true;
    },
    hideModalPablisher: (state) => {
      state.showPablisher = false;
    },
    showModalPablisherUser: (state) => {
      state.showPablisherUser = true;
    },
    hideModalPablisherUser: (state) => {
      state.showPablisherUser = false;
    },
    showModalChannel: (state) => {
      state.showChannel = true;
    },
    hideModalChannel: (state) => {
      state.showChannel = false;
    },
    showModalChannelUser: (state) => {
      state.showChannelUser = true;
    },
    hideModalChannelUser: (state) => {
      state.showChannelUser = false;
    },
    showModalInventory: (state) => {
      state.showInventory = true;
    },
    hideModalInventory: (state) => {
      state.showInventory = false;
    },

    showModalOrder: (state) => {
      state.showOrder = true;
    },
    hideModalOrder: (state) => {
      state.showOrder = false;
    },
    showModalSInventory: (state) => {
      state.showSelectedInventory = true;
    },
    hideModalSInventory: (state) => {
      state.showSelectedInventory = false;
    },

    showModalVerify: (state) => {
      state.showVerify = true;
    },
    hideModalVerify: (state) => {
      state.showVerify = false;
    },

    showModalVideo: (state) => {
      state.showVideo = true;
    },
    hideModalVideo: (state) => {
      state.showVideo = false;
    },
    showModalVideoLinked: (state) => {
      state.showVideoLinked = true;
    },
    hideModalVideoLinked: (state) => {
      state.showVideoLinked = false;
    },
    showModalChangePassword: (state) => {
      state.showChangePassword = true;
    },
    hideModalChangePassword: (state) => {
      state.showChangePassword = false;
    },
    showModalPayment: (state, action) => {
      state.showPayment = true;
      state.paymentData = action.payload;
    },
    hideModalPayment: (state) => {
      state.showPayment = false;
    },
  },
});

export const {
  showModalAdvertiser,
  hideModalAdvertiser,
  showModalAdvertiserUser,
  hideModalAdvertiserUser,
  showModalAdvertiserAgency,
  hideModalAdvertiserAgency,
  showModalAdvertiserAgencyUser,
  hideModalAdvertiserAgencyUser,
  showModalPablisher,
  hideModalPablisher,
  showModalPablisherUser,
  hideModalPablisherUser,
  showModalChannel,
  hideModalChannel,
  showModalChannelUser,
  hideModalChannelUser,
  showModalInventory,
  hideModalInventory,
  showModalOrder,
  hideModalOrder,
  showModalSInventory,
  hideModalSInventory,
  showModalVerify,
  hideModalVerify,
  showModalVideo,
  hideModalVideo,
  showModalVideoLinked,
  hideModalVideoLinked,
  showModalChangePassword,
  hideModalChangePassword,
  showModalPayment,
  hideModalPayment,
} = modalSlice.actions;
export default modalSlice.reducer;
