export class View {
	canvasNode: HTMLCanvasElement = document.getElementById(
		"canvas"
	) as HTMLCanvasElement;
	ctx: CanvasRenderingContext2D;

	constructor() {
		let canvas: HTMLCanvasElement = document.getElementById(
			"canvas"
		) as HTMLCanvasElement;

		this.ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
		this.ctx.strokeStyle = "red";
	}

	public writeLine(x: number, y: number, isFirstPoint: boolean) {
		if (!isFirstPoint) {
			this.ctx.lineTo(x, y);
			this.ctx.stroke();
		} else {
			this.ctx.moveTo(x, y);
		}
	}

	public drawStartFakeCanvas(): string {
		console.log(this.ctx.strokeStyle);
		this.ctx.save();

		let imgData: string = this.canvasNode.toDataURL("image/png");

		return imgData;
	}

	setPencilColor(color: string) {
		this.ctx.beginPath();
		this.ctx.strokeStyle = color;
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

	public setPencilThickness(thickness: number) {
		let pencilThickness: number;

		switch (thickness) {
			case 1:
				pencilThickness = 1;
				break;
			case 2:
				pencilThickness = 3;
				break;
			case 3:
				pencilThickness = 5;
				break;
			case 4:
				pencilThickness = 10;
				break;
		}

		this.ctx.beginPath();

		this.ctx.lineWidth = pencilThickness;
	}

	public drawEndFakeCanvas(imgData: string) {
		var img: HTMLImageElement = document.createElement("img");
		img.src = imgData;

		img.onload = () => {
			this.ctx.drawImage(img, 0, 0);
		};

		this.ctx.restore();

		console.log(this.ctx.strokeStyle);
	}

	public setCanvasWidth(width: number) {
		let imgData: string = this.drawStartFakeCanvas();

		this.canvasNode.setAttribute("width", width.toString());
		this.drawEndFakeCanvas(imgData);
	}

	public setCanvasHeight(height: number) {
		let imgData: string = this.drawStartFakeCanvas();
		this.canvasNode.setAttribute("height", height.toString());
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
