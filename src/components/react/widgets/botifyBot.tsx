import { Suspense, useEffect, useState } from 'react';
import ChatBot, { useToasts } from 'sandeep-react-chatbotify';
import roboticon from '~/assets/favicons/roboticon.svg';
import './style.css';

// const ChatBot = lazy(() => import('react-chatbotify'));

export default function BotifyBot() {
  const [isLoaded, setIsLoaded] = useState(false);
  const { showToast } = useToasts();
  useEffect(() => {
    setIsLoaded(true);
    showToast("Hello, I'm a toast message!", 3000);
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
