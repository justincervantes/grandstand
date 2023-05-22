import { redirect } from 'next/dist/server/api-utils';

const Portfolio = ({ user }) => {
    const { image, name, description, slug, gitHubUrl, linkedInUrl } = user ?? {};
    return (
        <div className="text-center flex h-screen">
            <div className="m-auto">
                <img className="mx-auto mb-5 rounded-full w-64 w-64" src={image}></img>
                <p className="text-3xl font-bold md:text-4xl">{name}</p>
                <p className="text-gray-500 text-lg">{description}</p>
                <div className="flex justify-center">
                    <a href={`${slug}/projects`}>
                        <img
                            className="w-8 h-8 m-4"
                            src="https://cdn-icons-png.flaticon.com/256/5129/5129558.png"
                        ></img>
                    </a>
                    <a href={`${slug}/blog`}>
                        <img
                            className="w-8 h-8 m-4"
                            src="https://cdn-icons-png.flaticon.com/512/1187/1187544.png"
                        ></img>
                    </a>
                    <a href={gitHubUrl}>
                        <img className="w-8 h-8 m-4" src="https://cdn-icons-png.flaticon.com/512/25/25231.png"></img>
                    </a>
                    <a href={linkedInUrl}>
                        <img className="w-8 h-8 m-4" src="https://cdn-icons-png.flaticon.com/512/145/145807.png"></img>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Portfolio;

export async function getServerSideProps(context) {
    const slug = context?.query?.slug;
    const user = await prisma.user.findFirst({
        where: {
            slug,
        },
    });
    if (!user)
        return {
            redirect: { destination: '/404' },
        };
    return {
        props: { user: JSON.parse(JSON.stringify(user)) },
    };
}
