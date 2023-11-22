import { Component } from '@angular/core';
import { FormControl } from '@angular/forms'
import { Hero } from '../../interfaces/hero.interface';
import { HeroesServiceService } from '../../services/heroes.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { IfStmt } from '@angular/compiler';
@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styles: [
  ]
})
export class SearchPageComponent {

  public searchInput = new  FormControl('');

  public heroes: Hero[] = [];

  public selectedHero?: Hero;

  constructor ( private heroesService : HeroesServiceService){}
  searchHero() {
    const value: string = this.searchInput.value || '';

    this.heroesService.getSuggestions(value)
    .subscribe(heroes => this.heroes = heroes);
  }


  onSelectedOption (event : MatAutocompleteSelectedEvent) : void {
    if (!event) {
      this.selectedHero = undefined;
      return;
    }
    const hero: Hero = event.option.value;
      this.searchInput.setValue(hero.superhero);

      this.selectedHero = hero;
  }
}
