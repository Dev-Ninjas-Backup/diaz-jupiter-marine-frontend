export const sendMessageToChatBot = async ({
  message,
  userId,
}: {
  message: string;
  userId: string | null;
}) => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_CHATBOT_API_URL;

    const res = await fetch(`${baseUrl}/chat`, {
      method: 'POST',
      body: JSON.stringify({
        messages: message,
        user_id: userId,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      next: {
        tags: ['CHATBOT'],
      },
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error: unknown) {
    console.error('Chatbot error:', error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to send message to chatbot');
  }
};

export const chatHistory = async (userId: string) => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_CHATBOT_API_URL;

    const res = await fetch(
      `${baseUrl}/chat_history?user_id=${userId}`,
      {
        method: 'GET',
        next: {
          tags: ['CHATBOT'],
        },
      },
    );

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error: unknown) {
    console.error('Chat History Error:', error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to fetch chat history');
  }
};
