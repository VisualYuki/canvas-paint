import { View } from "./view";
import { canvas } from "./canvas";

export class Model {
	view: View;
	canvasWidth: number;
	canvasHeight: number;

	constructor(view: View) {
		this.view = view;
	}

	public clearCanvas() {
		canvas.clearCanvas(this.canvasWidth, this.canvasHeight);
	}

	public getPixelColor(offsetX: number, offsetY: number) {
		let pixelColor = canvas.getPixelColor(offsetX, offsetY);

		this.setColor(pixelColor);
	}

	public downloadImage() {
		this.view.downloadImage();
	}

	public uploadImage(file: File) {
		this.view.uploadImage(file);
	}

	public writeLine(x: number, y: number, isFirstPoint: boolean) {
		canvas.writeLine(x, y, isFirstPoint);
	}

	public setColor(color: string) {
		canvas.setPencilColor(color);
		this.view.updateCurrentColor(color);
		this.view.setInputColor(color);
	}

	public setThickness(thickness: string) {
		canvas.setPencilThickness(+thickness);
	}

	public setCanvasWidth(width: number) {
		this.canvasWidth = width;
		this.view.setCanvasWidth(this.canvasWidth);
		this.view.setCanvasWidthText(this.canvasWidth);
	}

	public setCanvasHeight(height: number) {
		this.canvasHeight = height;
		this.view.setCanvasHeight(this.canvasHeight);
		this.view.setCanvasHeightText(this.canvasHeight);
	}

	public setMouseCoordinatesText(x: number, y: number) {
		this.view.setMouseCoordinatesText(x, y);
	}
}
