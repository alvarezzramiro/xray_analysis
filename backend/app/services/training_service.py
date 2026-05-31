from app.models.training_candidates import TrainingCandidate

def get_pending_training_candidates(db):

    return (
        db.query(TrainingCandidate)
        .filter(
            TrainingCandidate.used_for_training == False
        )
        .all()
    )