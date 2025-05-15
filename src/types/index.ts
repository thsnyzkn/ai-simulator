export type RootStackParamList = {
  Input: undefined;
  Output: { 
    imageUrl: string; 
    prompt: string;
    selectedStyle: string;
  };
};

export type LogoStatus = 'idle' | 'processing' | 'done' | 'error'