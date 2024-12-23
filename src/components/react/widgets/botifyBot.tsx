import { lazy, Suspense, useEffect, useState } from 'react';

const ChatBot = lazy(() => import('react-chatbotify'));

export default function BotifyBot() {
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <>
      {isLoaded && (
        <Suspense fallback={<div>Loading...</div>}>
          <ChatBot />
        </Suspense>
      )}
    </>
  );
}
