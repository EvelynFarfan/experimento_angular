import { Component } from '@angular/core';

const ITEMS: Item[] = [
	{info: 'Mis Hijos', description: '(3 Personas)'},
	{info: 'Mis Familiares', description: '(1 Persona)'},
	{info: 'Personas que Apodero', description: '(1 Personas)'}
];

@Component ({
	selector:  'collapse',
	templateUrl: './collapse.component.html',
	styleUrls: [
		'./collapse.component.css'
	],
})

export class CollapseComponent{
	// items:Array<string> = ["Mis Hijos", "Mis Familiares", "Personas que Apodero"];
	// number:Array<string> = ["3 personas", "1 Persona", "1 Persona"];
	items = ITEMS;
	itemSeleccionado = Item;

	seleccionar(item){
		this.itemSeleccionado = item;
	}
};

export class Item{
	info: string;
	description: string;
}