import axios from "axios";
import Yaml from "yaml";

export const parseYaml = (yamlString) => {
  console.log("Yaml String is: ", Yaml.stringify(yamlString));
};

export const createUserMessage = (message) => {
  console.log("Message is: ", message);
  parseYaml({ number: 3, plain: "string", block: "two\nlines\n" });
  return {
    text: message,
    sender: "USER",
    messageType: "text",
    ts: new Date(),
  };
};

export const getBotResponse = async ({
  rasaServerUrl,
  sender,
  message,
  metadata = {},
}) => {
  try {
    // const response = await axios({
    //   method: "post",
    //   url: rasaServerUrl,
    //   data: {
    //     sender,
    //     message,
    //     metadata,
    //   },
    // });
    const response = await new Promise((r) => setTimeout(r, 1000)).then(() => {
      return {
        data: [
          {
            text: "Hello! How can I help you?",
            sender: "BOT",
            messageType: "text",
            ts: new Date(),
          },
        ],
      };
    });
    return response.data;
  } catch (error) {
    console.log("error occurred fetching bot response", error);
    return [];
  }
};
