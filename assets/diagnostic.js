(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  root.BoussoleDiagnostic = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";
  const order = ["rassurant", "expert", "creatif", "premium", "accessible", "energique", "minimal", "artisanal"];
  const relations = {
    reassure: { rassurant: 2, accessible: 1 },
    prove: { expert: 2, minimal: 1 },
    inspire: { creatif: 2, artisanal: 1 },
    elevate: { premium: 2, expert: 1 },
    activate: { energique: 2, accessible: 1 }
  };
  const energies = {
    calm: { rassurant: 1, premium: 1, minimal: 1, artisanal: 1 },
    balanced: { expert: 1, accessible: 1 },
    dynamic: { energique: 1, creatif: 1 }
  };
  const avoid = {
    cold: ["minimal", "expert"], generic: ["rassurant", "accessible"],
    amateur: ["creatif", "artisanal"], elitist: ["premium", "expert"],
    loud: ["energique", "creatif"], dated: ["artisanal", "premium"]
  };

  function score(answers) {
    const scores = Object.fromEntries(order.map((id) => [id, 0]));
    if (order.includes(answers.perception)) scores[answers.perception] += 4;
    Object.entries(relations[answers.relation] || {}).forEach(([id, points]) => { scores[id] += points; });
    Object.entries(energies[answers.energy] || {}).forEach(([id, points]) => { scores[id] += points; });
    (avoid[answers.avoid] || []).forEach((id) => { scores[id] -= 2; });
    return order.map((id, index) => ({ id, score: scores[id], index }))
      .sort((a, b) => b.score - a.score || a.index - b.index);
  }

  return Object.freeze({ order, relations, energies, avoid, score });
});
