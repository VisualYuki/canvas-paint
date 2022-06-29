import { Model } from "./model";
import { View } from "./view";

enum toolType {
	pencil = "pencil",
	colorPicker = "colorPicker",
	eraser = "eraser",
	text = "text",
	fillColor = "fillColor",
}

export class Controller {
	model: Model;
	view: View;
	lastEvent: toolType;
	canvas: HTMLElement = document.getElementById("canvas");
	mainContent: HTMLElement = document.querySelector(".main-content");
	canvasWrap: HTMLElement = document.querySelector(".canvas-wrap");

	constructor(model: Model, view: View) {
		this.model = model;
		this.view = view;
		this.initCanvasResizeEvents();
		this.initBottomPanelEvents();
		this.initTopPanelEvents();
	}

	private initTopPanelEvents() {
		this.setToolEvent(toolType.pencil);
		document
			.querySelectorAll(".top-panel  .tools img")
			.forEach((el: HTMLElement) => {
				el.addEventListener("click", () => {
					let type: toolType = toolType[el.getAttribute("data-tool-name")];

					this.setToolEvent(type);
				});
			});

		document
			.querySelector(".top-panel .thickness__range")
			.addEventListener("change", (e: InputEvent) => {
				//console.log(e.target.value);
				const target = e.target as HTMLInputElement;

				this.model.setThickness(target.value);
			});

		document
			.querySelector(".top-panel .palette__color-input")
			.addEventListener("change", (e: InputEvent) => {
				//console.log(e.target.value);
				const target = e.target as HTMLInputElement;

				this.model.setColor(target.value);
			});

		this.model.setColor("#000000");
	}

	private setToolEvent(type: toolType) {
		if (type === toolType.pencil) {
			document.documentElement.classList.add("pencil-cursor");
			document
				.querySelector(".top-panel img[data-tool-name='pencil']")
				.classList.add("active");

			this.canvas.onmousedown = (e: MouseEvent) => {
				this.model.writeLine(e.offsetX, e.offsetY, true);

				this.canvas.onmousemove = (e: MouseEvent) => {
					this.model.writeLine(e.offsetX, e.offsetY, false);
				};

				this.canvas.onmouseup = () => {
					this.canvas.onmousemove = null;
				};
			};
		} else if (type === toolType.eraser) {
		}
	}

	private initBottomPanelEvents() {
		this.canvas.addEventListener("mousemove", (e: MouseEvent) => {
			this.model.setMouseCoordinatesText(e.offsetX, e.offsetY);
		});

		this.canvas.addEventListener("mouseleave", () => {
			this.model.setMouseCoordinatesText(-1, -1);
		});

		const offsetFromRight: number = 100;
		this.model.setCanvasWidth(
			document.documentElement.clientWidth - offsetFromRight
		);

		this.model.setCanvasHeight(600);
	}

	private initCanvasResizeEvents() {
		let rightResizeBtn: HTMLElement = document.querySelector(
			".canvas-wrap .right-resize-btn"
		) as HTMLElement;

		let bottomResizeBtn: HTMLElement = document.querySelector(
			".canvas-wrap .bottom-resize-btn"
		) as HTMLElement;

		let bottomRightResizeBtn: HTMLElement = document.querySelector(
			".canvas-wrap .bottom-right-resize-btn"
		) as HTMLElement;

		bottomResizeBtn.addEventListener("mousedown", () => {
			resizeCanvasFunc("bottom");
		});

		rightResizeBtn.addEventListener("mousedown", () => {
			resizeCanvasFunc("right");
		});

		bottomRightResizeBtn.addEventListener("mousedown", () => {
			resizeCanvasFunc("bottom-right");
		});

		let resizeCanvasFunc = (label: string) => {
			this.view.setResizeCursor(label);

			let setCanvasSizeFunc = (e: MouseEvent) => {
				if (label === "right" || label === "bottom-right") {
					this.model.setCanvasWidth(
						e.pageX - this.canvasWrap.getBoundingClientRect().x
					);
				}

				if (label === "bottom" || label === "bottom-right") {
					this.model.setCanvasHeight(
						e.pageY - this.canvasWrap.getBoundingClientRect().y
					);
				}
			};

			this.mainContent.onmousemove = (e: MouseEvent) => {
				setCanvasSizeFunc(e);
			};

			this.mainContent.onmouseup = (e: MouseEvent) => {
				setCanvasSizeFunc(e);

				this.view.removeResizeCursor(label);

				this.mainContent.onmouseup = null;
				this.mainContent.onmousemove = null;
			};
		};
	}
}
