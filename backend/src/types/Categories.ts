// Adding AI tools categories
export const allowedCategories = ["Chatbot", "Image", "Video", "Programming", "Other"] as const;
export type Category = typeof allowedCategories[number];