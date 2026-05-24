import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { Pokemon, PokemonListResponse } from '../Interfaces/pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private readonly baseUrl: string = 'https://pokeapi.co/api/v2';

  constructor(private http: HttpClient) {}

  getPokemons(limit: number, offset: number): Observable<PokemonListResponse> {
    return this.http.get<PokemonListResponse>(`${this.baseUrl}/pokemon?limit=${limit}&offset=${offset}`);
  }

  getPokemonById(id: number): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${this.baseUrl}/pokemon/${id}`);
  }

  getPokemonByName(name: string): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${this.baseUrl}/pokemon/${name.toLowerCase()}`);
  }

  getRandomPokemons(count: number): Observable<Pokemon[]> {
    const totalPokemon: number = 898;
    const ids: number[] = [];

    while (ids.length < count) {
      const id: number = Math.floor(Math.random() * totalPokemon) + 1;
      if (!ids.includes(id)) {
        ids.push(id);
      }
    }

    const requests: Observable<Pokemon>[] = ids.map((id: number) => this.getPokemonById(id));
    return forkJoin(requests);
  }
}
