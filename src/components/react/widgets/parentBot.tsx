import { ChatBotProvider } from 'sandeep-react-chatbotify';
import BotifyBot from './botifyBot';
export default function ParentBot() {
  return (
    <ChatBotProvider>
      <BotifyBot />
    </ChatBotProvider>
  );
}
