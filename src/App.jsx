import { useState } from "react";
import "./App.css";

/* ============================================================
   TRADUZIONI UI + RICETTE PROFESSIONALI
============================================================ */
const translations = {
  it: {
    title: "AI Food App",
    subtitle: "La cucina intelligente che capisce davvero cosa stai cucinando",
    langCulture: "Lingua & Cultura",
    filters: "Filtri",
    generate: "Genera ricetta",
    newRecipe: "Nuova ricetta",
    copy: "Copia ricetta",
    ingredientsPlaceholder: "Inserisci gli ingredienti",
    mealType: "Tipo di pasto",
    difficulty: "Difficoltà",
    budget: "Budget",
    time: "Tempo",
    diet: "Dieta",
    culture: "Cultura",
    resultTitle: "Ricetta generata:",
    finalMessage: "Buon appetito!",
    aiTip: "Consiglio dello chef: aggiungi un filo d’olio a crudo per esaltare i sapori."
  },
  en: {
    title: "AI Food App",
    subtitle: "The smart kitchen that truly understands what you're cooking",
    langCulture: "Language & Culture",
    filters: "Filters",
    generate: "Generate recipe",
    newRecipe: "New recipe",
    copy: "Copy recipe",
    ingredientsPlaceholder: "Enter ingredients",
    mealType: "Meal type",
    difficulty: "Difficulty",
    budget: "Budget",
    time: "Time",
    diet: "Diet",
    culture: "Culture",
    resultTitle: "Generated recipe:",
    finalMessage: "Enjoy your meal!",
    aiTip: "Chef’s tip: add a drizzle of olive oil at the end to enhance the flavors."
  },
  fr: {
    title: "AI Food App",
    subtitle: "La cuisine intelligente qui comprend vraiment ce que vous cuisinez",
    langCulture: "Langue & Culture",
    filters: "Filtres",
    generate: "Générer la recette",
    newRecipe: "Nouvelle recette",
    copy: "Copier la recette",
    ingredientsPlaceholder: "Entrez les ingrédients",
    mealType: "Type de repas",
    difficulty: "Difficulté",
    budget: "Budget",
    time: "Temps",
    diet: "Régime",
    culture: "Culture",
    resultTitle: "Recette générée :",
    finalMessage: "Bon appétit !",
    aiTip: "Astuce du chef : ajoutez un filet d’huile d’olive pour sublimer les saveurs."
  },
  es: {
    title: "AI Food App",
    subtitle: "La cocina inteligente que realmente entiende lo que cocinas",
    langCulture: "Idioma y Cultura",
    filters: "Filtros",
    generate: "Generar receta",
    newRecipe: "Nueva receta",
    copy: "Copiar receta",
    ingredientsPlaceholder: "Ingresa los ingredientes",
    mealType: "Tipo de comida",
    difficulty: "Dificultad",
    budget: "Presupuesto",
    time: "Tiempo",
    diet: "Dieta",
    culture: "Cultura",
    resultTitle: "Receta generada:",
    finalMessage: "¡Buen provecho!",
    aiTip: "Consejo del chef: añade un chorrito de aceite de oliva al final para realzar los sabores."
  }
};

/* ============================================================
   EMOJI DEL PIATTO
============================================================ */
function getDishEmoji(ingredients) {
  const text = ingredients.join(" ");

  if (/pasta|spaghetti|penne|fusilli/.test(text)) return "🍝";
  if (/pollo|manzo|carne|tacchino/.test(text)) return "🍗";
  if (/pesce|salmone|tonno/.test(text)) return "🐟";
  if (/verdura|insalata|zucchina|carota/.test(text)) return "🥗";
  if (/dolce|zucchero|cioccolato/.test(text)) return "🍰";

  return "🍽️";
}

/* ============================================================
   GENERATORE DI RICETTE MULTILINGUA
============================================================ */
function generateRecipeText(list, filters, t, lang) {
  const steps = {
    it: `
1. Preparazione degli ingredienti
   - Lava e prepara: ${list.join(", ")}.

2. Cottura
   - Scalda una padella e cuoci gli ingredienti con calma.
   - Aggiungi spezie e aromi secondo la cultura scelta.

3. Finalizzazione
   - Mescola tutto con cura.
   - Assaggia e regola sale e spezie.

4. Impiattamento
   - Servi con stile e un tocco personale.

${t.aiTip}

${t.finalMessage}
`,

    en: `
1. Ingredient preparation
   - Wash and prepare: ${list.join(", ")}.

2. Cooking
   - Heat a pan and cook the ingredients gently.
   - Add spices and seasonings according to the selected culture.

3. Final touch
   - Combine everything smoothly.
   - Taste and adjust salt and spices.

4. Plating
   - Serve with elegance and a personal touch.

${t.aiTip}

${t.finalMessage}
`,

    fr: `
1. Préparation des ingrédients
   - Lavez et préparez : ${list.join(", ")}.

2. Cuisson
   - Chauffez une poêle et faites cuire les ingrédients doucement.
   - Ajoutez des épices selon la culture choisie.

3. Finition
   - Mélangez le tout délicatement.
   - Goûtez et ajustez le sel et les épices.

4. Dressage
   - Servez avec élégance et une touche personnelle.

${t.aiTip}

${t.finalMessage}
`,

    es: `
1. Preparación de los ingredientes
   - Lava y prepara: ${list.join(", ")}.

2. Cocción
   - Calienta una sartén y cocina los ingredientes suavemente.
   - Añade especias según la cultura seleccionada.

3. Finalización
   - Mezcla todo con cuidado.
   - Prueba y ajusta la sal y las especias.

4. Emplatado
   - Sirve con estilo y un toque personal.

${t.aiTip}

${t.finalMessage}
`
  };

  return steps[lang];
}

/* ============================================================
   COMPONENTE PRINCIPALE
============================================================ */
export default function App() {
  const [ingredients, setIngredients] = useState("");
  const [recipe, setRecipe] = useState("");
  const [loading, setLoading] = useState(false);

  const [budget, setBudget] = useState("");
  const [time, setTime] = useState("");
  const [mealType, setMealType] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [diet, setDiet] = useState("");
  const [language, setLanguage] = useState("it");
  const [culture, setCulture] = useState("");

  const t = translations[language];

  function generateRecipe() {
    const list = ingredients
      .split(/[\s,;]+/)
      .map(i => i.trim())
      .filter(i => i.length > 0);

    if (list.length === 0) return;

    setLoading(true);

    setTimeout(() => {
      const emoji = getDishEmoji(list);
      const text = generateRecipeText(list, {}, t, language);

      setRecipe(`${emoji} ${t.resultTitle}\n\n${text}`);
      setLoading(false);
    }, 1200);
  }

  function copyRecipe() {
    navigator.clipboard.writeText(recipe);
  }

  function resetAll() {
    setIngredients("");
    setRecipe("");
  }

  return (
    <div className="container">
      <header>
        <h1 className="title">{t.title}</h1>
        <p className="subtitle">{t.subtitle}</p>
      </header>

      {/* LINGUA & CULTURA */}
      <section className="filters">
        <h2>{t.langCulture}</h2>
        <div className="filter-grid">
          <select value={language} onChange={(e) => setLanguage(e.target.value)}>
            <option value="it">Italiano</option>
            <option value="en">English</option>
            <option value="fr">Français</option>
            <option value="es">Español</option>
          </select>

          <select value={culture} onChange={(e) => setCulture(e.target.value)}>
            <option value="">{t.culture}</option>
            <option value="italiana">Italiana</option>
            <option value="africana">Africana</option>
            <option value="asiatica">Asiatica</option>
            <option value="americana">Americana</option>
            <option value="francese">Francese</option>
            <option value="spagnola">Spagnola</option>
          </select>
        </div>
      </section>

      {/* FILTRI */}
      <section className="filters">
        <h2>{t.filters}</h2>
        <div className="filter-grid">
          <select value={budget} onChange={(e) => setBudget(e.target.value)}>
            <option value="">{t.budget}</option>
            <option value="basso">Basso</option>
            <option value="medio">Medio</option>
            <option value="alto">Alto</option>
          </select>

          <select value={time} onChange={(e) => setTime(e.target.value)}>
            <option value="">{t.time}</option>
            <option value="10 min">10 min</option>
            <option value="20 min">20 min</option>
            <option value="30 min">30 min</option>
            <option value="1 ora">1 ora</option>
          </select>

          <select value={mealType} onChange={(e) => setMealType(e.target.value)}>
            <option value="">{t.mealType}</option>
            <option value="colazione">Colazione</option>
            <option value="pranzo">Pranzo</option>
            <option value="cena">Cena</option>
            <option value="snack">Snack</option>
          </select>

          <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
            <option value="">{t.difficulty}</option>
            <option value="facile">Facile</option>
            <option value="media">Media</option>
            <option value="difficile">Difficile</option>
          </select>

          <select value={diet} onChange={(e) => setDiet(e.target.value)}>
            <option value="">{t.diet}</option>
            <option value="vegano">Vegano</option>
            <option value="vegetariano">Vegetariano</option>
            <option value="halal">Halal</option>
            <option value="senza glutine">Senza glutine</option>
          </select>
        </div>
      </section>

      {/* GENERATORE */}
      <section className="generator">
        <h2>{t.generate}</h2>

        <input
          type="text"
          placeholder={t.ingredientsPlaceholder}
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          className="input"
        />

        <button onClick={generateRecipe} className="btn">
          {t.generate}
        </button>

        {loading && (
          <div className="loader">⏳</div>
        )}

        {recipe && (
          <div className="result">
            <pre className="recipe-output">{recipe}</pre>

            <div className="actions">
              <button className="btn" onClick={copyRecipe}>{t.copy}</button>
              <button className="btn" onClick={resetAll}>{t.newRecipe}</button>
            </div>
          </div>
        )}
      </section>

      <footer className="footer">
        Made with ❤️ by Mame
      </footer>
    </div>
  );
}
