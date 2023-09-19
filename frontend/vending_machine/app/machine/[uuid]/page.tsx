export default function Page({ params }: { params: { uuid: string } }) {
    return <div>Machine ID: {params.uuid}</div>;
}
