function isMouseClickEvent(ev) {
    return ev.type === 'click';
}

function isKeyPressEvent(ev) {
    return ev.type === 'keypress';
}

function isKeyUpEvent(ev) {
    return ev.type === 'keyup';
}

function isKeyDownEvent(ev) {
    return ev.type === 'keydown';
}

function isKeyEvent(ev) {
    return ev instanceof KeyboardEvent;
}

function isMouseEvent(ev) {
    return ev instanceof MouseEvent;
}