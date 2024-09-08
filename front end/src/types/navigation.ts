import type { StackScreenProps } from '@react-navigation/stack';

export type RootStackParamList = {
	Startup: undefined;
	Example: undefined;
	HomePage: undefined;
	StartSummarizationPage: undefined;
	ViewSummarizedTextPage: { summarizedText: string };  // Add the parameter type for summarizedText
	ChatBot: undefined;
};

export type RootScreenProps<
	S extends keyof RootStackParamList = keyof RootStackParamList,
> = StackScreenProps<RootStackParamList, S>;
