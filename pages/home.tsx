const Home = () => {
    return (
        <div className="grid grid-flow-col p-1 min-h-[80vh]">
            <div className="flex flex-col items-center rounded-lg justify-center bg-orange-100">
                <div className="flex flex-col h-64 items-center justify-center rounded-full shadow-2xl bg-yellow-200">
                    <span className="font-extrabold text-black-300 text-6xl">Spotlight</span>
                    <span className="text-black mt-2">Little explanation</span>
                </div>
            </div>
        </div>
    );
};

export default Home;
