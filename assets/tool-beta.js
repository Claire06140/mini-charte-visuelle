(function () {
  "use strict";

  const analytics = window.BoussoleAnalytics || { capture: () => false };
  const entry = window.BOUSSOLE_ENTRY || { mode: "free", source: "direct" };
  const variants = { a: null, b: null };
  const categoryEvents = new Set();
  let diagnosticContext = null;
  let feedbackShown = false;

  const escapeHtml = (value) => String(value ?? "").replace(/[&<>'"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[char]));
  const presetById = (id) => presets.find((item) => item.id === id) || presets[0];
  const fontById = (id) => fontPairs.find((item) => item.id === id) || fontPairs[0];

  function takeSnapshot() {
    return {
      preset: state.preset, view: state.view, fontPair: state.fontPair, palette: state.palette,
      visualStyle: state.visualStyle, imageStyle: state.imageStyle,
      brand: fields.brandName.value.slice(0, 80), words: fields.perceptionWords.value.slice(0, 120),
      headline: fields.headline.value.slice(0, 160), body: fields.bodyText.value.slice(0, 400),
      cta: fields.ctaText.value.slice(0, 80), colors: currentColors().slice(0, 5)
    };
  }

  function snapshotFromPreset(id) {
    const preset = presetById(id);
    const linked = colorPalettes.find((palette) => palette.colors.join() === preset.colors.join());
    return {
      preset: preset.id, view: state.view, fontPair: preset.fontPair, palette: linked?.id || "",
      visualStyle: preset.visualStyle || preset.imageStyle, imageStyle: preset.imageStyle,
      brand: fields.brandName.value.slice(0, 80), words: preset.words, headline: preset.headline,
      body: preset.body, cta: fields.ctaText.value.slice(0, 80), colors: [...preset.colors]
    };
  }

  function applySnapshot(snapshot, origin) {
    if (!snapshot) return;
    state.preset = snapshot.preset;
    state.view = ["site", "post", "offer"].includes(snapshot.view) ? snapshot.view : "site";
    state.fontPair = snapshot.fontPair;
    state.palette = snapshot.palette;
    state.visualStyle = snapshot.visualStyle;
    state.imageStyle = snapshot.imageStyle;
    fields.brandName.value = snapshot.brand;
    fields.perceptionWords.value = snapshot.words;
    fields.headline.value = snapshot.headline;
    fields.bodyText.value = snapshot.body;
    fields.ctaText.value = snapshot.cta;
    setColorFields(snapshot.colors);
    update();
    analytics.capture("preset_selected", { preset: snapshot.preset, origin });
  }

  function openModal(modal) {
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    window.setTimeout(() => modal.querySelector("button, input")?.focus(), 0);
  }

  function closeModal(modal) {
    modal.hidden = true;
    document.body.style.overflow = "";
  }

  function captureCategory(category) {
    if (categoryEvents.has(category)) return;
    categoryEvents.add(category);
    analytics.capture("category_changed", { category });
  }

  function renderDiagnostic() {
    const modal = document.querySelector("#diagnosticModal");
    const questions = [
      { name: "perception", legend: "Quelle impression doit dominer ?", className: "perceptions", options: [["rassurant","Rassurante"],["expert","Experte"],["creatif","Créative"],["premium","Premium"],["accessible","Accessible"],["energique","Énergique"],["minimal","Minimale"],["artisanal","Artisanale"]] },
      { name: "relation", legend: "Quelle relation voulez-vous créer ?", options: [["reassure","Rassurer et accompagner"],["prove","Structurer et prouver"],["inspire","Inspirer et se différencier"],["elevate","Valoriser et élever"],["activate","Mobiliser et faire agir"]] },
      { name: "energy", legend: "Quel niveau d’énergie vous ressemble ?", options: [["calm","Calme et posé"],["balanced","Équilibré et maîtrisé"],["dynamic","Dynamique et vivant"]] },
      { name: "avoid", legend: "Quelle contre-image voulez-vous éviter ?", options: [["cold","Froide ou impersonnelle"],["generic","Générique ou interchangeable"],["amateur","Amateur ou bricolée"],["elitist","Élitiste ou distante"],["loud","Agressive ou bruyante"],["dated","Datée ou trop traditionnelle"]] }
    ];
    modal.innerHTML = `<div class="modal-panel">
      <p class="modal-kicker">Diagnostic facultatif</p>
      <h2 id="diagnosticTitle">Quel cap pour votre image ?</h2>
      <p class="modal-intro">Quatre choix suffisent pour faire émerger deux pistes. Ce sont des hypothèses à comparer, jamais un verdict.</p>
      <div class="diagnostic-progress" aria-hidden="true">${questions.map((_, i) => `<span class="${i === 0 ? "is-active" : ""}"></span>`).join("")}</div>
      <form id="diagnosticForm">
        ${questions.map((question, index) => `<fieldset class="diagnostic-step" data-step="${index}" ${index ? "hidden" : ""}>
          <legend>${question.legend}</legend><div class="choice-grid ${question.className || ""}">
          ${question.options.map(([value,label]) => `<label class="choice"><input type="radio" name="${question.name}" value="${value}"><span>${label}</span></label>`).join("")}
          </div></fieldset>`).join("")}
        <p class="diagnostic-error" role="status"></p>
        <div class="modal-actions"><button class="command" id="skipDiagnostic" type="button">Explorer sans diagnostic</button>
          <div class="right-actions"><button class="command" id="previousDiagnostic" type="button" hidden>Retour</button><button class="command primary" id="nextDiagnostic" type="button">Continuer</button></div>
        </div>
      </form>
    </div>`;

    let step = 0;
    const form = modal.querySelector("#diagnosticForm");
    const error = modal.querySelector(".diagnostic-error");
    const showStep = () => {
      modal.querySelectorAll("[data-step]").forEach((node, index) => { node.hidden = index !== step; });
      modal.querySelectorAll(".diagnostic-progress span").forEach((node, index) => node.classList.toggle("is-active", index <= step));
      modal.querySelector("#previousDiagnostic").hidden = step === 0;
      modal.querySelector("#nextDiagnostic").textContent = step === questions.length - 1 ? "Voir mes deux pistes" : "Continuer";
      error.textContent = "";
    };

    modal.querySelector("#previousDiagnostic").addEventListener("click", () => { step = Math.max(0, step - 1); showStep(); });
    modal.querySelector("#skipDiagnostic").addEventListener("click", () => {
      analytics.capture("diagnostic_skipped");
      closeModal(modal);
      showContextQuestion();
    });
    modal.querySelector("#nextDiagnostic").addEventListener("click", () => {
      const current = questions[step];
      if (!form.elements[current.name].value) { error.textContent = "Choisissez une option, ou explorez librement."; return; }
      if (step < questions.length - 1) { step += 1; showStep(); return; }
      const data = new FormData(form);
      const answers = Object.fromEntries(data.entries());
      showDiagnosticResults(modal, answers);
    });
  }

  function showDiagnosticResults(modal, answers) {
    const ranked = window.BoussoleDiagnostic.score(answers);
    const top = ranked.slice(0, 2);
    diagnosticContext = { answers, top: top.map((item) => item.id) };
    variants.a = snapshotFromPreset(top[0].id);
    variants.b = snapshotFromPreset(top[1].id);
    updateVariantButtons();
    analytics.capture("diagnostic_completed");
    const panel = modal.querySelector(".modal-panel");
    panel.innerHTML = `<p class="modal-kicker">Deux hypothèses à tester</p><h2 id="diagnosticTitle">Vos deux directions de départ</h2>
      <p class="modal-intro">Comparez-les avec votre vrai message. Vous pourrez modifier chaque signal et changer d’avis.</p>
      <div class="result-grid">${top.map((item, index) => {
        const preset = presetById(item.id); const pair = fontById(preset.fontPair);
        return `<article class="direction-result" style="--result-title:'${escapeHtml(pair.title)}'"><span class="rank">Piste ${index + 1}</span><h3>${escapeHtml(preset.label)}</h3><p>${escapeHtml(preset.words)}</p>
          <div class="result-swatches">${preset.colors.map((color) => `<span style="background:${color}"></span>`).join("")}</div>
          <button class="command ${index === 0 ? "primary" : ""}" type="button" data-start-direction="${preset.id}" data-variant="${index ? "b" : "a"}">Commencer avec ${escapeHtml(preset.label)}</button></article>`;
      }).join("")}</div>
      <p class="hypothesis">Ces pistes traduisent vos réponses en signaux visibles. Elles servent à décider et à tester, pas à définir une vérité objective sur votre marque.</p>
      <div class="modal-actions"><button class="command" id="closeDiagnosticResults" type="button">Fermer et comparer plus tard</button></div>`;
    panel.querySelectorAll("[data-start-direction]").forEach((button) => button.addEventListener("click", () => {
      applySnapshot(variants[button.dataset.variant], "diagnostic"); closeModal(modal); showToast(`Direction ${presetById(button.dataset.startDirection).label} appliquée.`);
    }));
    panel.querySelector("#closeDiagnosticResults").addEventListener("click", () => closeModal(modal));
  }

  function updateVariantButtons() {
    ["a", "b"].forEach((slot) => {
      const button = document.querySelector(`#saveVariant${slot.toUpperCase()}`);
      button.textContent = variants[slot] ? `Remplacer ${slot.toUpperCase()}` : `Enregistrer ${slot.toUpperCase()}`;
    });
    document.querySelector("#openComparison").disabled = !(variants.a && variants.b);
  }

  function saveVariant(slot) {
    const replacing = Boolean(variants[slot]);
    if (replacing && !window.confirm(`Remplacer la direction ${slot.toUpperCase()} par l’état actuel ?`)) return;
    variants[slot] = takeSnapshot();
    updateVariantButtons();
    analytics.capture("variant_saved", { variant: slot, action: replacing ? "replaced" : "created" });
    showToast(`Direction ${slot.toUpperCase()} ${replacing ? "remplacée" : "enregistrée"}.`);
  }

  function compareCard(snapshot, slot) {
    const preset = presetById(snapshot.preset); const pair = fontById(snapshot.fontPair);
    const vars = `--compare-bg:${snapshot.colors[0]};--compare-ink:${snapshot.colors[2]};--compare-muted:${snapshot.colors[3]};--compare-accent:${snapshot.colors[4]};--compare-title:'${escapeHtml(pair.title)}';--compare-body:'${escapeHtml(pair.body)}'`;
    return `<article class="comparison-card ${slot === "a" ? "is-mobile-active" : ""}" data-comparison-card="${slot}">
      <div class="comparison-card-preview" style="${vars}"><div class="compare-nav"><strong>${escapeHtml(snapshot.brand || "Votre marque")}</strong><span>${escapeHtml(snapshot.view === "site" ? "SITE" : snapshot.view === "post" ? "POST" : "OFFRE")}</span></div>
        <span class="compare-direction">${escapeHtml(preset.label)}</span><h3>${escapeHtml(snapshot.headline)}</h3><p>${escapeHtml(snapshot.body)}</p><span class="compare-cta">${escapeHtml(snapshot.cta)}</span></div>
      <div class="comparison-meta"><strong>Direction ${slot.toUpperCase()} · ${escapeHtml(preset.label)}</strong><button class="command primary" type="button" data-choose="${slot}">Choisir ${slot.toUpperCase()}</button></div>
    </article>`;
  }

  function openComparison() {
    if (!variants.a || !variants.b) return;
    const modal = document.querySelector("#comparisonModal");
    modal.innerHTML = `<div class="modal-panel"><p class="modal-kicker">Même contenu, deux directions</p><h2 id="comparisonTitle">Quelle piste porte mieux votre message ?</h2>
      <div class="comparison-switch"><button class="command primary" type="button" data-show-card="a">Direction A</button><button class="command" type="button" data-show-card="b">Direction B</button></div>
      <div class="comparison-grid">${compareCard(variants.a, "a")}${compareCard(variants.b, "b")}</div>
      <div class="modal-actions"><button class="command" id="closeComparison" type="button">Continuer à ajuster</button></div></div>`;
    modal.querySelectorAll("[data-choose]").forEach((button) => button.addEventListener("click", () => {
      const slot = button.dataset.choose; applySnapshot(variants[slot], "comparison"); analytics.capture("direction_chosen", { variant: slot }); closeModal(modal); showToast(`Direction ${slot.toUpperCase()} choisie.`);
    }));
    modal.querySelectorAll("[data-show-card]").forEach((button) => button.addEventListener("click", () => {
      modal.querySelectorAll("[data-show-card]").forEach((item) => item.classList.toggle("primary", item === button));
      modal.querySelectorAll("[data-comparison-card]").forEach((card) => card.classList.toggle("is-mobile-active", card.dataset.comparisonCard === button.dataset.showCard));
    }));
    modal.querySelector("#closeComparison").addEventListener("click", () => closeModal(modal));
    analytics.capture("comparison_opened"); openModal(modal);
  }

  function printResult() {
    const snapshot = takeSnapshot(); const preset = presetById(snapshot.preset); const pair = fontById(snapshot.fontPair);
    const imageStyle = imageStyles.find((item) => item.id === snapshot.imageStyle) || noImageStyle;
    const avoidLabel = diagnosticContext ? ({ cold:"Froide ou impersonnelle", generic:"Générique ou interchangeable", amateur:"Amateur ou bricolée", elitist:"Élitiste ou distante", loud:"Agressive ou bruyante", dated:"Datée ou trop traditionnelle" }[diagnosticContext.answers.avoid]) : "À préciser en confrontant cette direction à votre audience";
    const sheet = document.querySelector("#printSheet");
    sheet.style.cssText = `--print-bg:${snapshot.colors[0]};--print-accent:${snapshot.colors[4]};--print-title:'${escapeHtml(pair.title)}'`;
    sheet.innerHTML = `<div class="print-cover"><p class="print-kicker">Boussole visuelle · Mini-charte</p><h1>${escapeHtml(snapshot.brand || "Votre marque")}</h1><p><strong>Direction choisie :</strong> ${escapeHtml(preset.label)} — ${escapeHtml(snapshot.words)}</p><p><strong>Contre-image à éviter :</strong> ${escapeHtml(avoidLabel)}</p></div>
      <h2>Signaux visuels</h2><div class="print-swatches">${snapshot.colors.map((color) => `<span class="print-swatch" style="background:${color};color:${color === snapshot.colors[2] ? snapshot.colors[0] : snapshot.colors[2]}">${color}</span>`).join("")}</div>
      <div class="print-grid"><section><h3>Typographies</h3><p>${escapeHtml(pair.title)} pour les titres<br>${escapeHtml(pair.body)} pour les textes</p><h3>Images</h3><p>${escapeHtml(imageStyle.label)} — ${escapeHtml(imageStyle.rule)}</p></section>
      <section><h3>Message testé</h3><p><strong>${escapeHtml(snapshot.headline)}</strong></p><p>${escapeHtml(snapshot.body)}</p><p>Action : ${escapeHtml(snapshot.cta)}</p></section></div>
      <h2>Règles de départ</h2><ul>${preset.rules.map((rule) => `<li>${escapeHtml(rule)}</li>`).join("")}</ul>
      <h2>Checklist d’application</h2><ul><li><strong>Site :</strong> appliquer la hiérarchie, la couleur d’action et le style d’image à une page clé.</li><li><strong>Publication :</strong> tester le titre, un visuel et une seule action dans ce système.</li><li><strong>Offre :</strong> vérifier que valeur, preuves et prochaine étape restent immédiatement lisibles.</li></ul>
      <p class="print-footer">Généré gratuitement avec Boussole visuelle · Cette direction est une hypothèse à tester.</p>`;
    analytics.capture("print_started");
    window.addEventListener("afterprint", () => showNextStepQuestion(), { once: true });
    window.print();
  }

  function feedbackCard(title, options, eventName) {
    const card = document.createElement("section"); card.className = "feedback-card";
    card.innerHTML = `<button class="close-feedback" type="button" aria-label="Fermer">×</button><h3>${escapeHtml(title)}</h3><div class="feedback-options">${options.map(([value,label]) => `<button type="button" data-answer="${value}">${escapeHtml(label)}</button>`).join("")}</div>`;
    card.querySelector(".close-feedback").addEventListener("click", () => card.remove());
    card.querySelectorAll("[data-answer]").forEach((button) => button.addEventListener("click", () => { analytics.capture(eventName, { answer: button.dataset.answer }); card.remove(); showToast("Merci, votre réponse nous aide à améliorer la bêta."); }));
    document.body.appendChild(card); return card;
  }

  function showContextQuestion() {
    if (document.querySelector(".context-card") || entry.source === "share") return;
    const card = document.createElement("section"); card.className = "context-card";
    card.innerHTML = `<button class="close-context" type="button" aria-label="Ignorer">×</button><h2>Quel support préparez-vous ?</h2><div class="feedback-options">${[["identity","Identité générale"],["site","Site / vente"],["social","Réseaux sociaux"],["offer","Offre / présentation"],["undecided","Pas encore défini"]].map(([value,label]) => `<button type="button" data-answer="${value}">${label}</button>`).join("")}</div>`;
    card.querySelector(".close-context").addEventListener("click", () => card.remove());
    card.querySelectorAll("[data-answer]").forEach((button) => button.addEventListener("click", () => { analytics.capture("feedback_context_answered", { answer: button.dataset.answer }); card.remove(); }));
    document.querySelector(".section-base").before(card);
  }

  function showNextStepQuestion() {
    if (feedbackShown) return; feedbackShown = true;
    feedbackCard("Que voudriez-vous faire maintenant ?", [["save","Sauvegarder"],["formats","Exporter d’autres formats"],["canva","Appliquer dans Canva"],["compare","Comparer davantage"],["validate","Faire valider / partager"],["done","J’ai terminé"]], "feedback_next_step_answered");
  }

  function initializeSharedMode() {
    if (entry.source !== "share") return false;
    const banner = document.querySelector("#sharedBanner"); banner.hidden = false;
    analytics.capture("shared_direction_opened");
    document.querySelector("#cloneShared").addEventListener("click", () => {
      const url = new URL(window.location.href); url.searchParams.delete("src"); window.history.replaceState(null, "", url);
      banner.hidden = true; analytics.capture("shared_direction_cloned"); showToast("Votre copie est prête à être modifiée.");
    });
    return true;
  }

  analytics.capture("tool_opened", { entry: entry.source === "share" ? "shared" : ["landing", "guide"].includes(entry.source) ? entry.source : "direct", mode: entry.source === "share" ? "shared" : entry.mode === "diagnostic" ? "diagnostic" : "free" });
  initializeSharedMode();
  renderDiagnostic();
  document.querySelector("#saveVariantA").addEventListener("click", () => saveVariant("a"));
  document.querySelector("#saveVariantB").addEventListener("click", () => saveVariant("b"));
  document.querySelector("#openComparison").addEventListener("click", openComparison);
  document.querySelector("#printResult").addEventListener("click", printResult);
  document.querySelector("#copySummary").addEventListener("click", () => { analytics.capture("result_copied"); showNextStepQuestion(); });
  document.querySelector("#copyLink").addEventListener("click", () => { analytics.capture("share_link_copied"); showNextStepQuestion(); });
  document.querySelectorAll(".preset").forEach((button) => button.addEventListener("click", () => analytics.capture("preset_selected", { preset: button.dataset.preset, origin: "manual" })));
  document.querySelectorAll(".tab").forEach((button) => button.addEventListener("click", () => analytics.capture("preview_viewed", { preview: button.dataset.view })));
  document.querySelector("#paletteGrid").addEventListener("click", (event) => { if (event.target.closest(".palette")) captureCategory("colors"); });
  document.querySelectorAll("input[type=color]").forEach((input) => input.addEventListener("change", () => captureCategory("colors")));
  document.querySelector("#fontList").addEventListener("click", (event) => { if (event.target.closest(".font-option")) captureCategory("fonts"); });
  ["#visualStyleList", "#imageStyleList"].forEach((selector) => document.querySelector(selector).addEventListener("click", (event) => { if (event.target.closest(".image-option")) captureCategory("visuals"); }));
  [fields.brandName, fields.perceptionWords, fields.headline, fields.bodyText, fields.ctaText].forEach((field) => field.addEventListener("change", () => captureCategory("texts")));

  if (entry.mode === "diagnostic" && entry.source !== "share") {
    analytics.capture("diagnostic_started"); openModal(document.querySelector("#diagnosticModal"));
  } else if (entry.source !== "share") showContextQuestion();
})();
