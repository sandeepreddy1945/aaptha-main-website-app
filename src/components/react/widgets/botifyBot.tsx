import { lazy, Suspense, useEffect, useState } from 'react';
import roboticon from '~/assets/favicons/roboticon.svg';

const ChatBot = lazy(() => import('react-chatbotify'));

export default function BotifyBot() {
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    setIsLoaded(true);
  }, []);
  const id = 'my-chatbot-id';
  const flow = {
    start: {
      message: 'Hello there!',
      path: 'end',
    },
    end: {
      message: 'See you, goodbye!',
    },
  };
  return (
    <>
      {isLoaded && (
        <Suspense fallback={<div>Loading...</div>}>
          <ChatBot
            id={id}
            flow={flow}
            settings={{
              device: { mobileEnabled: true, applyMobileOptimizations: true },
              footer: { text: 'Aaptha Elder Care. Here to Help!' },
              header: { title: 'Aaptha Elder Care' },
              botBubble: { showAvatar: true },
              chatWindow: { showMessagePrompt: false },
              tooltip: { mode: 'NEVER' },
              notification: { showCount: false },
              chatButton: { icon: roboticon.src },
              voice: { disabled: true },
            }}
          />
        </Suspense>
      )}
    </>
  );
}
