import os
import shutil

from app.models.training_candidates import TrainingCandidate

from PIL import Image

EXPORT_ROOT = "training_export"

IMAGES_DIR = os.path.join(EXPORT_ROOT, "images")

LABELS_DIR = os.path.join(EXPORT_ROOT, "labels")

os.makedirs(
    IMAGES_DIR,
    exist_ok=True
)

os.makedirs(
    LABELS_DIR,
    exist_ok=True
)

def convert_bbox_to_yolo(
    x1,
    y1,
    x2,
    y2,
    image_width,
    image_height
):

    width = x2 - x1
    height = y2 - y1

    x_center = x1 + width / 2
    y_center = y1 + height / 2

    return (
        x_center / image_width,
        y_center / image_height,
        width / image_width,
        height / image_height
    )

def export_pending_candidates(
    db
):
    candidates = (
        db.query(TrainingCandidate)
        .filter(
            TrainingCandidate.exported == False
        )
        .all()
    )

    exported_count = 0

    for candidate in candidates:

        feedback = candidate.feedback
        analysis = feedback.analysis
        image = analysis.image
    
        source_image = image.filepath

        destination_image = os.path.join(
            IMAGES_DIR,
            image.filename
        )

        shutil.copy2(
            source_image,
            destination_image
        )

        with Image.open(source_image) as img:
            image_width, image_height = img.size

        label_filename = (
            os.path.splitext(image.filename)[0]
            + ".txt"
        )

        label_path = os.path.join(
            LABELS_DIR,
            label_filename
        )

        with open(label_path, "w") as f:

            for annotation in feedback.annotations:

                x_center, y_center, width, height = (
                    convert_bbox_to_yolo(
                        annotation.x1,
                        annotation.y1,
                        annotation.x2,
                        annotation.y2,
                        image_width,
                        image_height
                    )
                )

                f.write(
                    f"{annotation.class_id} "
                    f"{x_center:.6f} "
                    f"{y_center:.6f} "
                    f"{width:.6f} "
                    f"{height:.6f}\n"
                )

            candidate.exported = True

            exported_count += 1

    db.commit()

    return exported_count