import { Component, OnInit } from '@angular/core';
import { PetService } from '../services/pet.service';
import * as _ from "lodash";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [PetService]
})
export class AppComponent  implements OnInit {
  title = 'Cats list';
  public _petOwners = {};
  constructor(private _petService: PetService) {}

  filterPets(data) {
		this._petOwners = _(data)
				.groupBy('gender')
				.mapValues(val => _(val)
				.map(op => _(op.pets)
				.filter({type: 'Cat'})
				.flatMap('name')
				.value()
				).flatten().sortBy().value())
				.value()		
	}

  ngOnInit(){		
		this._petService.getpetOwnerData()
		.subscribe((data: any[]) =>  this.filterPets(data)) 
	}
}