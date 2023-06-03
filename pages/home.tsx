import Image from 'next/image';
import EditingLayout from '../components/layout';

const Home = () => {
    return (
        <EditingLayout>
            <div className="grid grid-flow-col p-1 min-h-[80vh]">
                <div className="flex flex-col items-center justify-center bg-white rounded-lg">
                    <span className="mb-3 text-4xl font-bold">grandstand.dev</span>
                    <p className="text-center">A quick tool to get a developer's profile hosted</p>
                </div>
            </div>
        </EditingLayout>
    );
};

export default Home;
