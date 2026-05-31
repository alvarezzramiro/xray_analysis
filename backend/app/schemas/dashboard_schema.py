from pydantic import BaseModel

class UserDashboardResponse(BaseModel):

    total_xrays: int
    total_analyses: int
    total_feedbacks: int

    fractures_detected: int
    
    training_candidates: int
    
    estimated_accuracy: float

    correct_feedbacks: int
    false_positive_feedbacks: int
    false_negative_feedbacks: int
    other_feedbacks: int

class AdminDashboardResponse(BaseModel):

    total_users: int
    active_users: int

    total_xrays: int
    total_analyses: int
    total_feedbacks: int
    
    total_training_candidates: int
    pending_candidates: int
    exported_candidates: int
    used_for_training: int
    
    estimated_accuracy: float
    
    correct_feedbacks: int
    false_positive_feedbacks: int
    false_negative_feedbacks: int
    other_feedbacks: int