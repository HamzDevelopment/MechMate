// Defines the structure for the response
export interface OpenAIChatResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}