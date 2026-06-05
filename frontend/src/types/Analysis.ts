export interface BoundingBox {

    x1: number;
    y1: number;

    x2: number;
    y2: number;
}

export interface Detection {

    class_id: number;

    class_name: string;

    confidence: number;

    bbox: BoundingBox;
}

export interface Analysis {

    id: string;

    image_id: string;

    original_image_url?: string;

    model_version: string;

    fracture_detected: boolean;

    detections_count: number;

    max_confidence?: number;

    detections: Detection[];

    annotated_image_url?: string;

    processing_time_ms: number;

    status: string;

    error_message?: string;
}