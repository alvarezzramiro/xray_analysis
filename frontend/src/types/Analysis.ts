export interface Analysis {

    id: string;

    image_id: string;

    fracture_detected: boolean;

    confidence_score: number;

    model_version: string;

    created_at: string;
}