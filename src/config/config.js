// Get all script tags in the document
var scriptTags = document.getElementsByTagName('script');
var token = null;
var custId = null;
var chatId = null;
var url = null;

// Find the script tag with the desired source file
var desiredScriptTag = null;
for (var i = 0; i < scriptTags.length; i++) {
    if (scriptTags[i].src.includes('config.js')) {
        desiredScriptTag = scriptTags[i];
        break;
    }
}

if (desiredScriptTag) {
    var scriptUrl = desiredScriptTag.src;
    var url = new URL(scriptUrl);
    token = url.searchParams.get('token');
    custId = url.searchParams.get('custId');
    chatId = url.searchParams.get('chatId');
    url = url.searchParams.get('url')
    debugger
    // Use the values as needed
    console.log(token, custId, chatId, url);
}

const userConfig = {
    token: token,
    custId: custId,
    chatId: chatId,
    url: url

}

const { renderChatbot, createChatBotMessage } = window.infinitybotChatbot;

const inputFieldWidget = (props) => {
    const { setState } = props;

    const updateInput = (e) => {
        const value = e.target.value;
        setState((prev) => ({ ...prev, input: value }));
    };

    const container = document.createElement("div");
    const input = document.createElement("input");
    input.onchange = updateInput;
    const output = document.createElement("div");
    output.textContent = props.input;

    container.appendChild(input);
    container.appendChild(output);

    return container;
}

const rootEl = document.getElementById("infinitybot");
const config = {
    botName: "Infinitybot",
    initialMessages: [createChatBotMessage("Hello World", { widget: "inputFieldWidget" })],
    state: {
        "input": ""
    },
    widgets: [
        {
            widgetName: "inputFieldWidget",
            widgetFunc: inputFieldWidget,
            mapStateToProps: ["input"],
            props: {}
        }
    ],
};

// MessageParser starter code
class MessageParser {
    constructor(actionProvider) {
        this.actionProvider = actionProvider;
    }
    parse(message) {
        this.actionProvider.userMessage(message, userConfig);
    }
}

class ActionProvider {
    constructor(createChatBotMessage, setStateFunc, createClientMessage) {
        this.createChatBotMessage = createChatBotMessage;
        this.setState = setStateFunc;
        this.createClientMessage = createClientMessage;
    }
    async userMessage(message, userConfig) {
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userConfig.token}`,
            },
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            body: `{
                "ticketId": 1,
                "customerId": "${userConfig.custId}",
                "message": "${message}",
                "chatFlowId": "${userConfig.chatId}"
            }`
        };

        try {
            const response = await fetch(`${userConfig.url}`, config);
            const data = await response.json();

            if (data.status !== "Error") {
                if (data.flowend === false) {

                    const message = this.createChatBotMessage(data.response);
                    this.setState((state) => {
                        return { ...state, messages: [...state.messages, message] };
                    })
                } else if (data.response === "") {
                    const message = this.createChatBotMessage("Flow ended");
                    this.setState((state) => {
                        return {
                            ...state, messages: [...state.messages, message]
                        };
                    });
                } else {
                    const message = this.createChatBotMessage(data.response)
                    this.setState((state) => {
                        return { ...state, messages: [...state.messages, message] };
                    });
                }
            }
            return data;
        } catch (error) {
            console.log(error);
        }
    }
}

renderChatbot(rootEl, config, MessageParser, ActionProvider);

