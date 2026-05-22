from pathlib import Path

from PIL import Image, ImageDraw

ANNOTATED_DIR = Path("annotated")

ANNOTATED_DIR.mkdir(exist_ok=True)

def generate_overlay_image(image_path, analysis):
    image = Image.open(image_path)

    draw = ImageDraw.Draw(image)

    x1 = analysis.bbox_x1
    y1 = analysis.bbox_y1

    x2 = analysis.bbox_x2
    y2 = analysis.bbox_y2

    draw.rectangle(
        [(x1, y1), (x2, y2)],
        outline="red",
        width=5
    )

    label = (
        f"{analysis.injury_type} "
        f"{analysis.confidence}"
    )

    draw.text(
        (x1, y1 - 20),
        label,
        fill="red"
    )

    annotated_filename = (
        f"annotated_{analysis.image_id}.png"
    )

    annotated_path = (
        ANNOTATED_DIR / annotated_filename
    )

    image.save(annotated_path)

    return str(annotated_path)