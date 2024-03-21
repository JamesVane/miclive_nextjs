/** @format */

"use client";
/** @format */

import { useEffect } from "react";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { isMobile } from "react-device-detect";
import { usePathname, useRouter } from "next/navigation";
import { Provider } from "react-redux";
import awsExports from "@/aws-exports";
import { Amplify } from "aws-amplify";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import imageSrcReducer from "@/store/imgStore";
import performerAudioKeysReducer from "@/store/performerAudioKeysStore";
import audioUrlReducer from "@/store/audioUrlStore";
import usersStateReducer from "@/store/usersStateStore";
import djManageEventSliceReducer from "@/store/djManageEventSlice";
import promoterCreateEventSliceReducer from "@/store/promoterCreateEventSlice";
import promoterEditEventSliceReducer from "@/store/promoterEditEventSlice";
import performerSelectFromExistingModalReducer from "@/store/performerSelectFromExistingModalSlice";
import performerAddNewAudioToEventReducer from "@/store/performerAddNewAudioToEventSlice";
import mobileTabReducer from "@/store/mobileTabSlice";
import ConversationMessageSlice from "@/store/conversationMessagesSlice";
import ConversationListSlice from "@/store/conversationListSlice";
import HoldNewConversationSlice from "@/store/holdNewConversationSlice";
import createAccountSlice from "@/store/createAccountSlice";
import SignInStateSlice from "@/store/signInStateSlice";
import CurrentSubStore from "@/store/currentSubStore";
import forgotPasswordSlice from "@/store/forgotPasswordSlice";
import desktopPerformerTicketSelectedSlice from "@/store/desktopPerformerTicketSelectedSlice";
import openConversationDesktopSlice from "@/store/openConversationDesktopSlice";
import viewUserInfoModalSlice from "@/store/viewUserInfoModalSlice";
import desktopSelectedBaseEventSlice from "@/store/desktopSelectedBaseEventSlice";
import promoterCreateDate from "@/store/CreateEventDateSlice";
import djInviteState from "@/store/DjInviteState";
import performerCurrentEventSlice from "@/store/performerCurrentEventSlice";
import walkinKeyCheckInStateSlice from "@/store/walkinKeyCheckInStateSlice";
import PromoterManageEventState from "@/store/PromoterManageEventState";
import performerFollowingArrayV2Slice from "@/store/performerFollowingArrayV2Slice";
import performerTicketsV2pt0 from "@/store/performerTicketsV2pt0";
import promoterEventListV2pt0Slice from "@/store/promoterEventListV2pt0Slice";
import PromoterEventPageV2pt0Slice from "@/store/PromoterEventPageV2pt0Slice";
import promoterDateInfoV2pt0Slice from "@/store/promoterDateInfoV2pt0Slice";
import DjEventDateListV2pt0Slice from "@/store/DjEventDateListV2pt0Slice";
import djEventDateModalDataV2pt0 from "@/store/djEventDateModalDataV2pt0";
import shouldReFetchFromSocketSlice from "@/store/shouldReFetchFromSocketSlice";
import currentEventSpecificEventIdSlice from "@/store/currentEventSpecificEventIdSlice";
import {
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from "redux-persist";
import CreateWebStorage from "redux-persist/es/storage/createWebStorage";

Amplify.configure({ ...awsExports, ssr: true });

const createNoopStorage = () => {
	return {
		getItem(_key: string) {
			return Promise.resolve(null);
		},
		setItem(_key: string, item: string) {
			return Promise.resolve(item);
		},
		removeItem(_key: string) {
			return Promise.resolve();
		},
	};
};

const storage =
	typeof window === "undefined"
		? createNoopStorage()
		: CreateWebStorage("local");

const persistConfig = {
	key: "rootReducer",
	storage,
	whitelist: ["createAccountSlice"],
};

const rootReducer = combineReducers({
	imageSrc: imageSrcReducer,
	performerAudioKeys: performerAudioKeysReducer,
	audioUrl: audioUrlReducer,
	usersState: usersStateReducer,
	djManageEvent: djManageEventSliceReducer,
	promoterCreateEvent: promoterCreateEventSliceReducer,
	promoterEditEvent: promoterEditEventSliceReducer,
	performerSelectFromExistingModal: performerSelectFromExistingModalReducer,
	performerAddNewAudioToEvent: performerAddNewAudioToEventReducer,
	mobileTab: mobileTabReducer,
	conversationMessages: ConversationMessageSlice,
	conversationList: ConversationListSlice,
	holdNewConversation: HoldNewConversationSlice,
	createAccountSlice: createAccountSlice,
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
	promoterDateInfoV2pt0Slice: promoterDateInfoV2pt0Slice,
	DjEventDateListV2pt0Slice: DjEventDateListV2pt0Slice,
	djEventDateModalDataV2pt0: djEventDateModalDataV2pt0,
	shouldReFetchFromSocketSlice: shouldReFetchFromSocketSlice,
	currentEventSpecificEventIdSlice: currentEventSpecificEventIdSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
});

export type RootState = ReturnType<typeof store.getState>;

function LocalizationProviderHelper({
	children,
}: {
	children: React.ReactNode;
}) {
	const pathname = usePathname();
	const router = useRouter();

	const persistor = persistStore(store);

	useEffect(() => {
		if (isMobile && !pathname.startsWith("/m")) {
			console.log("redirecting to mobile");
			router.replace("/m" + pathname);
		}
		if (!isMobile && pathname.startsWith("/m")) {
			console.log("redirecting to desktop");
			if (pathname.length === 2) {
				router.replace("/");
			} else {
				router.replace(pathname.slice(2));
			}
		}
	}, [isMobile, pathname]);

	return (
		<Provider store={store}>
			<LocalizationProvider dateAdapter={AdapterLuxon}>
				{children}
			</LocalizationProvider>
		</Provider>
	);
}

export default LocalizationProviderHelper;
