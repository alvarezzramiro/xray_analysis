import Sidebar
    from "../components/Sidebar";

type Props = {
    children: React.ReactNode;
};

export default function MainLayout({
    children
}: Props) {

    return (

        <div
            style={{
                display: "flex"
            }}
        >

            <Sidebar />

            <main
                style={{
                    flex: 1,
                    padding: "1rem"
                }}
            >

                {children}

            </main>

        </div>
    );
}