export default function Custom404() {
    return (
        <div className="text-center m-auto align-center">
            <h1 className="font-medium text-xl py-4 block">Error 404: Page Not Found</h1>
            <img
                src="https://cdn-icons-png.flaticon.com/512/177/177841.png"
                className="max-h-44	 m-auto "
                alt="Projects"
                title="Projects"
            />
            <h1 className="font-medium text-xl py-4 block">
                <a href="https://grandstand.dev">
                    <span className="underline text-blue-600 hover:text-blue-800 hover:cursor-pointer visited:text-purple-600">
                        Return to HomePage
                    </span>
                </a>
            </h1>
        </div>
    );
}
