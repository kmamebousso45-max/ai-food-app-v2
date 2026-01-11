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
   ANALISI INGREDIENTI + EMOJI DEL PIATTO
============================================================ */

// Emoji in base agli ingredienti principali
function getDishEmoji(ingredients) {
  const text = ingredients.join(" ").toLowerCase();

  if (/pasta|spaghetti|penne|fusilli/.test(text)) return "🍝";
  if (/pollo|manzo|carne|tacchino/.test(text)) return "🍗";
  if (/pesce|salmone|tonno|merluzzo/.test(text)) return "🐟";
  if (/verdura|insalata|zucchina|carota|spinaci|peperone/.test(text)) return "🥗";
  if (/dolce|zucchero|cioccolato|torta/.test(text)) return "🍰";

  return "🍽️";
}

// Analisi intelligente degli ingredienti
function analyzeIngredients(list) {
  const lower = list.map(i => i.toLowerCase());

  return {
    proteins: lower.filter(i => /pollo|manzo|carne|tacchino|pesce|salmone|tonno/.test(i)),
    carbs: lower.filter(i => /pasta|riso|patate|pane|couscous|quinoa/.test(i)),
    veggies: lower.filter(i => /zucchina|carota|cipolla|pomodoro|insalata|spinaci|peperone/.test(i)),
    aromatics: lower.filter(i => /aglio|cipolla|basilico|prezzemolo|rosmarino|origano|zenzero/.test(i)),
    fats: lower.filter(i => /olio|burro|panna/.test(i)),
    spices: lower.filter(i => /pepe|paprika|curcuma|curry|peperoncino/.test(i))
  };
}
/* ============================================================
   GENERATORE RICETTA — VERSIONE ULTRA PRO PREMIUM
============================================================ */

function generateUltraRecipe(list, filters, t, lang) {
  const ing = analyzeIngredients(list);
  const ingredientsText = list.join(", ");

  /* ------------------------------------------------------------
     1. TITOLO CREATIVO AUTOMATICO
  ------------------------------------------------------------ */
  const creativeTitle = {
    it: `Padellata di ${ingredientsText} in stile ${filters.culture || "fusion"}`,
    en: `${ingredientsText} Fusion Skillet`,
    fr: `Poêlée de ${ingredientsText} façon ${filters.culture || "fusion"}`,
    es: `Salteado de ${ingredientsText} estilo ${filters.culture || "fusión"}`
  }[lang];

  /* ------------------------------------------------------------
     2. DESCRIZIONE DEL PIATTO
  ------------------------------------------------------------ */
  const description = {
    it: `Un piatto equilibrato, moderno e ottimizzato, creato analizzando automaticamente gli ingredienti che hai inserito.`,
    en: `A balanced, modern and optimized dish, automatically generated from your ingredients.`,
    fr: `Un plat équilibré, moderne et optimisé, généré automatiquement à partir de vos ingrédients.`,
    es: `Un plato equilibrado, moderno y optimizado, generado automáticamente a partir de tus ingredientes.`
  }[lang];

  /* ------------------------------------------------------------
     3. UTENSILI NECESSARI
  ------------------------------------------------------------ */
  const tools = {
    it: `- Padella antiaderente\n- Pentola per eventuali carboidrati\n- Tagliere\n- Coltello affilato\n- Cucchiaio di legno`,
    en: `- Non-stick pan\n- Pot for carbs\n- Cutting board\n- Sharp knife\n- Wooden spoon`,
    fr: `- Poêle antiadhésive\n- Casserole pour les féculents\n- Planche à découper\n- Couteau bien aiguisé\n- Cuillère en bois`,
    es: `- Sartén antiadherente\n- Olla para carbohidratos\n- Tabla de cortar\n- Cuchillo afilado\n- Cuchara de madera`
  }[lang];

  /* ------------------------------------------------------------
     4. TEMPI E PORZIONI
  ------------------------------------------------------------ */
  const info = {
    it: `Tempo totale: 20–30 min\nPorzioni: 2`,
    en: `Total time: 20–30 min\nServings: 2`,
    fr: `Temps total : 20–30 min\nPortions : 2`,
    es: `Tiempo total: 20–30 min\nPorciones: 2`
  }[lang];

  /* ------------------------------------------------------------
     5. PREPARAZIONE INTELLIGENTE
  ------------------------------------------------------------ */
  const prep = {
    it: `
1. Preparazione degli ingredienti
   - Lava e prepara: ${ing.veggies.length ? ing.veggies.join(", ") : "le verdure disponibili"}.
   - Taglia tutto in pezzi uniformi.
   ${ing.aromatics.length ? `- Trita finemente: ${ing.aromatics.join(", ")}.` : ""}
`,
    en: `
1. Ingredient preparation
   - Wash and prep: ${ing.veggies.length ? ing.veggies.join(", ") : "the available vegetables"}.
   - Cut everything into uniform pieces.
   ${ing.aromatics.length ? `- Finely chop: ${ing.aromatics.join(", ")}.` : ""}
`,
    fr: `
1. Préparation des ingrédients
   - Lavez et préparez : ${ing.veggies.length ? ing.veggies.join(", ") : "les légumes disponibles"}.
   - Coupez tout en morceaux réguliers.
   ${ing.aromatics.length ? `- Hachez finement : ${ing.aromatics.join(", ")}.` : ""}
`,
    es: `
1. Preparación de los ingredientes
   - Lava y prepara: ${ing.veggies.length ? ing.veggies.join(", ") : "las verduras disponibles"}.
   - Corta todo en trozos uniformes.
   ${ing.aromatics.length ? `- Pica finamente: ${ing.aromatics.join(", ")}.` : ""}
`
  }[lang];

  /* ------------------------------------------------------------
     6. COTTURA PROFESSIONALE
  ------------------------------------------------------------ */
  const cooking = {
    it: `
2. Cottura professionale
   ${ing.proteins.length ? `- Cuoci prima ${ing.proteins.join(", ")} per 6–8 minuti a fuoco medio.` : ""}
   ${ing.carbs.length ? `- Cuoci separatamente ${ing.carbs.join(", ")} (8–12 minuti).` : ""}
   - Salta le verdure con un filo d’olio per 5 minuti.
   - Aggiungi spezie: ${ing.spices.length ? ing.spices.join(", ") : "a piacere"}.
`,
    en: `
2. Professional cooking
   ${ing.proteins.length ? `- Cook ${ing.proteins.join(", ")} first for 6–8 minutes over medium heat.` : ""}
   ${ing.carbs.length ? `- Cook ${ing.carbs.join(", ")} separately (8–12 minutes).` : ""}
   - Sauté the vegetables with a drizzle of oil for 5 minutes.
   - Add spices: ${ing.spices.length ? ing.spices.join(", ") : "to taste"}.
`,
    fr: `
2. Cuisson professionnelle
   ${ing.proteins.length ? `- Faites cuire ${ing.proteins.join(", ")} pendant 6–8 minutes.` : ""}
   ${ing.carbs.length ? `- Faites cuire ${ing.carbs.join(", ")} séparément (8–12 minutes).` : ""}
   - Faites revenir les légumes avec un filet d’huile pendant 5 minutes.
   - Ajoutez des épices : ${ing.spices.length ? ing.spices.join(", ") : "à votre goût"}.
`,
    es: `
2. Cocción profesional
   ${ing.proteins.length ? `- Cocina ${ing.proteins.join(", ")} durante 6–8 minutos.` : ""}
   ${ing.carbs.length ? `- Cocina ${ing.carbs.join(", ")} por separado (8–12 minutos).` : ""}
   - Saltea las verduras con aceite durante 5 minutos.
   - Añade especias: ${ing.spices.length ? ing.spices.join(", ") : "al gusto"}.
`
  }[lang];

  /* ------------------------------------------------------------
     7. ASSEMBLAGGIO
  ------------------------------------------------------------ */
  const assembly = {
    it: `
3. Assemblaggio
   - Unisci tutto in padella e mescola con delicatezza.
   - Regola sale, pepe e intensità delle spezie.
`,
    en: `
3. Assembly
   - Combine everything in the pan and mix gently.
   - Adjust salt, pepper and spice intensity.
`,
    fr: `
3. Assemblage
   - Mélangez tout dans la poêle avec délicatesse.
   - Ajustez sel, poivre et intensité des épices.
`,
    es: `
3. Ensamblaje
   - Mezcla todo con suavidad en la sartén.
   - Ajusta sal, pimienta e intensidad de las especias.
`
  }[lang];

  /* ------------------------------------------------------------
     8. IMPIATTAMENTO PREMIUM
  ------------------------------------------------------------ */
  const plating = {
    it: `
4. Impiattamento premium
   - Usa un piatto bianco per valorizzare i colori.
   - Aggiungi erbe fresche o un filo d’olio finale.
`,
    en: `
4. Premium plating
   - Use a white plate to enhance the colors.
   - Add fresh herbs or a final drizzle of oil.
`,
    fr: `
4. Dressage premium
   - Utilisez une assiette blanche pour mettre en valeur les couleurs.
   - Ajoutez des herbes fraîches ou un filet d’huile.
`,
    es: `
4. Emplatado premium
   - Usa un plato blanco para resaltar los colores.
   - Añade hierbas frescas o un chorrito de aceite.
`
  }[lang];

  /* ------------------------------------------------------------
     9. VARIANTI CULTURALI
  ------------------------------------------------------------ */
  const variants = {
    it: `
5. Varianti culturali
   - Italiana: aggiungi basilico e un cucchiaio di parmigiano.
   - Africana: aggiungi curry, paprika e un tocco di zenzero.
   - Asiatica: salsa di soia, sesamo e zenzero.
   - Americana: aggiungi paprika affumicata.
`,
    en: `
5. Cultural variations
   - Italian: basil and parmesan.
   - African: curry, paprika, ginger.
   - Asian: soy sauce, sesame, ginger.
   - American: smoked paprika.
`,
    fr: `
5. Variantes culturelles
   - Italienne : basilic et parmesan.
   - Africaine : curry, paprika, gingembre.
   - Asiatique : sauce soja, sésame, gingembre.
   - Américaine : paprika fumé.
`,
    es: `
5. Variantes culturales
   - Italiana: albahaca y parmesano.
   - Africana: curry, paprika, jengibre.
   - Asiática: salsa de soja, sésamo, jengibre.
   - Americana: pimentón ahumado.
`
  }[lang];

  /* ------------------------------------------------------------
     10. ERRORI COMUNI
  ------------------------------------------------------------ */
  const mistakes = {
    it: `
6. Errori comuni da evitare
   - Cuocere tutto insieme senza ordine.
   - Tagliare gli ingredienti in dimensioni diverse.
   - Aggiungere le spezie troppo tardi.
`,
    en: `
6. Common mistakes to avoid
   - Cooking everything together without order.
   - Cutting ingredients unevenly.
   - Adding spices too late.
`,
    fr: `
6. Erreurs courantes à éviter
   - Tout cuire en même temps sans ordre.
   - Couper les ingrédients de manière irrégulière.
   - Ajouter les épices trop tard.
`,
    es: `
6. Errores comunes a evitar
   - Cocinar todo junto sin orden.
   - Cortar los ingredientes de forma desigual.
   - Añadir las especias demasiado tarde.
`
  }[lang];

  /* ------------------------------------------------------------
     11. VALORI NUTRIZIONALI (STIMATI)
  ------------------------------------------------------------ */
  const nutrition = {
    it: `Calorie: ~450–550 kcal\nProteine: alte\nCarboidrati: medi\nGrassi: moderati`,
    en: `Calories: ~450–550 kcal\nProtein: high\nCarbs: medium\nFat: moderate`,
    fr: `Calories : ~450–550 kcal\nProtéines : élevées\nGlucides : moyens\nLipides : modérés`,
    es: `Calorías: ~450–550 kcal\nProteínas: altas\nCarbohidratos: medios\nGrasas: moderadas`
  }[lang];

  /* ------------------------------------------------------------
     OUTPUT FINALE
  ------------------------------------------------------------ */
  return `
${creativeTitle}

${description}

${info}

Utensili necessari:
${tools}

${prep}
${cooking}
${assembly}
${plating}
${variants}
${mistakes}

Valori nutrizionali:
${nutrition}

${t.aiTip}

${t.finalMessage}
`;
}
/* ============================================================
   COMPONENTE PRINCIPALE — APP COMPLETA
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

      const filters = {
        budget,
        time,
        mealType,
        difficulty,
        diet,
        culture
      };

      const text = generateUltraRecipe(list, filters, t, language);

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
