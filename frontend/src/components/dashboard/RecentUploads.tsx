import type { XRay }
    from "../../types/Xray";

interface Props {

    xrays: XRay[];
}

export default function RecentUploads(
    { xrays }: Props
) {

    return (

        <div>

            <h2>
                Recent Uploads
            </h2>

            {

                xrays.map(xray => (

                    <img
                        src={xray.image_url}
                        alt={xray.filename}
                        width={200}
                    />
                ))
            }

        </div>
    );
}