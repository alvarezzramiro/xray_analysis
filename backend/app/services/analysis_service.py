import random

from app.models.analysis_result import AnalysisResult


FAKE_BONES = [
    "radius",
    "ulna",
    "femur",
    "tibia",
    "humerus"
]

FAKE_INJURIES = [
    "fracture",
    "stress fracture",
    "bone lesion"
]


def generate_fake_analysis(db, image_id):
    analysis = AnalysisResult(
        image_id=image_id,

        bone=random.choice(FAKE_BONES),

        injury_type=random.choice(FAKE_INJURIES),

        confidence=round(random.uniform(0.75, 0.99), 2),

        bbox_x1=random.randint(50, 150),
        bbox_y1=random.randint(50, 150),

        bbox_x2=random.randint(200, 350),
        bbox_y2=random.randint(200, 350)
    )

    db.add(analysis)

    db.commit()

    db.refresh(analysis)

    return analysis