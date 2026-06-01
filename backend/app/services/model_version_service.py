from app.models.model_versions import ModelVersion


def create_model_version(
    db,
    version,
    model_path,
    dataset_size,
    precision,
    recall,
    map50,
    map50_95
):

    existing = (
        db.query(ModelVersion)
        .filter(
            ModelVersion.version == version
        )
        .first()
    )

    if existing:
        raise ValueError(
            "Version already exists"
        )

    model = ModelVersion(
        version=version,
        model_path=model_path,
        dataset_size=dataset_size,
        precision=precision,
        recall=recall,
        map50=map50,
        map50_95=map50_95
    )

    db.add(model)

    db.commit()
    db.refresh(model)

    return model

def get_model_versions(db):

    return (
        db.query(ModelVersion)
        .order_by(
            ModelVersion.created_at.desc()
        )
        .all()
    )

def get_active_model(db):

    return (
        db.query(ModelVersion)
        .filter(
            ModelVersion.is_active == True
        )
        .first()
    )

def activate_model_version(
    db,
    model_id
):

    model = (
        db.query(ModelVersion)
        .filter(
            ModelVersion.id == model_id
        )
        .first()
    )

    if not model:
        raise ValueError(
            "Model not found"
        )

    (
        db.query(ModelVersion)
        .update(
            {
                ModelVersion.is_active: False
            }
        )
    )

    model.is_active = True

    db.commit()
    db.refresh(model)

    return model