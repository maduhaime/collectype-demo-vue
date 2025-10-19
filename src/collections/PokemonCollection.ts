import { Collection, FullFunctions } from 'collectype';

import type { Pokemon } from '@/models/Pokemon';

/**
 * Extended functions for Pokémon collections with domain-specific filtering capabilities.
 * Inherits all standard collection operations and adds Pokémon-specific business logic.
 */
export class PokemonFunctions extends FullFunctions<Pokemon> {
  experienced(min: number = 100): this {
    return this.begin(`Experienced (${min}+ exp)`).numberIsPositive('base_experience').numberGreaterOrEqual('base_experience', min).end();
  }

  flying(): this {
    return this.begin('Flying').arrayIncludes('types', 'flying').end();
  }

  generation(gen: number | null): this {
    if (gen === null) {
      return this.begin('All Generations').end();
    }
    return this.begin(`Generation ${gen}`).numberEquals('generation', gen).end();
  }

  intimidating(): this {
    return this.begin('Intimidating').setIncludes('abilities', 'intimidate').end();
  }

  legendary(flag: boolean = true): this {
    return this.begin(`Legendary (${flag})`).booleanEquals('is_legendary', flag).end();
  }

  rare(min: number = 200): this {
    return this.begin(`Rare (${min}+ exp)`).numberGreaterOrEqual('base_experience', min).end();
  }

  tall(min: number = 20): this {
    return this.begin(`Tall (${min}+ height)`).numberGreaterOrEqual('height', min).end();
  }
}

/**
 * Collection wrapper for Pokémon items with specialized PokemonFunctions.
 *
 * This class provides easy access to Pokémon-specific operations through the `fn` property,
 * including custom filters like `.legendary()` and `.experienced()`, in addition to all standard collection methods.
 *
 * Example usage (type inference for the functions class is automatic):
 *   const collection = new PokemonCollection(pokemons);
 *   const legendary = collection.fn.legendary();
 *   const experienced = collection.fn.experienced();
 */
export class PokemonCollection extends Collection<Pokemon, PokemonFunctions> {
  constructor(items: Pokemon[]) {
    super(items, PokemonFunctions);
  }
}
