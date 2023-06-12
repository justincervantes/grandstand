import Header from './header';

export default function EditingLayout({ children }) {
    return (
        <div className="flex flex-col h-screen">
            <Header />
            <main className="flex-1 px-5">{children}</main>
        </div>
    );
}
