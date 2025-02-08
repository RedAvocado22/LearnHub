import Footer from "./footer/Footer";
import Header from "./header/Header";

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    );
}
