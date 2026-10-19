#!/usr/bin/env python3
"""Create a reviewable GitHub source export without host identity or Git history."""
from pathlib import Path
import argparse
import shutil

ROOT = Path(__file__).resolve().parent.parent
ROOT_FILES = ('README.md', 'package.json', 'AGENTS.md', 'CONTRIBUTING.md', 'SECURITY.md', '.gitignore', '.gitattributes')
DIRECTORIES = ('dist', 'tests', 'docs', 'scripts', '.github', '.agents')

def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('destination', type=Path)
    args = parser.parse_args()
    target = args.destination.expanduser().resolve()
    if target == ROOT or ROOT in target.parents:
        parser.error('Use a destination outside the checkout.')
    if target.exists():
        parser.error('Destination already exists; no files were replaced.')
    target.mkdir(parents=True)
    for name in ROOT_FILES:
        shutil.copy2(ROOT / name, target / name)
    for name in DIRECTORIES:
        shutil.copytree(ROOT / name, target / name, ignore=shutil.ignore_patterns('__pycache__', '*.pyc'))
    print(f'Prepared {sum(p.is_file() for p in target.rglob("*"))} source files: {target}')

if __name__ == '__main__':
    main()
