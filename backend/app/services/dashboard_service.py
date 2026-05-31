from app.models.xray_image import XRayImage
from app.models.xray_analysis import XRayAnalysis
from app.models.analysis_feedback import AnalysisFeedback
from app.models.training_candidates import TrainingCandidate

from app.models.users import User

def get_user_dashboard(db, user_id):
    
    total_xrays = (
        db.query(XRayImage)
        .filter(
            XRayImage.user_id == user_id
        )
        .count()
    )

    total_analyses = (
        db.query(XRayAnalysis)
        .join(
            XRayImage,
            XRayAnalysis.image_id == XRayImage.id
        )
        .filter(
            XRayImage.user_id == user_id
        )
        .count()
    )

    fractures_detected = (
        db.query(XRayAnalysis)
        .join(
            XRayImage,
            XRayAnalysis.image_id == XRayImage.id
        )
        .filter(
            XRayImage.user_id == user_id,
            XRayAnalysis.fracture_detected == True
        )
        .count()
    )

    training_candidates = (
        db.query(TrainingCandidate)
        .join(
            AnalysisFeedback,
            TrainingCandidate.feedback_id == AnalysisFeedback.id
        )
        .filter(
            AnalysisFeedback.user_id == user_id
        )
        .count()
    )

    correct_feedbacks = (
        db.query(AnalysisFeedback)
        .filter(
            AnalysisFeedback.user_id == user_id,
            AnalysisFeedback.feedback_type == "correct"
        )
        .count()
    )

    false_positive_feedbacks = (
        db.query(AnalysisFeedback)
        .filter(
            AnalysisFeedback.user_id == user_id,
            AnalysisFeedback.feedback_type == "false_positive"
        )
        .count()
    )

    false_negative_feedbacks = (
        db.query(AnalysisFeedback)
        .filter(
            AnalysisFeedback.user_id == user_id,
            AnalysisFeedback.feedback_type == "false_negative"
        )
        .count()
    )

    other_feedbacks = (
        db.query(AnalysisFeedback)
        .filter(
            AnalysisFeedback.user_id == user_id,
            AnalysisFeedback.feedback_type == "other"
        )
        .count()
    )

    total_feedbacks = (
        correct_feedbacks
        + false_positive_feedbacks
        + false_negative_feedbacks
        + other_feedbacks
    )

    estimated_accuracy = (
        correct_feedbacks / total_feedbacks * 100
        if total_feedbacks > 0
        else 0
    )

    return {
        "total_xrays": total_xrays,
        "total_analyses": total_analyses,
        "total_feedbacks": total_feedbacks,

        "fractures_detected": fractures_detected,
        
        "training_candidates": training_candidates,
        
        "estimated_accuracy": round(estimated_accuracy, 2),
        
        "correct_feedbacks": correct_feedbacks,
        "false_positive_feedbacks": false_positive_feedbacks,
        "false_negative_feedbacks": false_negative_feedbacks,
        "other_feedbacks": other_feedbacks
    }

def get_admin_dashboard(db):

    total_users = db.query(User).count()

    active_users = (
        db.query(User)
        .filter(
            User.is_active == True
        )
        .count()
    )

    total_xrays = db.query(XRayImage).count()

    total_analyses = db.query(XRayAnalysis).count()

    total_training_candidates = db.query(
        TrainingCandidate
    ).count()

    pending_candidates = (
        db.query(TrainingCandidate)
        .filter(
            TrainingCandidate.exported == False
        )
        .count()
    )

    exported_candidates = (
        db.query(TrainingCandidate)
        .filter(
            TrainingCandidate.exported == True
        )
        .count()
    )

    used_for_training = (
        db.query(TrainingCandidate)
        .filter(
            TrainingCandidate.used_for_training == True
        )
        .count()
    )

    correct_feedbacks = (
        db.query(AnalysisFeedback)
        .filter(
            AnalysisFeedback.feedback_type == "correct"
        )
        .count()
    )

    false_positive_feedbacks = (
        db.query(AnalysisFeedback)
        .filter(
            AnalysisFeedback.feedback_type == "false_positive"
        )
        .count()
    )

    false_negative_feedbacks = (
        db.query(AnalysisFeedback)
        .filter(
            AnalysisFeedback.feedback_type == "false_negative"
        )
        .count()
    )

    other_feedbacks = (
        db.query(AnalysisFeedback)
        .filter(
            AnalysisFeedback.feedback_type == "other"
        )
        .count()
    )

    total_feedbacks = (
        correct_feedbacks
        + false_positive_feedbacks
        + false_negative_feedbacks
        + other_feedbacks
    )

    estimated_accuracy = (
        correct_feedbacks / total_feedbacks * 100
        if total_feedbacks > 0
        else 0
    )

    return {
        "total_users": total_users,
        "active_users": active_users,

        "total_xrays": total_xrays,
        "total_analyses": total_analyses,
        "total_feedbacks": total_feedbacks,
        
        "total_training_candidates": total_training_candidates,
        "pending_candidates": pending_candidates,
        "exported_candidates": exported_candidates,
        "used_for_training": used_for_training,
        
        "estimated_accuracy": round(estimated_accuracy, 2),
        
        "correct_feedbacks": correct_feedbacks,
        "false_positive_feedbacks": false_positive_feedbacks,
        "false_negative_feedbacks": false_negative_feedbacks,
        "other_feedbacks": other_feedbacks
    }