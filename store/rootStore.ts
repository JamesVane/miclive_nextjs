/** @format */

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import imageSrcReducer from "./imgStore";
import performerAudioKeysReducer from "./performerAudioKeysStore";
import audioUrlReducer from "./audioUrlStore";
import usersStateReducer from "./usersStateStore";
import djManageEventSliceReducer from "./djManageEventSlice";
import promoterCreateEventSliceReducer from "./promoterCreateEventSlice";
import promoterEditEventSliceReducer from "./promoterEditEventSlice";
import performerSelectFromExistingModalReducer from "./performerSelectFromExistingModalSlice";
import performerAddNewAudioToEventReducer from "./performerAddNewAudioToEventSlice";
import mobileTabReducer from "./mobileTabSlice";
import EditProfileInfoMobileSlice from "./editProfileInfoMobileSlice";
import ConversationMessageSlice from "./conversationMessagesSlice";
import ConversationListSlice from "./conversationListSlice";
import HoldNewConversationSlice from "./holdNewConversationSlice";
import createAccountSlice from "./createAccountSlice";
import SignInStateSlice from "./signInStateSlice";
import CurrentSubStore from "./currentSubStore";
import forgotPasswordSlice from "./forgotPasswordSlice";
import desktopPerformerTicketSelectedSlice from "./desktopPerformerTicketSelectedSlice";
import openConversationDesktopSlice from "./openConversationDesktopSlice";
import viewUserInfoModalSlice from "./viewUserInfoModalSlice";
import desktopSelectedBaseEventSlice from "./desktopSelectedBaseEventSlice";
import promoterCreateDate from "./CreateEventDateSlice";
import djInviteState from "./DjInviteState"
import performerCurrentEventSlice from "./performerCurrentEventSlice";
import walkinKeyCheckInStateSlice from "./walkinKeyCheckInStateSlice"
import PromoterManageEventState from "./PromoterManageEventState";
import performerFollowingArrayV2Slice from "./performerFollowingArrayV2Slice";
import performerTicketsV2pt0 from "./performerTicketsV2pt0"
import promoterEventListV2pt0Slice from "./promoterEventListV2pt0Slice"
import PromoterEventPageV2pt0Slice from "./PromoterEventPageV2pt0Slice"
import promoterDateInfoV2pt0Slice from "./promoterDateInfoV2pt0Slice"
import DjEventDateListV2pt0Slice from "./DjEventDateListV2pt0Slice"
import DjPrimaryEventsListV2pt0Slice from "./DjPrimaryEventsListV2pt0Slice"
import djEventDateModalDataV2pt0 from "./djEventDateModalDataV2pt0"
import shouldReFetchFromSocketSlice from "./shouldReFetchFromSocketSlice"



const rootReducer = combineReducers({
	imageSrc: imageSrcReducer,
	performerAudioKeys: performerAudioKeysReducer,
	audioUrl: audioUrlReducer,
	usersState: usersStateReducer,	
	djManageEvent: djManageEventSliceReducer,	
	promoterCreateEvent: promoterCreateEventSliceReducer,
	promoterEditEvent: promoterEditEventSliceReducer,
	performerSelectFromExistingModal:
	performerSelectFromExistingModalReducer,
	performerAddNewAudioToEvent: performerAddNewAudioToEventReducer,
	mobileTab: mobileTabReducer,		
	editProfileInfoMobile: EditProfileInfoMobileSlice,
	conversationMessages: ConversationMessageSlice,
	conversationList: ConversationListSlice,
	holdNewConversation: HoldNewConversationSlice,
	createAccount: createAccountSlice,
	signInState: SignInStateSlice,
	CurrentSubStore: CurrentSubStore,
	forgotPasswordSlice: forgotPasswordSlice,
	desktopPerformerTicketSelectedSlice: desktopPerformerTicketSelectedSlice,
	openConversationDesktopSlice: openConversationDesktopSlice,
	viewUserInfoModalSlice: viewUserInfoModalSlice,
	desktopSelectedBaseEventSlice: desktopSelectedBaseEventSlice,		
	promoterCreateDate: promoterCreateDate,
	djInviteState: djInviteState,
	performerCurrentEventSlice: performerCurrentEventSlice,
	walkinKeyCheckInStateSlice: walkinKeyCheckInStateSlice,
	PromoterManageEventState: PromoterManageEventState,
	performerFollowingArrayV2Slice: performerFollowingArrayV2Slice,
	performerTicketsV2pt0: performerTicketsV2pt0,
	promoterEventListV2pt0Slice: promoterEventListV2pt0Slice,
	PromoterEventPageV2pt0Slice: PromoterEventPageV2pt0Slice,
	promoterDateInfoV2pt0Slice:promoterDateInfoV2pt0Slice,
	DjEventDateListV2pt0Slice: DjEventDateListV2pt0Slice,
	DjPrimaryEventsListV2pt0Slice: DjPrimaryEventsListV2pt0Slice,
	djEventDateModalDataV2pt0: djEventDateModalDataV2pt0,	
	shouldReFetchFromSocketSlice: shouldReFetchFromSocketSlice,
});

const store = configureStore({
	reducer: rootReducer,
  });

  export { store };
export type RootState = ReturnType<typeof rootReducer>;
  