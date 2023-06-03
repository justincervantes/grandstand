import Image from 'next/image';
import EditingLayout from '../components/layout';

const Home = () => {
    return (
        <EditingLayout>
            <div className="grid grid-flow-col p-1 min-h-[80vh]">
                <div className="flex flex-col items-center justify-center bg-white rounded-lg">
                    <Image src="/logo.png" width={124} height={124} alt="" />
                    <span className="mb-3 text-4xl">Grandstand</span>
                    <p>A quick tool to get a developer's profile hosted</p>
                </div>
            </div>
        </EditingLayout>
    );
};

export default Home;
