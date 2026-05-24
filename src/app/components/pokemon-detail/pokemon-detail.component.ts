import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonService } from '../../Services/pokemon.service';
import { Pokemon } from '../../Interfaces/pokemon';

@Component({
  selector: 'app-pokemon-detail',
  imports: [],
  templateUrl: './pokemon-detail.component.html',
  styleUrl: './pokemon-detail.component.scss'
})
export class PokemonDetailComponent implements OnInit {

  pokemon: Pokemon | null = null;
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id: number = Number(this.route.snapshot.paramMap.get('id'));
    this.pokemonService.getPokemonById(id).subscribe({
      next: (data: Pokemon) => {
        this.pokemon = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  getSprite(): string {
    if (!this.pokemon) return '';
    return this.pokemon.sprites.other['official-artwork'].front_default
      ?? this.pokemon.sprites.front_default
      ?? '';
  }

  goBack(): void {
    this.router.navigate(['/pokemon']);
  }
}
