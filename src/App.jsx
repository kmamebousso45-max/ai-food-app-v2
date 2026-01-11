import { useState } from "react";
import "./App.css";

/* ============================================================
   CLASSIFICAZIONE AUTOMATICA INGREDIENTI
============================================================ */
function classifyIngredients(list) {
  const washList = ["pomodoro","zucchina","carota","insalata","spinaci","peperone","cipolla","patata","melanzana","broccoli","cavolo"];
  const cookFirst = ["pollo","manzo","tacchino","maiale","carne","pesce","salmone","tonno fresco","gamberi"];
  const boilSeparately = ["pasta","riso","couscous","quinoa","spaghetti","penne","fusilli","tagliatelle"];
  const readyToUse = ["pane","formaggio","mozzarella","tonno","olive","prosciutto","salame","yogurt"];

  const toWash = [];
  const toCookFirst = [];
  const toBoil = [];
  const ready = [];
  const others = [];

  list.forEach(item => {
    if (washList.includes(item)) toWash.push(item);
    else if (cookFirst.includes(item)) toCookFirst.push(item);
    else if (boilSeparately.includes(item)) toBoil.push(item);
    else if (readyToUse.includes(item)) ready.push(item);
    else others.push(item);
  });

  return { toWash, toCookFirst, toBoil, ready, others };
}

/* ============================================================
   PROFILI CULTURALI
============================================================ */
function applyCulture(culture) {
  const profiles = {
    italiana: {
      base: "Usa olio extravergine, basilico fresco e cottura lenta.",
      spices: "origano, basilico, pepe nero",
      plating: "impiattamento pulito, minimalista, con filo d’olio a crudo"
    },
    africana: {
      base: "Usa spezie forti, cottura lunga e sapori intensi.",
      spices: "curcuma, curry, paprika, zenzero",
      plating: "porzioni abbondanti, colori vivaci"
    },
    asiatica: {
      base: "Cottura veloce nel wok, sapori bilanciati.",
      spices: "zenzero, salsa di soia, sesamo",
      plating: "impiattamento compatto, ordinato"
    },
    americana: {
      base: "Cotture ricche, burro, griglia e porzioni grandi.",
      spices: "paprika affumicata, pepe, BBQ rub",
      plating: "impiattamento rustico"
    },
    francese: {
      base: "Tecniche precise, burro, riduzioni e eleganza.",
      spices: "timo, rosmarino, pepe bianco",
      plating: "impiattamento raffinato"
    },
    spagnola: {
      base: "Soffritto, paprika, cotture lente e sapori intensi.",
      spices: "paprika dolce, aglio, prezzemolo",
      plating: "impiattamento conviviale"
    }
  };

  return profiles[culture] || {
    base: "Stile neutro e versatile.",
    spices: "sale, pepe, erbe miste",
    plating: "impiattamento semplice"
  };
}

/* ============================================================
   PROFILI DIFFICOLTÀ
============================================================ */
function applyDifficulty(level) {
  const profiles = {
    facile: "Tecniche semplici, pochi passaggi, zero complessità.",
    media: "Tecniche base + qualche passaggio più preciso.",
    difficile: "Tecniche professionali, tempi precisi, riduzioni e mantecature."
  };
  return profiles[level] || "Tecniche standard.";
}

/* ============================================================
   PROFILI BUDGET
============================================================ */
function applyBudget(budget) {
  const profiles = {
    basso: "Ingredienti economici, ricetta semplice e ottimizzata.",
    medio: "Ingredienti freschi e bilanciati.",
    alto: "Ingredienti premium, tecniche gourmet e impiattamento elegante."
  };
  return profiles[budget] || "Budget neutro.";
}

/* ============================================================
   PROFILI TIPO DI PASTO
============================================================ */
function applyMealType(type) {
  const profiles = {
    colazione: "Ricetta leggera e veloce, perfetta per iniziare la giornata.",
    pranzo: "Pasto completo e bilanciato.",
    cena: "Ricetta più leggera o elegante.",
    snack: "Preparazione rapida e semplice."
  };
  return profiles[type] || "Pasto generico.";
}

/* ============================================================
   MOTORE INTELLIGENTE DI RICETTE
============================================================ */
function generateSmartRecipe(list, filters) {
  const { toWash, toCookFirst, toBoil, ready, others } = classifyIngredients(list);
  const culture = applyCulture(filters.culture);
  const difficulty = applyDifficulty(filters.difficulty);
  const budget = applyBudget(filters.budget);
  const mealType = applyMealType(filters.mealType);

  let steps = "";

  steps += "1. **Preparazione degli ingredienti**\n";
  if (toWash.length) steps += `   - Lava e taglia: ${toWash.join(", ")}.\n`;
  if (others.length) steps += `   - Taglia a pezzi: ${others.join(", ")}.\n`;
  if (ready.length) steps += `   - Tieni da parte (pronti all’uso): ${ready.join(", ")}.\n`;
  if (toBoil.length) steps += `   - Prepara una pentola d’acqua salata per: ${toBoil.join(", ")}.\n`;

  steps += "\n2. **Preparazione del condimento**\n";
  steps += `   - ${culture.base}\n`;
  steps += "   - Scalda una padella con olio.\n";

  if (toCookFirst.length) steps += `   - Cuoci per primi: ${toCookFirst.join(", ")}.\n`;
  if (others.length) steps += `   - Aggiungi poi: ${others.join(", ")}.\n`;
  if (toWash.length) steps += `   - Aggiungi infine: ${toWash.join(", ")} e cuoci 5–7 minuti.\n`;

  if (toBoil.length) {
    steps += "\n3. **Cottura separata**\n";
    steps += `   - Cuoci ${toBoil.join(", ")} secondo i tempi indicati.\n`;
    steps += "   - Scola e tieni da parte.\n";
  }

  if (toBoil.length) {
    steps += "\n4. **Unione**\n";
    steps += `   - Unisci ${toBoil.join(", ")} al condimento.\n`;
    steps += "   - Mescola bene.\n";
  }

  steps += "\n5. **Finalizzazione**\n";
  steps += `   - ${difficulty}\n`;
  steps += `   - Aggiungi spezie tipiche: ${culture.spices}.\n`;

  steps += "\n6. **Impiattamento**\n";
  steps += `   - ${culture.plating}.\n`;
  if (ready.includes("pane")) steps += "   - Servi il pane a lato.\n";

  steps += "\n7. **Valori nutrizionali (stima)**\n";
  steps += "   - Porzioni: 1–2\n";
  steps += "   - Calorie: 350–650 kcal\n";

  return steps;
}

/* ============================================================
   COMPONENTE PRINCIPALE
============================================================ */
function App() {
  const [ingredients, setIngredients] = useState("");
  const [recipe, setRecipe] = useState("");

  const [budget, setBudget] = useState("");
  const [time, setTime] = useState("");
  const [mealType, setMealType] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [diet, setDiet] = useState("");
  const [language, setLanguage] = useState("it");
  const [culture, setCulture] = useState("");

  function generateRecipe() {
    const list = ingredients
      .split(/[\s,;]+/)
      .map(i => i.trim().toLowerCase())
      .filter(i => i.length > 0);

    const filters = { budget, time, mealType, difficulty, diet, culture };
    const steps = generateSmartRecipe(list, filters);

    const finalRecipe = `
🍽️ Ricetta personalizzata

Ingredienti:
${list.map(i => "• " + i).join("\n")}

Dettagli selezionati:
• Budget: ${budget || "non specificato"}
• Tempo: ${time || "non specificato"}
• Tipo di pasto: ${mealType || "non specificato"}
• Difficoltà: ${difficulty || "non specificata"}
• Dieta: ${diet || "non specificata"}
• Cultura: ${culture || "non specificata"}
• Lingua: ${language}

────────────────────────────

${steps}
`;

    setRecipe(finalRecipe);
  }

  return (
    <div className="container">
      <header>
        <h1 className="title">AI Food App</h1>
        <p className="subtitle">La cucina intelligente che capisce davvero cosa stai cucinando</p>
      </header>

      {/* LINGUA & CULTURA */}
      <section className="filters">
        <h2>Lingua & Cultura</h2>
        <div className="filter-grid">
          <select value={language} onChange={(e) => setLanguage(e.target.value)}>
            <option value="it">Italiano</option>
            <option value="en">Inglese</option>
            <option value="fr">Francese</option>
            <option value="es">Spagnolo</option>
          </select>

          <select value={culture} onChange={(e) => setCulture(e.target.value)}>
            <option value="">Cultura</option>
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
        <h2>Filtri</h2>
        <div className="filter-grid">
          <select value={budget} onChange={(e) => setBudget(e.target.value)}>
            <option value="">Budget</option>
            <option value="basso">Basso</option>
            <option value="medio">Medio</option>
            <option value="alto">Alto</option>
          </select>

          <select value={time} onChange={(e) => setTime(e.target.value)}>
            <option value="">Tempo</option>
            <option value="10 min">10 min</option>
            <option value="20 min">20 min</option>
            <option value="30 min">30 min</option>
            <option value="1 ora">1 ora</option>
          </select>

          <select value={mealType} onChange={(e) => setMealType(e.target.value)}>
            <option value="">Tipo di pasto</option>
            <option value="colazione">Colazione</option>
            <option value="pranzo">Pranzo</option>
            <option value="cena">Cena</option>
            <option value="snack">Snack</option>
          </select>

          <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
            <option value="">Difficoltà</option>
            <option value="facile">Facile</option>
            <option value="media">Media</option>
            <option value="difficile">Difficile</option>
          </select>

          <select value={diet} onChange={(e) => setDiet(e.target.value)}>
            <option value="">Dieta</option>
            <option value="vegano">Vegano</option>
            <option value="vegetariano">Vegetariano</option>
            <option value="halal">Halal</option>
            <option value="senza glutine">Senza glutine</option>
          </select>
        </div>
      </section>

      {/* GENERATORE */}
      <section className="generator">
        <h2>Genera una ricetta</h2>

        <input
          type="text"
          placeholder="Inserisci gli ingredienti"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          className="input"
        />

        <button onClick={generateRecipe} className="btn">
          Genera ricetta
        </button>

        {recipe && (
          <div className="result">
            <h3>Ricetta generata:</h3>

            {/* FIX DEFINITIVO TESTO INVISIBILE */}
            <pre
              style={{
                whiteSpace: "pre-wrap",
                color: "#ffffff",
                WebkitTextFillColor: "#ffffff",
                background: "transparent"
              }}
            >
              {recipe}
            </pre>
          </div>
        )}
      </section>
    </div>
  );
}

export default App;
