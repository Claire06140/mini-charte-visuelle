#!/usr/bin/env python3
"""Validate the stable Markdown table in KEYWORD_OPPORTUNITIES.md."""

from __future__ import annotations

import re
import sys
from pathlib import Path


EXPECTED_COLUMNS = [
    "ID",
    "Locale",
    "Query",
    "Intent",
    "Target",
    "Evidence",
    "Volume",
    "Difficulty",
    "Score",
    "Decision",
    "Notes",
]

ALLOWED_EVIDENCE = {
    "volume-confirmed",
    "trend-confirmed",
    "serp-gap-confirmed",
    "search-console-confirmed",
    "strategy-backed",
    "needs-recheck",
}

ALLOWED_DECISIONS = {"keep", "merge", "reframe", "hold"}
LOCALE_RE = re.compile(r"^[a-z]{2}-[A-Z]{2}$")


def cells(line: str) -> list[str]:
    return [part.strip() for part in line.strip().strip("|").split("|")]


def is_separator(line: str) -> bool:
    return all(re.fullmatch(r":?-{3,}:?", part) for part in cells(line))


def find_table(lines: list[str]) -> tuple[int, list[str]]:
    for index, line in enumerate(lines):
        if cells(line) == EXPECTED_COLUMNS:
            if index + 1 >= len(lines) or not is_separator(lines[index + 1]):
                raise ValueError("La ligne de séparation du tableau est absente.")
            return index + 2, EXPECTED_COLUMNS
    raise ValueError(
        "Table principale introuvable ou colonnes différentes de : "
        + ", ".join(EXPECTED_COLUMNS)
    )


def validate(path: Path) -> list[str]:
    errors: list[str] = []
    lines = path.read_text(encoding="utf-8").splitlines()

    try:
        start, _ = find_table(lines)
    except ValueError as exc:
        return [str(exc)]

    rows: list[dict[str, str]] = []
    for line_number, line in enumerate(lines[start:], start=start + 1):
        if not line.strip().startswith("|"):
            break
        values = cells(line)
        if len(values) != len(EXPECTED_COLUMNS):
            errors.append(
                f"Ligne {line_number}: {len(values)} colonnes au lieu de "
                f"{len(EXPECTED_COLUMNS)}."
            )
            continue
        row = dict(zip(EXPECTED_COLUMNS, values))
        row["_line"] = str(line_number)
        rows.append(row)

    if len(rows) < 25:
        errors.append(f"La cartographie ne contient que {len(rows)} requêtes (minimum 25).")

    seen_ids: set[str] = set()
    seen_queries: set[tuple[str, str]] = set()

    for row in rows:
        line_number = row["_line"]
        row_id = row["ID"]
        query_key = (row["Locale"], row["Query"].casefold())

        if not row_id or row_id in seen_ids:
            errors.append(f"Ligne {line_number}: ID vide ou dupliqué ({row_id!r}).")
        seen_ids.add(row_id)

        if not LOCALE_RE.fullmatch(row["Locale"]):
            errors.append(f"Ligne {line_number}: locale invalide ({row['Locale']!r}).")

        if not row["Query"] or query_key in seen_queries:
            errors.append(
                f"Ligne {line_number}: requête vide ou dupliquée ({row['Query']!r})."
            )
        seen_queries.add(query_key)

        evidence = {item.strip() for item in row["Evidence"].split(";") if item.strip()}
        unknown_evidence = evidence - ALLOWED_EVIDENCE
        if not evidence or unknown_evidence:
            errors.append(
                f"Ligne {line_number}: preuves absentes ou inconnues "
                f"({', '.join(sorted(unknown_evidence)) or 'aucune'})."
            )

        if row["Volume"] != "—" and "volume-confirmed" not in evidence:
            errors.append(
                f"Ligne {line_number}: volume renseigné sans statut volume-confirmed."
            )

        if row["Difficulty"] != "—" and "volume-confirmed" not in evidence:
            errors.append(
                f"Ligne {line_number}: difficulté renseignée sans statut volume-confirmed."
            )

        try:
            score = int(row["Score"])
            if not 0 <= score <= 100:
                raise ValueError
        except ValueError:
            errors.append(f"Ligne {line_number}: score invalide ({row['Score']!r}).")

        if row["Decision"] not in ALLOWED_DECISIONS:
            errors.append(
                f"Ligne {line_number}: décision invalide ({row['Decision']!r})."
            )

        if not row["Target"]:
            errors.append(f"Ligne {line_number}: page cible absente.")

        if row["Decision"] in {"merge", "reframe", "hold"} and len(row["Notes"]) < 12:
            errors.append(
                f"Ligne {line_number}: la décision {row['Decision']} doit être expliquée."
            )

    return errors


def main() -> int:
    if len(sys.argv) != 2:
        print("Usage: validate_keyword_map.py <KEYWORD_OPPORTUNITIES.md>", file=sys.stderr)
        return 2

    path = Path(sys.argv[1])
    if not path.is_file():
        print(f"Fichier introuvable: {path}", file=sys.stderr)
        return 2

    errors = validate(path)
    if errors:
        print("Cartographie invalide:", file=sys.stderr)
        for error in errors:
            print(f"- {error}", file=sys.stderr)
        return 1

    print(f"Cartographie valide: {path}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
