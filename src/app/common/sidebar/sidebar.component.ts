import { Component } from "@angular/core";

@Component({
	selector: 'sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: [
		'./sidebar.component.css'
	]

})

export class SidebarComponent{
	items:Array<string> = ["Dashboard", "Perfil", "HCE", "Mi Familia", "Servicios", "Preguntas Frecuentes", "Ayuda"];
};