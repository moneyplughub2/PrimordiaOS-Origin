#!/usr/bin/env python
import json
import sys
from pathlib import Path

def load_registry(root: Path):
    registry_path = root / "Core" / "Registry" / "primordia_registry.json"
    with registry_path.open("r", encoding="utf-8") as f:
        return json.load(f)

def ensure_unreal_structure(root: Path):
    unreal_root = root / "Unreal"
    worlds_dir = unreal_root / "Worlds"
    chambers_dir = unreal_root / "Chambers"
    actors_dir = unreal_root / "Actors"
    scripts_dir = unreal_root / "Scripts"

    for d in [worlds_dir, chambers_dir, actors_dir, scripts_dir]:
        d.mkdir(parents=True, exist_ok=True)

    return {
        "root": unreal_root,
        "worlds": worlds_dir,
        "chambers": chambers_dir,
        "actors": actors_dir,
        "scripts": scripts_dir,
    }

def bootstrap_world(worlds_dir: Path, name: str):
    world_file = worlds_dir / f"{name}.world.json"
    if world_file.exists():
        return world_file
    data = {
        "name": name,
        "type": "world",
        "state": "draft",
        "relations": [],
        "monetization": {},
        "telemetry": {}
    }
    world_file.write_text(json.dumps(data, indent=2), encoding="utf-8")
    return world_file

def bootstrap_chamber(chambers_dir: Path, world_name: str, chamber_name: str):
    chamber_file = chambers_dir / f"{world_name}__{chamber_name}.chamber.json"
    if chamber_file.exists():
        return chamber_file
    data = {
        "name": chamber_name,
        "world": world_name,
        "type": "chamber",
        "state": "draft",
        "relations": [],
        "monetization": {},
        "telemetry": {}
    }
    chamber_file.write_text(json.dumps(data, indent=2), encoding="utf-8")
    return chamber_file

def main():
    if len(sys.argv) < 2:
        print("Usage: primordia_unreal_automation.py <PrimordiaOS root>")
        sys.exit(1)

    root = Path(sys.argv[1]).resolve()
    registry = load_registry(root)
    unreal = ensure_unreal_structure(root)

    print(f"[PrimordiaUnreal] Root: {unreal['root']}")

    world = bootstrap_world(unreal["worlds"], "origin_world")
    chamber = bootstrap_chamber(unreal["chambers"], "origin_world", "codex_chamber")

    print(f"[PrimordiaUnreal] World: {world}")
    print(f"[PrimordiaUnreal] Chamber: {chamber}")

if __name__ == "__main__":
    main()
