# CollecType Vue Demo - Pokemon Collection Management

A comprehensive demonstration of **CollecType** collection engine using Pokemon data and Vue 3 framework with modern Composition API architecture.

## 🎯 Overview

This project showcases the power and flexibility of **CollecType** - a TypeScript library for advanced collection operations - through an interactive Pokemon database. The demo features real-time filtering, sorting, and statistical analysis of Pokemon data using Vue 3's Composition API with reactive patterns.

## ✨ Features

### 🔍 **Advanced Filtering**

- **Business Logic Filters**: `legendary()`, `experienced()`, `flying()`, `intimidating()`, `rare()`, `tall()`
- **Chainable Operations**: `flying() | rare()` for complex queries
- **Real-time Updates**: Instant visual feedback on filter changes
- **Smart Breadcrumbs**: Visual representation of active filter chains

### 📊 **Dynamic Statistics**

- **Live Counters**: Real-time stats for all filter categories
- **Type Distribution**: Pokemon count by type (Fire, Water, Electric, etc.)
- **Responsive Design**: Statistics adapt to mobile/desktop viewing

### 🎛️ **Flexible Sorting**

- **Multi-criteria**: Sort by ID, Name, Species, Generation, Base Experience, Height, Weight
- **Direction Control**: Ascending/Descending toggle
- **Persistent State**: Sort preferences maintained across interactions

### 📱 **Responsive UI**

- **Mobile-first**: Optimized for touch devices
- **Bulma CSS**: Modern, clean design system
- **Interactive Cards**: Hover effects and detailed Pokemon information

## 🛠️ Technology Stack

### **Frontend Framework**

- **Vue 3.5+** with Composition API
- **Reactive Patterns** with `ref()` and `computed()`
- **TypeScript 5.9+** with strict type checking
- **Vite 7.1+** for lightning-fast development

### **Collection Engine**

- **CollecType 0.9.6** - Advanced collection operations
- **Custom Pokemon Functions** - Domain-specific business logic
- **Reactive Integration** - Seamless Vue reactivity

### **UI Framework**

- **Bulma CSS 1.0.4** - Modern CSS framework
- **Font Awesome 7.0+** - Icon library
- **Responsive Grid** - Mobile-adaptive layouts

## 🏗️ Architecture

### **Component Structure**

```
src/components/
├── PokemonCard.vue               # Individual Pokemon display
├── FilterNavbar.vue              # Main filter controls
├── NavbarItem.vue               # Reusable filter buttons
├── PokemonStats.vue             # Category statistics
├── FilterBreadcrumb.vue         # Filter chain visualization
├── PokemonTypeStats.vue         # Type-based counters
└── SortNavbar.vue              # Sorting controls
```

### **Data Models**

```typescript
// Pokemon interface with modern TypeScript features
type Pokemon = {
  id: number;
  name: string;
  types: Array<string>;
  stats: Map<string, number>; // Using Map for performance
  abilities: Set<string>; // Using Set for uniqueness
  is_legendary: boolean;
  // ... additional properties
};
```

### **CollecType Integration**

```typescript
// Custom Pokemon collection with business logic
export class PokemonFunctions extends FullFunctions<Pokemon> {
  experienced(minExp = 100) {
    /* ... */
  }
  flying() {
    /* ... */
  }
  legendary(flag = true) {
    /* ... */
  }
  // Domain-specific methods
}

export class PokemonCollection extends Collection<Pokemon, PokemonFunctions> {
  // Inherits all standard + custom operations
}
```

## 🚀 Getting Started

### **Prerequisites**

- **Node.js** 18+
- **npm** or **yarn**
- **Vue CLI** or **Vite**

### **Installation**

```bash
# Clone the repository
git clone <repository-url>
cd collectype-demo-vue

# Install dependencies
npm install

# Start development server
npm run dev
```

### **Available Scripts**

```bash
npm run dev        # Development server (http://localhost:5173)
npm run build      # Production build
npm run preview    # Preview production build
npm run test       # Run unit tests
npm run lint       # Code linting
```

## 📚 CollecType Usage Examples

### **Basic Operations**

```typescript
const collection = new PokemonCollection(pokemons);

// Simple filtering
const legendary = collection.fn.legendary();
const experienced = collection.fn.experienced(150);

// Chaining operations
const rareFlying = collection.fn.flying().pipe('rare()');

// Sorting
const sortedByName = collection.fn.all().sort('name', 'asc');
```

### **Vue Composition API Integration**

```typescript
// Vue reactive patterns
const piping = ref('all()');
const sortField = ref<SortField>('id');

const filtered = computed(() => collection.value.fn.pipe(piping.value).sort(sortField.value));

// Automatic UI updates when data changes
function handleFilterChange(filter: string) {
  piping.value = filter; // Triggers reactive updates
}
```

## 🎮 Demo Features

### **Interactive Filtering**

Try these filter combinations in the live demo:

- `all()` - Show all Pokemon
- `legendary()` - Legendary Pokemon only
- `flying() | rare()` - Flying OR rare Pokemon
- `experienced(200)` - Pokemon with 200+ base experience

### **Statistical Insights**

- **Category Counters**: See how many Pokemon match each filter
- **Type Distribution**: Visual breakdown by Pokemon type
- **Real-time Updates**: Watch numbers change as you filter

### **Responsive Design**

- **Desktop**: Full feature set with statistics sidebar
- **Mobile**: Streamlined interface with touch-optimized controls
- **Tablet**: Balanced layout adapting to screen size

## 🔄 Comparison with Angular Demo

This Vue implementation demonstrates the same CollecType functionality as the Angular version, showcasing:

### **Framework Differences**

| **Aspect**     | **Vue**                        | **Angular**                  |
| -------------- | ------------------------------ | ---------------------------- |
| **Reactivity** | Composition API                | Signals                      |
| **Templates**  | Directives (`v-if`, `v-for`)   | Control Flow (`@if`, `@for`) |
| **Components** | `<script setup>` + Props/Emits | Standalone + Inputs/Outputs  |
| **Styling**    | Scoped CSS                     | Host binding + SCSS          |

### **Shared Concepts**

- ✅ **Same CollecType API** - Identical filtering and sorting logic
- ✅ **Same UI/UX** - Consistent user experience across frameworks
- ✅ **Same Data Model** - Shared Pokemon dataset and structure
- ✅ **Same Performance** - Optimized reactive updates in both

## 🎯 Key Learning Points

### **CollecType Benefits**

1. **Type Safety** - Full TypeScript support with intelligent autocomplete
2. **Performance** - Optimized algorithms for large datasets
3. **Flexibility** - Chainable operations for complex queries
4. **Extensibility** - Custom business logic integration
5. **Reactivity** - Seamless integration with modern frameworks

### **Modern Vue Patterns**

1. **Composition API** - Modern reactive patterns with `<script setup>`
2. **TypeScript Integration** - Full type safety in Vue components
3. **Reactive References** - `ref()`, `computed()`, and `watch()` patterns
4. **Props/Emits** - Type-safe component communication

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## 🔗 Related Projects

- **[CollecType Library](https://github.com/collectype/collectype)** - The core collection engine
- **[Angular Demo](../collectype-demo-angular)** - Angular implementation of the same demo
- **[Documentation](https://collectype.dev)** - Complete CollecType documentation

---

**Built with ❤️ using CollecType, Vue 3, and modern web technologies**

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
