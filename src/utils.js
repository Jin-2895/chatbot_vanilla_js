export const uniqueIdGenerator = () => {
    let num = 1;
    return () => {
        return num++;
    };
}
const uniqueId = uniqueIdGenerator();

export const botMessage = (message) => {
    if (message.type === "bot") {
        return true;
    }
    return false;
}

export const createChatMessage = (message, type) => {
    return {
        message: message,
        type: type,
        id: uniqueId()
    };
}

export const createChatBotMessage = (message, options) => {
    return {
        ...createChatMessage(message, "bot"),
        ...options,
        loading: true,
    };
}

export const createClientMessage = (message) => {
    return createChatMessage(message, "user");
}

export const callIfExits = (func, ...args) => {
    if (func) {
        return func(...args);
    }
}

export const getWidgets = (config) => {
    if (config.widgets) {
        return config.widgets
    }
    return {};
}

export const getObject = (object) => {
    if (typeof object === "object") {
        return object;
    }
    return {};
}

export const scrollIntoView = () => {
    const chatContainer = document.querySelector(
        ".infinitybot-kit-chat-message-container"
    );

    chatContainer.scrollTop = chatContainer.scrollHeight;
};

export const validateProps = (config, MessageParser) => {
    const errors = [];
    if (!config.initialMessages) {
        errors.push("Config must contain property 'initialMessages', and it expects it to be an array of chatbotmessages.");
    }

    const messageParser = new MessageParser();
    if (!messageParser["parse"]) {
        errors.push("Messageparser must implement the method 'parse`, please add this method to your object. the signature is parse");
    }
    return errors;
}
