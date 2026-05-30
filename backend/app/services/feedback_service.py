from collections import Counter

from app.models.analysis_feedback import AnalysisFeedback

VALID_FEEDBACK_TYPES = {
    "correct",
    "false_positive",
    "false_negative",
    "bad_localization",
    "other"
}

def create_feedback(
    db,
    user_id,
    analysis_id,
    feedback_type,
    comment
):
    
    if feedback_type not in VALID_FEEDBACK_TYPES:

        raise ValueError(
            f"Invalid feedback type: {feedback_type}"
        )
    
    feedback = AnalysisFeedback(
        user_id=user_id,
        analysis_id=analysis_id,
        feedback_type=feedback_type,
        comment=comment
    )

    db.add(feedback)
    db.commit()
    db.refresh(feedback)

    return feedback

def get_user_feedbacks(db, user_id):

    return (
        db.query(AnalysisFeedback)
        .filter(AnalysisFeedback.user_id == user_id)
        .order_by(AnalysisFeedback.created_at.desc())
        .all()
    )

def get_feedback_by_id(db, feedback_id, user_id):

    return (
        db.query(AnalysisFeedback)
        .filter(
            AnalysisFeedback.id == feedback_id,
            AnalysisFeedback.user_id == user_id
        )
        .first()
    )

def get_feedback_stats(db, user_id):

    feedbacks = (
        db.query(AnalysisFeedback)
        .filter(AnalysisFeedback.user_id == user_id)
        .all()
    )

    counts = Counter(
        feedback.feedback_type
        for feedback in feedbacks
    )

    return {
        "correct": counts.get("correct", 0),
        "false_positive": counts.get("false_positive", 0),
        "false_negative": counts.get("false_negative", 0),
        "bad_localization": counts.get("bad_localization", 0),
        "other": counts.get("other", 0)
    }