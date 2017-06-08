import { Component } from '@angular/core';

const  BIRTHDATES: Birthdate[] = [
	{ title: 'Edad', text:'6 años'},
	{ title: 'Fecha de Nacimiento', text: '10 de Enero del 2011'}
];

const PLACEHEALTHS : Placehealth[] = [
	{ title: 'Lugar de Nacimiento', text:'Lima'},
	{ title: 'CS Donde nacio', text: 'Hospital Nacional Rebagliati Martins'},
	{ title: 'CS Donde se atiende', text:'Hospital Nacional Rebagliati Martins'}
]

const BUTTONCARDS : Buttoncard[] = [
	{ title: 'CARTILLA DE VACUNACIÓN'},
	{ title: 'CERTIFICADO DE RECIÉN NACIDO'}
]

@Component ({
	selector:'card',
	templateUrl: './card.component.html',
	styleUrls: [
		'./card.component.css'
	]
})

export class CardComponent{

	birthdates = BIRTHDATES;
	birthdateSeleccionado = Birthdate;

	placehealths = PLACEHEALTHS;
	placehealthSeleccionado = Placehealth;

	buttoncards = BUTTONCARDS;
	buttoncardSeleccionado = Buttoncard;

	seleccionar(birthdate, placehealth, buttoncard){
		birthdate.birthdateSeleccionado = birthdate;
		placehealth.placehealthSeleccionado = placehealth;
		buttoncard.buttoncardSeleccionado = buttoncard;
	}
};

export class Birthdate{
	title: string;
	text: string;
}

export class Placehealth{
	title: string;
	text: string;
}

export class Buttoncard{
	title: string;
}