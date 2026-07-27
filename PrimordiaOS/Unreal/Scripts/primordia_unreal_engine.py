import unreal

def log(msg):
    unreal.log("[PrimordiaUnreal] " + msg)

def create_level(level_name: str):
    level_path = f"/Game/Primordia/{level_name}"
    log(f"Creating level: {level_path}")
    new_map = unreal.EditorLevelLibrary.new_level(level_path)
    log(f"Level created: {new_map}")
    return level_path

def spawn_actor(actor_class, location=(0,0,0)):
    world = unreal.EditorLevelLibrary.get_editor_world()
    actor = unreal.EditorLevelLibrary.spawn_actor_from_class(actor_class, unreal.Vector(*location))
    log(f"Spawned actor: {actor}")
    return actor

def create_blueprint(name: str):
    bp_path = f"/Game/Primordia/Blueprints/{name}"
    log(f"Creating blueprint: {bp_path}")
    bp_factory = unreal.BlueprintFactory()
    bp = unreal.AssetToolsHelpers.get_asset_tools().create_asset(
        asset_name=name,
        package_path="/Game/Primordia/Blueprints",
        asset_class=unreal.Blueprint,
        factory=bp_factory
    )
    log(f"Blueprint created: {bp}")
    return bp

def primordia_pipeline():
    log("PrimordiaUnreal Engine Pipeline Starting...")
    level = create_level("OriginWorld")
    spawn_actor(unreal.DirectionalLight, (0, 0, 300))
    spawn_actor(unreal.StaticMeshActor, (0, 0, 0))
    create_blueprint("PrimordiaActor")
    log("PrimordiaUnreal Engine Pipeline Complete.")

primordia_pipeline()
