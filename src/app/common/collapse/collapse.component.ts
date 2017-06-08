import { Component } from '@angular/core';
declare var jQuery:any;
declare var $:any;

const ITEMS: Item[] = [
	{info: 'Mis Hijos', description: '(3 Personas)', id: '1'},
	{info: 'Mis Familiares', description: '(1 Persona)', id:'2'},
	{info: 'Personas que Apodero', description: '(1 Personas)', id:'3'}
];

@Component ({
	selector:  'collapse',
	templateUrl: './collapse.component.html',
	styleUrls: [
		'./collapse.component.css'
	],
})

export class CollapseComponent{
	
	items = ITEMS;
	itemSeleccionado = Item;
	seleccionar(item){
		this.itemSeleccionado = item;
		console.log(item);
	}
	public isCollapsed:boolean = false;
	public collapsed(event:any):void{
		console.log(event);
	}
	public expanded(event:any):void{
		console.log(event);
	}
	
};

export class Item{
	info: string;
	description: string;
	id: string;
}

