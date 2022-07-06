import { canvas } from "./canvas";

export class View {
	constructor() {}

	public downloadImage() {
		let anchor: HTMLAnchorElement = document.createElement("a");
		document.body.appendChild(anchor);
		anchor.href = canvas.canvasNode.toDataURL();
		anchor.download = "canvs image.png";
		anchor.click();
		document.body.removeChild(anchor);
	}

	public uploadImage(file: File) {
		let url = URL.createObjectURL(file);
		let img: HTMLImageElement = new Image();
		img.src = url;
		img.onload = () => {
			canvas.ctx.drawImage(img, 0, 0);
		};
	}

	public drawStartFakeCanvas(): string {
		canvas.saveCanvasSettings();
		let imgData: string = canvas.canvasNode.toDataURL("image/png");
		return imgData;
	}

	public drawEndFakeCanvas(imgData: string) {
		var img: HTMLImageElement = document.createElement("img");
		img.src = imgData;
		img.onload = () => {
			canvas.ctx.drawImage(img, 0, 0);
		};
		canvas.restoreCanvasSettings();
	}

	setInputColor(color: string) {
		(
			document.querySelector(
				".top-panel .palette__color-input"
			) as HTMLInputElement
		).value = color;
	}

	public updateCurrentColor(color: string) {
		document
			.querySelector(".current-color__color")
			.setAttribute("style", `background: ${color}`);
	}

	public setCanvasWidth(width: number) {
		let imgData: string = this.drawStartFakeCanvas();

		canvas.canvasNode.setAttribute("width", width.toString());
		this.drawEndFakeCanvas(imgData);
	}

	public setCanvasHeight(height: number) {
		let imgData: string = this.drawStartFakeCanvas();
		canvas.canvasNode.setAttribute("height", height.toString());
		this.drawEndFakeCanvas(imgData);
	}

	public setCanvasWidthText(width: number) {
		document.querySelector(".bottom-panel .canvas-size .width").textContent =
			width.toString();
	}

	public setCanvasHeightText(height: number) {
		document.querySelector(".bottom-panel .canvas-size .height").textContent =
			height.toString();
	}

	public setMouseCoordinatesText(x: number, y: number) {
		let mouseCoordinatesText: HTMLElement =
			document.querySelector(".mouse-coordinates");

		if (x === -1 && y === -1) {
			mouseCoordinatesText.innerHTML = ``;
		} else {
			mouseCoordinatesText.innerHTML = `${x}, ${y}`;
		}
	}

	public setResizeCursor(label: string) {
		if (label === "right") {
			document.body.classList.add("ew-resize");
		} else if (label === "bottom") {
			document.body.classList.add("ns-resize");
		} else if (label === "bottom-right") {
			document.body.classList.add("nwse-resize");
		}
	}

	public removeResizeCursor(label: string) {
		if (label === "right") {
			document.body.classList.remove("ew-resize");
		} else if (label === "bottom") {
			document.body.classList.remove("ns-resize");
		} else if (label === "bottom-right") {
			document.body.classList.remove("nwse-resize");
		}
	}
}
