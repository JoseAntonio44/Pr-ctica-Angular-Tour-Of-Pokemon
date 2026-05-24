import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PokemonService } from '../../Services/pokemon.service';
import { PokemonListItem, PokemonListResponse } from '../../Interfaces/pokemon';

@Component({
  selector: 'app-search',
  imports: [FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit {

  query: string = '';
  allPokemons: PokemonListItem[] = [];
  results: PokemonListItem[] = [];

  constructor(private pokemonService: PokemonService, private router: Router) {}

  ngOnInit(): void {
    this.pokemonService.getPokemons(1302, 0).subscribe({
      next: (data: PokemonListResponse) => {
        this.allPokemons = data.results;
      }
    });
  }

  search(): void {
    const q: string = this.query.toLowerCase().trim();
    if (q.length === 0) {
      this.results = [];
      return;
    }
    this.results = this.allPokemons.filter((p: PokemonListItem) =>
      p.name.includes(q)
    );
  }

  getId(url: string): number {
    const parts: string[] = url.split('/').filter((p: string) => p !== '');
    return Number(parts[parts.length - 1]);
  }

  getSprite(url: string): string {
    const id: number = this.getId(url);
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  }

  goToDetail(url: string): void {
    const id: number = this.getId(url);
    this.router.navigate(['/pokemon', id]);
  }
}
