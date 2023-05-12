import Header from './header';

export default function EditingLayout({ children }) {
    return (
        <>
            <Header />
            <main className="p-5">{children}</main>
        </>
    );
}
