import Router from 'next/router';

const Portfolio = ({ user }) => {
    console.log('user', user);
    return <div>Hello world</div>;
};

export default Portfolio;

export async function getServerSideProps(context) {
    const slug = context?.query?.slug[0];

    console.log('slug', slug);
    const user = await prisma.user.findFirstOrThrow({
        where: {
            slug,
        },
    });
    return {
        props: { user: JSON.parse(JSON.stringify(user)) },
    };
}
