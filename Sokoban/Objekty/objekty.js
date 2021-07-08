class BaseObject {
    constructor(
        x, 
        y,
        width,
        height,
    ) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    onClickHandler = null;
    onMouseUpHandler = null;
    onMouseDownHandler = null;

    render(ctx) {
        const {x, y, width, height} = this;
        ctx.fillRect(x, y, width, height);
        ctx.strokeRect(x, y, width, height);
    }

    handleEvent(ev) {
        if (this.onClickHandler && this.isClicked(ev)) {
            this.onClickHandler(ev);
        }
    }

    onMouseDownHandler(fn) {
        this.onMouseDownHandler = fn;
    }

    onMouseUp(fn) {
        this.onMouseUpHandler = fn;
    }

    onClick(fn) {
        this.onClickHandler = fn;
    }

    isClicked(ev) {
        if (isMouseClickEvent(ev)) {
            const mouseX = ev.offsetX;
            const mouseY = ev.offsetY;
            if (mouseX >= this.x && mouseX <= this.x + this.width && mouseY >= this.y && mouseY <= this.y + this.height) {
                return true;
            }
        }
        return false;
    }
}

class ImageButton extends BaseObject {
    constructor(
        x,
        y,
        width,
        height,
        image,
    ) {
        super(x, y, width, height);
        this.image = image;
    }
	render(ctx) {
        const {image, x, y, width, height} = this;

        ctx.drawImage(image, x, y, width, height);
    }
}

class TextButton extends BaseObject {
    constructor(
        x,
        y,
        width,
        height,
        size,
        label,
    ) {
        super(x, y, width, height);
        this.label = label;
        this.size = size;
    }
	render(ctx) {
        const {label, x, y, width, height} = this;

        const textX = x;
        const textY = y + height-5;

        ctx.save();
        ctx.fillRect(x, y, width, height);
        ctx.strokeRect(x, y, width, height);
        ctx.restore();

        ctx.save();
        const gradient = ctx.createLinearGradient(0, 0, 1000, 0);
        gradient.addColorStop("0", "red");
        gradient.addColorStop("0.5", "red");
        gradient.addColorStop("1.0", "red");

        ctx.font = `${this.size}px Verdana`;

        ctx.strokeStyle = gradient;
        ctx.strokeText(label, textX, textY, width);
        ctx.restore(); 
    }
}

class Background extends BaseObject {
    constructor(x, y, width, height, image) {
        super(x, y, width, height);
        this.image = image;
    }
	render(ctx) {
        ctx.save()
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        ctx.restore()
    }
}

class SoundToggleButton extends BaseObject {
    constructor(x, y, width, height, imageOn, imageOff, defaultState = true) {
        super(x, y, width, height);
        this.imageOn = imageOn;
        this.imageOff = imageOff;
        this.isOn = defaultState;
    }
	render(ctx) {
        const image = this.isOn === true ? this.imageOn : this.imageOff;
        ctx.save()
        ctx.drawImage(image, this.x, this.y, this.width, this.height);
        ctx.restore()
    }
}