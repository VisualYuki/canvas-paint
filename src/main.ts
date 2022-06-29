import "./style.scss";
import "bootstrap/dist/css/bootstrap.css";
import { Model } from "./mvc/model";
import { Controller } from "./mvc/controller";
import { View } from "./mvc/view";

let view: View = new View();
let model: Model = new Model(view);
let controller: Controller = new Controller(model, view);

//ctx.fillStyle = "black";
//ctx.lineWidth = 1;

//canvas.addEventListener("mousedown", () => {
//	let isFirstPoint: boolean = true;
//	ctx.beginPath();

//	canvas.onmousemove = (event: MouseEvent) => {
//		if (!isFirstPoint) {
//			ctx.lineTo(event.offsetX, event.offsetY);
//			ctx.stroke();
//		} else {
//			ctx.moveTo(event.offsetX, event.offsetY);
//			isFirstPoint = false;
//		}
//	};

//	canvas.onmouseup = () => {
//		canvas.onmousemove = null;
//	};
//});
