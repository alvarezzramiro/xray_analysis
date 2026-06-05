export interface XRay {

    id: string;
    filename: string;
    status: string;
    created_at: string;

    image_url: string;

    analysis_count: number;

    latest_analysis_id?: string;
}