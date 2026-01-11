import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [lang, setLang] = useState('it');
  const [search, setSearch] = useState('');
  const [mealType, setMealType] = useState('all');
  const [budget, setBudget] = useState('all');
  const [difficulty, setDifficulty] = useState('all');
  const [diet, setDiet] = useState('all');
  const [culture, setCulture] = useState('all');
  const [favorites, setFavorites] = useState([]);

  // Carica preferiti da localStorage
  useEffect(() => {
    const saved = localStorage.getItem('favorites');
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  // Salva preferiti
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (recipe) => {
    const exists = favorites.find((f) => f.name === recipe.name);
    if (exists) {
      setFavorites(favorites.filter((f) => f.name !== recipe.name));
    } else {
      setFavorites([...favorites, recipe]);
    }
  };

  const titles = {
    it: 'AI Food App 🍲',
    fr: 'AI Food App 🍲',
    en: 'AI Food App 🍲',
  };

  const subtitles = {
    it: 'Benvenuto nella Versione 3 della tua app multiculturale e multilingua!',
    fr: 'Bienvenue dans la version 3 de votre application multiculturelle et multilingue !',
    en: 'Welcome to Version 3 of your multicultural and multilingual app!',
  };

  const recipes = {
    it: [
      {
        name: 'Couscous marocchino',
        ingredients: 'Semola, verdure, ceci, spezie',
        description: 'Un piatto tradizionale ricco di sapore e cultura.',
        mealType: 'lunch',
        budget: 'low',
        difficulty: 'easy',
        diet: 'halal',
        culture: 'african'
      },
      {
        name: 'Riso alla senegalese (Ceebu Jën)',
        ingredients: 'Riso, pesce, verdure, pomodoro',
        description: 'Il piatto nazionale del Senegal, nutriente e colorato.',
        mealType: 'lunch',
        budget: 'medium',
        difficulty: 'medium',
        diet: 'normal',
        culture: 'african'
      }
    ],
    fr: [
      {
        name: 'Couscous marocain',
        ingredients: 'Semoule, légumes, pois chiches, épices',
        description: 'Un plat traditionnel riche en saveurs et en culture.',
        mealType: 'lunch',
        budget: 'low',
        difficulty: 'easy',
        diet: 'halal',
        culture: 'african'
      },
      {
        name: 'Riz sénégalais (Ceebu Jën)',
        ingredients: 'Riz, poisson, légumes, tomate',
        description: 'Le plat national du Sénégal, nourrissant et coloré.',
        mealType: 'lunch',
        budget: 'medium',
        difficulty: 'medium',
        diet: 'normal',
        culture: 'african'
      }
    ],
    en: [
      {
        name: 'Moroccan Couscous',
        ingredients: 'Semolina, vegetables, chickpeas, spices',
        description: 'A traditional dish full of flavor and culture.',
        mealType: 'lunch',
        budget: 'low',
        difficulty: 'easy',
        diet: 'halal',
        culture: 'african'
      },
      {
        name: 'Senegalese Rice (Ceebu Jën)',
        ingredients: 'Rice, fish, vegetables, tomato',
        description: 'The national dish of Senegal, nourishing and colorful.',
        mealType: 'lunch',
        budget: 'medium',
        difficulty: 'medium',
        diet: 'normal',
        culture: 'african'
      }
    ]
  };

  const filteredRecipes = recipes[lang].filter(recipe => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      recipe.name.toLowerCase().includes(searchText) ||
      recipe.ingredients.toLowerCase().includes(searchText);

    const matchesMeal =
      mealType === 'all' || recipe.mealType === mealType;

    const matchesBudget =
      budget === 'all' || recipe.budget === budget;

    const matchesDifficulty =
      difficulty === 'all' || recipe.difficulty === difficulty;

    const matchesDiet =
      diet === 'all' || recipe.diet === diet;

    const matchesCulture =
      culture === 'all' || recipe.culture === culture;

    return (
      matchesSearch &&
      matchesMeal &&
      matchesBudget &&
      matchesDifficulty &&
      matchesDiet &&
      matchesCulture
    );
  });

  return (
    <div className="app">
      <div className="lang-selector">
        <button onClick={() => setLang('it')}>🇮🇹 IT</button>
        <button onClick={() => setLang('fr')}>🇫🇷 FR</button>
        <button onClick={() => setLang('en')}>🇬🇧 EN</button>
      </div>

      <h1>{titles[lang]}</h1>
      <p>{subtitles[lang]}</p>

      <input
        type="text"
        placeholder={
          lang === 'it' ? 'Cerca ricette...' :
          lang === 'fr' ? 'Rechercher des recettes...' :
          'Search recipes...'
        }
        className="search-bar"
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="filters">
        <div className="meal-buttons">
          <button
            className={mealType === 'all' ? 'active' : ''}
            onClick={() => setMealType('all')}
          >
            {lang === 'it' ? 'Tutti' : lang === 'fr' ? 'Tous' : 'All'}
          </button>
          <button
            className={mealType === 'breakfast' ? 'active' : ''}
            onClick={() => setMealType('breakfast')}
          >
            {lang === 'it' ? 'Colazione' : lang === 'fr' ? 'Petit-déj' : 'Breakfast'}
          </button>
          <button
            className={mealType === 'lunch' ? 'active' : ''}
            onClick={() => setMealType('lunch')}
          >
            {lang === 'it' ? 'Pranzo' : lang === 'fr' ? 'Déjeuner' : 'Lunch'}
          </button>
          <button
            className={mealType === 'dinner' ? 'active' : ''}
            onClick={() => setMealType('dinner')}
          >
            {lang === 'it' ? 'Cena' : lang === 'fr' ? 'Dîner' : 'Dinner'}
          </button>
        </div>

        <select className="dropdown" value={budget} onChange={(e) => setBudget(e.target.value)}>
          <option value="all">{lang === 'it' ? 'Budget' : lang === 'fr' ? 'Budget' : 'Budget'}</option>
          <option value="low">{lang === 'it' ? 'Basso' : lang === 'fr' ? 'Bas' : 'Low'}</option>
          <option value="medium">{lang === 'it' ? 'Medio' : lang === 'fr' ? 'Moyen' : 'Medium'}</option>
          <option value="high">{lang === 'it' ? 'Alto' : lang === 'fr' ? 'Élevé' : 'High'}</option>
        </select>

        <select className="dropdown" value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
          <option value="all">{lang === 'it' ? 'Difficoltà' : lang === 'fr' ? 'Difficulté' : 'Difficulty'}</option>
          <option value="easy">{lang === 'it' ? 'Facile' : lang === 'fr' ? 'Facile' : 'Easy'}</option>
          <option value="medium">{lang === 'it' ? 'Media' : lang === 'fr' ? 'Moyenne' : 'Medium'}</option>
          <option value="hard">{lang === 'it' ? 'Difficile' : lang === 'fr' ? 'Difficile' : 'Hard'}</option>
        </select>

        <select className="dropdown" value={diet} onChange={(e) => setDiet(e.target.value)}>
          <option value="all">{lang === 'it' ? 'Dieta' : lang === 'fr' ? 'Régime' : 'Diet'}</option>
          <option value="halal">Halal</option>
          <option value="vegan">Vegan</option>
          <option value="vegetarian">{lang === 'it' ? 'Vegetariano' : lang === 'fr' ? 'Végétarien' : 'Vegetarian'}</option>
          <option value="glutenfree">{lang === 'it' ? 'Senza glutine' : lang === 'fr' ? 'Sans gluten' : 'Gluten free'}</option>
          <option value="normal">{lang === 'it' ? 'Normale' : lang === 'fr' ? 'Normal' : 'Normal'}</option>
        </select>

        <select className="dropdown" value={culture} onChange={(e) => setCulture(e.target.value)}>
          <option value="all">{lang === 'it' ? 'Cultura' : lang === 'fr' ? 'Culture' : 'Culture'}</option>
          <option value="african">{lang === 'it' ? 'Africana' : lang === 'fr' ? 'Africaine' : 'African'}</option>
          <option value="european">{lang === 'it' ? 'Europea' : lang === 'fr' ? 'Européenne' : 'European'}</option>
          <option value="asian">{lang === 'it' ? 'Asiatica' : lang === 'fr' ? 'Asiatique' : 'Asian'}</option>
          <option value="american">{lang === 'it' ? 'Americana' : lang === 'fr' ? 'Américaine' : 'American'}</option>
          <option value="middleeast">{lang === 'it' ? 'Medio Oriente' : lang === 'fr' ? 'Moyen-Orient' : 'Middle East'}</option>
        </select>
      </div>

      <h2 style={{ marginTop: '20px' }}>
        {lang === 'it' ? 'Preferiti ❤️' : lang === 'fr' ? 'Favoris ❤️' : 'Favorites ❤️'}
      </h2>

      <div className="recipes">
        {favorites.length === 0 && (
          <p style={{ color: '#777' }}>
            {lang === 'it'
              ? 'Nessun preferito ancora.'
              : lang === 'fr'
              ? 'Aucun favori pour le moment.'
              : 'No favorites yet.'}
          </p>
        )}

        {favorites.map((recipe, index) => (
          <div key={index} className="recipe-card">
            <div className="fav-icon" onClick={() => toggleFavorite(recipe)}>
              ❤️
            </div>
            <h2>{recipe.name}</h2>
            <p><strong>
              {lang === 'it' ? 'Ingredienti:' : lang === 'fr' ? 'Ingrédients:' : 'Ingredients:'}
            </strong> {recipe.ingredients}</p>
            <p>{recipe.description}</p>
          </div>
        ))}
      </div>

      <h2 style={{ marginTop: '20px' }}>
        {lang === 'it' ? 'Ricette' : lang === 'fr' ? 'Recettes' : 'Recipes'}
      </h2>

      <div className="recipes">
        {filteredRecipes.map((recipe, index) => (
          <div key={index} className="recipe-card">
            <div className="fav-icon" onClick={() => toggleFavorite(recipe)}>
              {favorites.find((f) => f.name === recipe.name) ? '❤️' : '🤍'}
            </div>
            <h2>{recipe.name}</h2>
            <p><strong>
              {lang === 'it' ? 'Ingredienti:' : lang === 'fr' ? 'Ingrédients:' : 'Ingredients:'}
            </strong> {recipe.ingredients}</p>
            <p>{recipe.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
