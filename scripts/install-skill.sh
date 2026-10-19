#!/usr/bin/env bash
set -euo pipefail
# Install instructions only; no network, package manager, sudo or config edits.
project_dir="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.." && pwd -P)"
skill_source="$project_dir/.agents/skills/xss-field-coach"
skill_target_root="${HOME:?HOME must identify your user directory}/.agents/skills"
if [[ $# -gt 0 ]]; then
  if [[ $# -eq 2 && "$1" == '--skills-dir' && -n "$2" ]]; then
    skill_target_root="$2"
  else
    printf '%s\n' 'Usage: bash scripts/install-skill.sh [--skills-dir /absolute/path/to/skills]' >&2
    exit 2
  fi
fi
if [[ "$skill_target_root" != /* ]]; then
  printf '%s\n' 'Use an absolute skills directory.' >&2
  exit 2
fi
skill_target="$skill_target_root/xss-field-coach"
if [[ ! -f "$skill_source/SKILL.md" ]]; then
  printf '%s\n' 'Bundled skill is missing. Run this from the complete lab checkout.' >&2
  exit 1
fi
if [[ -e "$skill_target" || -L "$skill_target" ]]; then
  printf 'Already present: %s\nNo files were replaced.\n' "$skill_target" >&2
  exit 1
fi
mkdir -p -- "$skill_target_root"
# Atomic name reservation prevents an existing install being overwritten.
mkdir -- "$skill_target"
cp -R -- "$skill_source/." "$skill_target/"
printf 'Installed: %s\n' "$skill_target"
printf '%s\n' 'Start Codex and invoke $xss-field-coach. Restart Codex if the skill is not listed.'
