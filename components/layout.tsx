import Header from './header';

export default function Layout({ children }) {
    return (
        <>
            <Header />
            <main className="p-5">{children}</main>
        </>
    );
}
