from app.models.training_candidates import TrainingCandidate

def get_pending_training_candidates(db):

    return (
        db.query(TrainingCandidate)
        .filter(
            TrainingCandidate.used_for_training == False
        )
        .all()
    )

def get_training_stats(db):

    total_candidates = (
        db.query(TrainingCandidate)
        .count()
    )

    pending_candidates = (
        db.query(TrainingCandidate)
        .filter(TrainingCandidate.exported == False)
        .count()
    )

    exported_candidates = (
        db.query(TrainingCandidate)
        .filter(TrainingCandidate.exported == True)
        .count()
    )

    used_for_training = (
        db.query(TrainingCandidate)
        .filter(
            TrainingCandidate.used_for_training == True
        )
        .count()
    )

    return {
        "pending_candidates": pending_candidates,
        "exported_candidates": exported_candidates,
        "used_for_training": used_for_training,
        "total_candidates": total_candidates
    }