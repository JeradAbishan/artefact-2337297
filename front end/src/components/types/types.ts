// src/types.ts
export type RootStackParamList = {
    Home: undefined;
    StartSummarization: undefined;
    ViewSummarizedText: { summarizedText: string };  // Add the parameter type for summarizedText
    Chatbot: undefined;
  };
  