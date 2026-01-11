import { useState } from "react";
import "./App.css";

/* ============================================================
   TRADUZIONI UI + MESSAGGI FINALI
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
   GENERATORE RICETTA — VERSIONE MIX (PROFESSIONALE + INTELLIGENTE)
============================================================ */
function generateRecipeText(list, filters, t, lang) {
  const ingredientsText = list.join(", ");

  const proteins = list.filter(i => /pollo|manzo|carne|tacchino|pesce|salmone|tonno/.test(i));
  const carbs = list.filter(i => /pasta|riso|patate|pane|couscous|quinoa/.test(i));
  const veggies = list.filter(i => /zucchina|carota|cipolla|pomodoro|insalata|spinaci|peperone/.test(i));
  const aromatics = list.filter(i => /aglio|cipolla|basilico|prezzemolo|rosmarino|origano/.test(i));

  const title = {
    it: `Ricetta con ${ingredientsText}`,
    en: `Recipe with ${ingredientsText}`,
    fr: `Recette avec ${ingredientsText}`,
    es: `Receta con ${ingredientsText}`
  }[lang];

  const intro = {
    it: `Una ricetta personalizzata basata sugli ingredienti che hai inserito. Preparazione bilanciata, professionale e ottimizzata.`,
    en: `A personalized recipe based on the ingredients you provided. Balanced, professional and optimized preparation.`,
    fr: `Une recette personnalisée basée sur les ingrédients que vous avez fournis. Préparation équilibrée, professionnelle et optimisée.`,
    es: `Una receta personalizada basada en los ingredientes que proporcionaste. Preparación equilibrada, profesional y optimizada.`
  }[lang];

  const steps = {
    it: `
1. Preparazione degli ingredienti
   - Lava e prepara: ${veggies.length ? veggies.join(", ") : "le verdure disponibili"}.
   - Taglia tutto in pezzi uniformi.
   ${aromatics.length ? `- Trita finemente: ${aromatics.join(", ")}.` : ""}

2. Cottura principale
   ${proteins.length ? `- Cuoci prima ${proteins.join(", ")} per 6–8 minuti a fuoco medio.` : ""}
   ${carbs.length ? `- Cuoci separatamente ${carbs.join(", ")} (8–12 minuti).` : ""}
   - Salta le verdure con un filo d’olio per 5 minuti.

3. Assemblaggio
   - Unisci tutto in padella e mescola con delicatezza.
   - Aggiungi sale, pepe e spezie secondo la cultura scelta.

4. Impiattamento professionale
   - Usa un piatto bianco per valorizzare i colori.
   - Aggiungi un tocco finale: erbe fresche o un filo d’olio.

${t.aiTip}

${t.finalMessage}
`,

    en: `
1. Ingredient preparation
   - Wash and prep: ${veggies.length ? veggies.join(", ") : "the available vegetables"}.
   - Cut everything into uniform pieces.
   ${aromatics.length ? `- Finely chop: ${aromatics.join(", ")}.` : ""}

2. Main cooking
   ${proteins.length ? `- Cook ${proteins.join(", ")} first for 6–8 minutes over medium heat.` : ""}
   ${carbs.length ? `- Cook ${carbs.join(", ")} separately (8–12 minutes).` : ""}
   - Sauté the vegetables with a drizzle of oil for 5 minutes.

3. Assembly
   - Combine everything in the pan and mix gently.
   - Add salt, pepper and spices according to the selected culture.

4. Professional plating
   - Use a white plate to enhance the colors.
   - Add a final touch: fresh herbs or a drizzle of olive oil.

${t.aiTip}

${t.finalMessage}
`,

    fr: `
1. Préparation des ingrédients
   - Lavez et préparez : ${veggies.length ? veggies.join(", ") : "les légumes disponibles"}.
   - Coupez tout en morceaux réguliers.
   ${aromatics.length ? `- Hachez finement : ${aromatics.join(", ")}.` : ""}

2. Cuisson principale
   ${proteins.length ? `- Faites cuire ${proteins.join(", ")} pendant 6–8 minutes.` : ""}
   ${carbs.length ? `- Faites cuire ${carbs.join(", ")} séparément (8–12 minutes).` : ""}
   - Faites revenir les légumes avec un filet d’huile pendant 5 minutes.

3. Assemblage
   - Mélangez le tout délicatement.
   - Ajoutez sel, poivre et épices selon la culture choisie.

4. Dressage professionnel
   - Utilisez une assiette blanche pour mettre en valeur les couleurs.
   - Ajoutez une touche finale : herbes fraîches ou filet d’huile.

${t.aiTip}

${t.finalMessage}
`,

    es: `
1. Preparación de los ingredientes
   - Lava y prepara: ${veggies.length ? veggies.join(", ") : "las verduras disponibles"}.
   - Corta todo en trozos uniformes.
   ${aromatics.length ? `- Pica finamente: ${aromatics.join(", ")}.` : ""}

2. Cocción principal
   ${proteins.length ? `- Cocina primero ${proteins.join(", ")} durante 6–8 minutos.` : ""}
   ${carbs.length ? `- Cocina ${carbs.join(", ")} por separado (8–12 minutos).` : ""}
   - Saltea las verduras con aceite durante 5 minutos.

3. Ensamblaje
   - Mezcla todo con suavidad.
   - Añade sal, pimienta y especias según la cultura seleccionada.

4. Emplatado profesional
   - Usa un plato blanco para resaltar los colores.
   - Añade un toque final: hierbas frescas o aceite.

${t.aiTip}

${t.finalMessage}
`
  };

  return `${title}\n\n${intro}\n${steps[lang]}`;
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
