#!/bin/bash
# ============================================================
# build.sh — Genera gli ZIP di consegna Doppelgänger
# Uso: bash build.sh
# Output: ~/Downloads/Doppelganger_demo_*_YYYY-MM-DD.zip
# ============================================================
set -e

DATE=$(date +%Y-%m-%d)
ROOT=$(pwd)
PARENT=$(dirname "$ROOT")
FOLDER=$(basename "$ROOT")
OUT="$HOME/Downloads/doppelganger-sito PROVA/consegne"

echo "📦 Build ZIP per $FOLDER (data: $DATE)"
echo ""

# --- ZIP 1: AGENZIA (senza images pesanti) ---
echo "→ ZIP AGENZIA (codice + design, senza images/)"
cd "$PARENT"
rm -f "$OUT/Doppelganger_demo_AGENZIA_$DATE.zip"
zip -rq "$OUT/Doppelganger_demo_AGENZIA_$DATE.zip" "$FOLDER" \
  -x "$FOLDER/.git/*" \
  -x "$FOLDER/.gitignore" \
  -x "$FOLDER/.DS_Store" \
  -x "**/.DS_Store" \
  -x "*.bak" \
  -x "**/*.bak" \
  -x "*.bak_*" \
  -x "**/*.bak_*" \
  -x "*.bak2_*" \
  -x "**/*.bak2_*" \
  -x "*.bak3_*" \
  -x "**/*.bak3_*" \
  -x "*.bak_safe_*" \
  -x "**/*.bak_safe_*" \
  -x "$FOLDER/backup/*" \
  -x "$FOLDER/node_modules/*" \
  -x "$FOLDER/images/*" \
  -x "$FOLDER/documents/*"
echo "  ✅ Fatto: Doppelganger_demo_AGENZIA_$DATE.zip"
echo ""

# --- ZIP 2: COMPLETO (tutto) ---
echo "→ ZIP COMPLETO (tutto incluso)"
rm -f "$OUT/Doppelganger_demo_COMPLETO_$DATE.zip"
zip -rq "$OUT/Doppelganger_demo_COMPLETO_$DATE.zip" "$FOLDER" \
  -x "$FOLDER/.git/*" \
  -x "$FOLDER/.gitignore" \
  -x "$FOLDER/.DS_Store" \
  -x "**/.DS_Store" \
  -x "*.bak" \
  -x "**/*.bak" \
  -x "*.bak_*" \
  -x "**/*.bak_*" \
  -x "*.bak2_*" \
  -x "**/*.bak2_*" \
  -x "*.bak3_*" \
  -x "**/*.bak3_*" \
  -x "*.bak_safe_*" \
  -x "**/*.bak_safe_*" \
  -x "$FOLDER/backup/*" \
  -x "$FOLDER/node_modules/*"
echo "  ✅ Fatto: Doppelganger_demo_COMPLETO_$DATE.zip"
echo ""

# --- Riepilogo ---
echo "📊 Riepilogo:"
ls -lh "$OUT/Doppelganger_demo_AGENZIA_$DATE.zip" "$OUT/Doppelganger_demo_COMPLETO_$DATE.zip"
