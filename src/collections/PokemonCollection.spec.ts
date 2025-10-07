import { describe, it, expect, beforeEach } from 'vitest';
import { PokemonCollection, PokemonFunctions } from './PokemonCollection';
import type { Pokemon } from '../models/Pokemon';

describe('PokemonCollection', () => {
  let pokemons: Pokemon[];
  let collection: PokemonCollection;

  beforeEach(() => {
    pokemons = [
      {
        id: 1,
        name: 'Mewtwo',
        is_legendary: true,
        types: ['psychic'],
        abilities: new Set(['pressure']),
        base_experience: 306,
        height: 20,
        weight: 1220,
        stats: new Map(),
        generation: 1,
        species: 'Genetic',
      },
      {
        id: 2,
        name: 'Pidgey',
        is_legendary: false,
        types: ['flying', 'normal'],
        abilities: new Set(['keen-eye']),
        base_experience: 50,
        height: 3,
        weight: 18,
        stats: new Map(),
        generation: 1,
        species: 'Tiny Bird',
      },
      {
        id: 3,
        name: 'Zapdos',
        is_legendary: true,
        types: ['electric', 'flying'],
        abilities: new Set(['intimidate']),
        base_experience: 261,
        height: 16,
        weight: 526,
        stats: new Map(),
        generation: 1,
        species: 'Electric',
      },
      {
        id: 4,
        name: 'Bulbasaur',
        is_legendary: false,
        types: ['grass', 'poison'],
        abilities: new Set(['overgrow']),
        base_experience: 64,
        height: 7,
        weight: 69,
        stats: new Map(),
        generation: 1,
        species: 'Seed',
      },
    ];
    collection = new PokemonCollection(pokemons);
  });

  it('should filter legendary Pokémon', () => {
    const result = collection.fn.legendary();
    expect(result.items.map((p) => p.name)).toEqual(['Mewtwo', 'Zapdos']);
  });

  it('should filter flying Pokémon', () => {
    const result = collection.fn.flying();
    expect(result.items.map((p) => p.name)).toEqual(['Pidgey', 'Zapdos']);
  });

  it('should filter Pokémon with intimidate ability', () => {
    const result = collection.fn.intimidating();
    expect(result.items.map((p) => p.name)).toEqual(['Zapdos']);
  });

  it('should filter experienced Pokémon', () => {
    const result = collection.fn.experienced(200);
    expect(result.items.map((p) => p.name)).toEqual(['Mewtwo', 'Zapdos']);
  });

  it('should filter rare Pokémon', () => {
    const result = collection.fn.rare(300);
    expect(result.items.map((p) => p.name)).toEqual(['Mewtwo']);
  });

  it('should allow chaining of filters', () => {
    const result = collection.fn.legendary().flying();
    expect(result.items.map((p) => p.name)).toEqual(['Zapdos']);
  });

  it('should return an instance of PokemonFunctions after filtering', () => {
    const result = collection.fn.legendary();
    expect(result).toBeInstanceOf(PokemonFunctions);
  });
});
