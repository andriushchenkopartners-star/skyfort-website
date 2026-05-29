#!/usr/bin/env bash
# scripts/setup-hooks.sh
# One-time setup for git pre-commit hook. Avoids npm-installing Husky
# (which adds package weight) — drops a small bash script directly into
# .git/hooks/pre-commit that runs lint before allowing commit.
#
# Run once after cloning the repo:
#   bash scripts/setup-hooks.sh

set -e

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
HOOK_PATH="$REPO_ROOT/.git/hooks/pre-commit"

if [ ! -d "$REPO_ROOT/.git" ]; then
  echo "Not inside a git repo. Aborting."
  exit 1
fi

cat > "$HOOK_PATH" <<'EOF'
#!/usr/bin/env bash
# SkyFort pre-commit hook — runs lint before allowing commit. Set up by
# scripts/setup-hooks.sh. To bypass once (rare): git commit --no-verify.

set -e

REPO_ROOT="$(git rev-parse --show-toplevel)"
cd "$REPO_ROOT"

echo "→ Running ESLint pre-commit check…"
if ! npm run lint --silent 2>&1; then
  echo ""
  echo "✗ Lint failed. Fix errors above, then commit again."
  echo "  Bypass once (NOT recommended): git commit --no-verify"
  exit 1
fi

echo "✓ Lint clean. Proceeding with commit."
EOF

chmod +x "$HOOK_PATH"

echo "✓ Pre-commit hook installed at $HOOK_PATH"
echo ""
echo "Now every \`git commit\` will run \`npm run lint\` first."
echo "Bypass for a single commit (e.g. WIP draft): git commit --no-verify"
echo ""
echo "Companion scripts:"
echo "  npm run validate:jsonld   # HTTP-based schema check against live site"
echo "  npm run lighthouse        # Core Web Vitals audit"
echo "  npm run indexnow          # Ping Bing/Yandex for re-indexing"
