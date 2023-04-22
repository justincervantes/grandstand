const Home = () => {
    return (
        <div className="grid grid-flow-col p-1 min-h-[80vh]">
            <div className="flex flex-col items-center rounded-lg justify-center bg-orange-100">
                <div className="flex flex-col h-64 md:h-80 p-4 md:p-8 items-center justify-center rounded-full shadow-[25px_25px_15px_15px_rgba(0,0,0,0.4)] bg-yellow-200">
                    <span className="font-extrabold text-black-300 text-4xl md:text-6xl">Spotlight</span>
                    <br />
                    <span className="text-black text-sm	md:text-base mt-2">A tool web application that builds and</span>
                    <span className="text-black text-sm	md:text-base mt-2">hosts developer portfolio pages.</span>
                </div>
            </div>
        </div>
    );
};

export default Home;
