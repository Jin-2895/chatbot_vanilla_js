import { createBotChatMessage } from "./chat.js";

export const createErrorMessage = (message) => {
    const container = document.createElement("div");
    container.classList.add("infinitybot-kit-error");

    const header = document.createElement("h1");
    header.textContent = "Oops. Something is missing.";

    const innerContainer = document.createElement("div");
    innerContainer.classList.add("infinitybot-kit-error-container");

    const messageObject = {
        message: message,
        loading: false,
        id: 1,
    };

    const botMessage = createBotChatMessage(messageObject);

    innerContainer.appendChild(botMessage);

    const link = document.createElement("a");
    link.href = "https://www.kaveret.biz/";
    link.rel = "noopener norefferer";
    link.target = "_blank";
    link.classList.add("infinitybot-kit-error-docs");
    link.textContent = "For testing purpose";

    container.appendChild(header);
    container.appendChild(innerContainer);
    container.appendChild(link);

    return container;
}