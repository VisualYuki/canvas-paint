import "./style.css";
import "bootstrap/dist/css/bootstrap.css";

let canvas: HTMLCanvasElement = document.getElementById(
	"canvas"
) as HTMLCanvasElement;

let ctx: CanvasRenderingContext2D = canvas.getContext(
	"2d"
) as CanvasRenderingContext2D;

ctx.fillStyle = "black";
ctx.lineWidth = 1;

window.addEventListener("DOMContentLoaded", () => {
	document
		.getElementById("canvas")
		?.setAttribute("width", document.documentElement.clientWidth.toString());
});

document.querySelector(".btn-blue")?.addEventListener("click", () => {
	ctx.strokeStyle = "blue";
});

document.querySelector(".btn-green")?.addEventListener("click", () => {
	ctx.strokeStyle = "green";
});

document.querySelector(".btn-red")?.addEventListener("click", () => {
	ctx.strokeStyle = "red";
});

document
	.querySelector(".color-input")
	?.addEventListener("input", (e: InputEvent) => {
		ctx.strokeStyle = (e.target as HTMLInputElement).value;
	});

canvas.addEventListener("mousedown", () => {
	let isFirstPoint: boolean = true;
	ctx.beginPath();

	canvas.onmousemove = (event: MouseEvent) => {
		if (!isFirstPoint) {
			ctx.lineTo(event.offsetX, event.offsetY);
			ctx.stroke();
		} else {
			ctx.moveTo(event.offsetX, event.offsetY);
			isFirstPoint = false;
		}
	};

	canvas.onmouseup = () => {
		canvas.onmousemove = null;
	};
});

document
	.querySelector(".input-range")
	.addEventListener("input", (e: InputEvent) => {
		ctx.lineWidth = +(e.target as HTMLInputElement).value;
	});
