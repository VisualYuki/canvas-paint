class Canvas {
	canvasNode: HTMLCanvasElement = document.getElementById(
		"canvas"
	) as HTMLCanvasElement;
	ctx: CanvasRenderingContext2D;
	canvasSettings: { lineWidth?: number; fillStyle?: string } = {};
	canvasSettingsValues: string[] = ["lineWidth", "fillStyle", "strokeStyle"];

	constructor() {
		this.ctx = this.canvasNode.getContext("2d") as CanvasRenderingContext2D;
	}

	public saveCanvasSettings() {
		for (let value of canvas.canvasSettingsValues) {
			canvas.canvasSettings[value] = canvas.ctx[value];
		}
	}

	public restoreCanvasSettings() {
		for (let value of canvas.canvasSettingsValues) {
			canvas.ctx[value] = canvas.canvasSettings[value];
		}
	}

	public writeLine(x: number, y: number, isFirstPoint: boolean) {
		if (!isFirstPoint) {
			this.ctx.lineTo(x, y);
			this.ctx.stroke();
		} else {
			this.ctx.moveTo(x, y);
		}
	}

	public getPixelColor(offsetX: number, offsetY: number) {
		let colors = this.ctx.getImageData(offsetX, offsetY, 1, 1).data;

		return `#${colors[0].toString(16)}${colors[1].toString(
			16
		)}${colors[2].toString(16)}`;
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

	public setPencilColor(color: string) {
		this.ctx.beginPath();
		this.ctx.strokeStyle = color;
	}

	public clearCanvas(width: number, height: number) {
		this.saveCanvasSettings();

		this.ctx.fillStyle = "#ffffff";
		this.ctx.fillRect(0, 0, width, height);
		this.ctx.beginPath();

		this.restoreCanvasSettings();
	}
}

export let canvas = new Canvas();
