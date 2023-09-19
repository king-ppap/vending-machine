export default function Page({ params }: { params: { uuid: string } }) {
    return <div>My Post: {params.uuid}</div>;
}
