import { Suspense, useEffect, useState } from 'react';
import ChatBot, { Button, useToasts, useFlow, usePaths, useMessages } from 'sandeep-react-chatbotify';
import roboticon from '~/assets/favicons/roboticon.svg';
import rotateClockWise from '~/assets/favicons/rotate-clockwise.svg';
import './style.css';

// const ChatBot = lazy(() => import('react-chatbotify'));

export interface FeedbackDetails {
  mobileNumber?: string;
  email?: string;
  feedbackMessage?: string;
}

export default function BotifyBot() {
  const [isLoaded, setIsLoaded] = useState(false);
  const { showToast } = useToasts();
  const { restartFlow } = useFlow();
  const { goToPath } = usePaths();
  const { injectMessage } = useMessages();
  const [feedbackDetails, setFeedbackDetails] = useState<FeedbackDetails>({});
  useEffect(() => {
    setIsLoaded(true);
    showToast('Hello, Welcome To Aaptha Elder Care Services!', 3000);
  }, []);
  const id = 'aaptha-chat-bot';
  const flow = {
    start: {
      message: () => {
        const visitedBefore = localStorage.getItem('visited-user-name');
        if (visitedBefore) {
          return `Welcome back ${visitedBefore}`;
        }
        return "Welcome there 👋! It's nice to meet you!";
      },
      path: (params) => {
        const username = localStorage.getItem('visited-user-name');
        if (!username) {
          return 'askName';
        } else {
          return 'userOptions';
        }
      },
      chatDisabled: true,
      transition: { duration: 2000 },
    },
    askName: {
      message: () => {
        return 'What is your name?';
      },
      function: (params) => {
        localStorage.setItem('visited-user-name', params.userInput);
      },
      path: 'userOptions',
    },
    userOptions: {
      message: () => {
        const username = localStorage.getItem('visited-user-name');
        return `Hey ${username}, Choose an Option available below.`;
      },
      options: ['About Us', 'Services Provided', 'Contact Us', 'Careers', 'FAQs', 'Feedback'],
      chatDisabled: true,
      path: (params) => {
        switch (params.userInput) {
          case 'About Us':
            return 'aboutUs';
          case 'Services Provided':
            return 'servicesProvided';
          case 'Contact Us':
            return 'contactUs';
          case 'Careers':
            return 'careers';
          case 'FAQs':
            return 'faqs';
          case 'Feedback':
            return 'feedback';
          default:
            break;
        }
        return 'end';
      },
    },
    aboutUs: {
      transition: () => {
        return 1000;
      },
      function: async (params) => {
        injectMessage("I'll Navigate yout to About Us Page");
        setTimeout(() => {
          window.location.href = '/#aboutUs';
          goToPath('userOptions');
        }, 3000);
      },
      chatDisabled: true,
    },

    servicesProvided: {
      transition: () => {
        return 1000;
      },
      function: async (params) => {
        injectMessage("I'll Navigate yout to Services Page");
        setTimeout(() => {
          window.location.href = '/services';
          goToPath('userOptions');
        }, 3000);
      },
      chatDisabled: true,
    },

    contactUs: {
      transition: () => {
        return 1000;
      },
      function: async (params) => {
        injectMessage("I'll Navigate you to Contact Page");
        setTimeout(() => {
          window.location.href = '/contact';
          goToPath('userOptions');
        }, 3000);
      },
      chatDisabled: true,
    },
    careers: {
      transition: () => {
        return 1000;
      },
      function: async (params) => {
        injectMessage("I'll Navigate you to Careers Page");
        setTimeout(() => {
          window.location.href = '/careers';
          goToPath('userOptions');
        }, 3000);
      },
      chatDisabled: true,
    },
    faqs: {
      transition: () => {
        return 1000;
      },
      function: async (params) => {
        injectMessage("I'll Navigate you to Careers Page");
        setTimeout(() => {
          window.location.href = '/faq';
          goToPath('userOptions');
        }, 3000);
      },
      chatDisabled: true,
    },
    feedback: {
      message: 'Enter your mobile Number',
      path: 'enterEmail',

      function: (params) => {
        setFeedbackDetails({
          ...feedbackDetails,
          mobileNumber: params.userInput,
        });
      },
    },

    enterEmail: {
      message: 'Enter your Email Id',
      path: 'feedbackMessage',

      function: (params) => {
        setFeedbackDetails({
          ...feedbackDetails,
          email: params.userInput,
        });
      },
    },

    feedbackMessage: {
      message: 'Enter your Feedback',
      path: 'confrimFeedbackDetails',

      function: (params) => {
        setFeedbackDetails({
          ...feedbackDetails,
          feedbackMessage: params.userInput,
        });
      },
    },

    confrimFeedbackDetails: {
      message: () => {
        return `You have entered the following details: \n Mobile Number: ${feedbackDetails.mobileNumber} \n Email: ${feedbackDetails.email} \n Feedback: ${feedbackDetails.feedbackMessage}`;
      },
      path: (params) => {
        injectMessage('Your Feedback has been submitted successfully.');
        // Just pause for 2 seconds before showing the userOptions again.
        setTimeout(() => {}, 2000);
        return 'userOptions';
      },
      transition: () => {
        return 1000;
      },
    },

    end: {
      message: 'See you, goodbye!',
      path: 'step2',
      transition: { duration: 1000 },
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
              footer: {
                text: 'Aaptha Elder Care. Here to Help!',
                buttons: [
                  Button.EMOJI_PICKER_BUTTON,
                  Button.FILE_ATTACHMENT_BUTTON,
                  <img
                    src={rotateClockWise.src}
                    alt="Restart"
                    onClick={() => {
                      restartFlow();
                    }}
                  />,
                ],
              },
              header: { title: 'Aaptha Elder Care' },
              botBubble: { showAvatar: true },
              chatWindow: { showMessagePrompt: false },
              tooltip: { mode: 'NEVER' },
              notification: { showCount: false },
              chatButton: { icon: roboticon.src },
              voice: { disabled: true },
              chatHistory: { storageKey: 'aaptha-chat-history' },
            }}
          />
        </Suspense>
      )}
    </>
  );
}
