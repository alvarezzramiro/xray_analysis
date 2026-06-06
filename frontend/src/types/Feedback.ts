export interface AnnotationCreate {
    class_id: string;
    class_name: string;
    x1: number;
    y1: number;
    x2: number;
    y2: number;
}

export interface Feedback {

    id: string;

    user_id: string;

    analysis_id: string;

    feedback_type: string;

    comment?: string;

    created_at: string;

    annotations: AnnotationCreate[];

    analysis_image_url?: string;
}