import { View } from "./view";

export class Model {
	//ctx: CanvasRenderingContext2D;
	view: View;
	canvasWidth: number;
	canvasHeight: number;
	//thickness: number = 1;

	constructor(view: View) {
		//let canvas: HTMLCanvasElement = document.getElementById(
		//	"canvas"
		//) as HTMLCanvasElement;

		//this.ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
		this.view = view;
	}

	public downloadImage() {
		this.view.downloadImage();
	}

	public uploadImage(file: File) {
		this.view.uploadImage(file);
	}

	writeLine(x: number, y: number, isFirstPoint: boolean) {
		this.view.writeLine(x, y, isFirstPoint);
	}

	setColor(color: string) {
		this.view.setPencilColor(color);
		this.view.updateCurrentColor(color);
		this.view.setInputColor(color);
	}

	setThickness(thickness: string) {
		//this.thickness = +thickness;
		this.view.setPencilThickness(+thickness);

		//this.ctx.lineWidth = width;
	}

	//setPencilThickness()

	setCanvasWidth(width: number) {
		this.canvasWidth = width;
		this.view.setCanvasWidth(this.canvasWidth);
		this.view.setCanvasWidthText(this.canvasWidth);
	}

	setCanvasHeight(height: number) {
		this.canvasHeight = height;
		this.view.setCanvasHeight(this.canvasHeight);
		this.view.setCanvasHeightText(this.canvasHeight);
	}

	setMouseCoordinatesText(x: number, y: number) {
		this.view.setMouseCoordinatesText(x, y);
	}
}
