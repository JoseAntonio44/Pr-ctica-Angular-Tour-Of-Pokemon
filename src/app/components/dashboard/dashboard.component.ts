import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PokemonService } from '../../Services/pokemon.service';
import { Pokemon } from '../../Interfaces/pokemon';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  pokemons: Pokemon[] = [];
  loading: boolean = true;

  constructor(private pokemonService: PokemonService, private router: Router) {}

  ngOnInit(): void {
    this.pokemonService.getRandomPokemons(9).subscribe({
      next: (data: Pokemon[]) => {
        this.pokemons = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  goToDetail(id: number): void {
    this.router.navigate(['/pokemon', id]);
  }

  getSprite(pokemon: Pokemon): string {
    return pokemon.sprites.other['official-artwork'].front_default
      ?? pokemon.sprites.front_default
      ?? '';
  }
}
