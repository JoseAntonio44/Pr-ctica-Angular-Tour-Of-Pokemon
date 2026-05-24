import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PokemonService } from '../../Services/pokemon.service';
import { PokemonListItem, PokemonListResponse } from '../../Interfaces/pokemon';

@Component({
  selector: 'app-pokemon-list',
  imports: [],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.scss'
})
export class PokemonListComponent implements OnInit {

  pokemons: PokemonListItem[] = [];
  currentPage: number = 1;
  totalPages: number = 0;
  loading: boolean = true;

  private readonly limit: number = 20;

  constructor(private pokemonService: PokemonService, private router: Router) {}

  ngOnInit(): void {
    this.loadPage(1);
  }

  loadPage(page: number): void {
    this.loading = true;
    const offset: number = (page - 1) * this.limit;

    this.pokemonService.getPokemons(this.limit, offset).subscribe({
      next: (data: PokemonListResponse) => {
        this.pokemons = data.results;
        this.totalPages = Math.ceil(data.count / this.limit);
        this.currentPage = page;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.loadPage(this.currentPage + 1);
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.loadPage(this.currentPage - 1);
    }
  }

  getId(url: string): number {
    const parts: string[] = url.split('/').filter((p: string) => p !== '');
    return Number(parts[parts.length - 1]);
  }

  goToDetail(url: string): void {
    const id: number = this.getId(url);
    this.router.navigate(['/pokemon', id]);
  }
}
