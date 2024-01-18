export const messageTextContentType = (message, messageContainer) => {
    return messageContainer.textContent = message;
}

export const messageExternalApiType = (message, messageContainer) => {
    const str = message;
    // Get the paragraph text
    let _paragraph = str.slice(0, str.indexOf(":") + 2);
    // Creating a container for dog images to display, style and use them in chatbox
    let container = document.createElement("div");
    container.className = "externalApi-container";

    let paragraph = document.createElement("p");
    paragraph.innerHTML = _paragraph;
    paragraph.style.marginBottom = "10px";

    container.appendChild(paragraph)
    // Get the image URLs
    let _images = str.slice(str.indexOf(":") + 2, str.lastIndexOf(".jpg") + 4).split(",");
    for (let i = 0; i <= 10; i++) {
        let image = document.createElement("img");
        image.src = _images[i];
        image.alt = `dog ${[i]}`;
        image.style.width = "100%";
        image.style.height = "auto";
        image.style.display = "block";
        image.style.borderRadius = "5px";
        image.style.boxShadow = "0 0 5px #000";
        // image.style.padding = "5px";
        image.style.marginTop = "5px";
        image.style.marginBottom = "5px";
        image.style.cursor = "pointer";
        image.onclick = () => {
            // container.innerHTML = "";
            // container.appendChild(image);
            window.open(image.src, '_blank');;
        }
        container.appendChild(image);
    }

    // Remove <br> tags from menu items
    const menu = str.slice(str.lastIndexOf(".jpg") + 4);

    // Remove <br> tags from menu items
    const menuItems = menu.split("<br>").filter(item => item.trim() !== "");
    const textContainer = document.createElement("div");
    textContainer.style.display = "flex";
    textContainer.style.flexDirection = "row";
    textContainer.style.gap = "10px";
    textContainer.style.marginTop = "10px";
    menuItems.forEach(item => {
        let _item = document.createElement("p");
        _item.innerHTML = item;

        textContainer.appendChild(_item);
    })
    container.appendChild(textContainer);
    return messageContainer.appendChild(container);

}

export const messageBreakType = (message, messageContainer) => {
    // Get the string text without <br> tag
    const array = message.split("<br>");
    // Make a <ul> tag here and assign it to variable uList
    let uList = document.createElement("ul");
    // Loop for making a <li> tag of list and assign text to each <li>
    for (let i = 0; i < array.length; i++) {
        const li = document.createElement("li");
        li.style.marginTop = "5px";
        if (i !== 0) {
            li.innerHTML = array[i];
            uList.appendChild(li);
        } else {
            let paragraph = document.createElement("p");
            paragraph.style.marginTop = "2px";
            paragraph.textContent = array[i];
            uList.appendChild(paragraph);
        }
    }
    // Style List with parent tag <ul> which will be applied to all the children list <li> tag
    uList.style.listStyleType = "none";
    uList.style.paddingInlineStart = "10px";
    uList.style.marginBlockStart = "0";
    uList.style.marginBlockEnd = "0";
    // Finally append the required result into <ul> tag and return it
    return messageContainer.appendChild(uList);
}

export const messageParagraphType = (message, messageContainer) => {
    // Get the string text without <p> tag
    const array = message.split("<p>");
    // Make a paragraph tag here and assign it to paragraph variable
    let paragraph = document.createElement("p");
    // Loop for making a <p> tag of paragraph if necessary and assign it to the its corresponding tag
    for (let i = 0; i < array.length; i++) {
        paragraph.appendChild(array[i]);
    }
    // Style each Paragraph or maybe style with parent div
    // paragraph.style. 
    // paragraph.style. 
    // Finally append the required result into <p> tag and return it
    return messageContainer.appendChild(paragraph);
}

export const messageBoldType = (message, messageContainer) => {
    // Get the string text without <bold> tag
    const array = message.split("bold>");
    // Make a bold tag here and assign it to bold variable
    let bold = document.createElement("bold");
    // Loop for making a <bold> tag if necessary and assign it to the its corresponding tag
    for (let i = 0; i < array.length; i++) {
        bold.appendChild(array[i]);
    }
    // Style each bold tag or maybe style it with parent div
    // bold.style. 
    // bold.style. 
    // Finally append the required result into <bold> tag and return it
    return messageContainer.appendChild(bold);
}
export const messageitalicType = (message, messageContainer) => {
    // Get the string text without <italic> tag
    const array = message.split("<italic>");
    // Make a italic tag here and assign it to italic variable
    let italic = document.createElement("italic");
    // Loop for making a <italic> tag if necessary and assign it to the its corresponding tag
    for (let i = 0; i < array.length; i++) {
        italic.appendChild(array[i]);
    }
    // Style each italic tag or maybe style it with parent div
    // italic.style. 
    // italic.style. 
    // Finally append the required result into <italic> tag and return it
    return messageContainer.appendChild(italic);
}