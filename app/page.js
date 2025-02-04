export default function Home() {
    return (
        <div className={"text-center"}>
            <h1 className={"text-2xl font-bold"}>CPRG306:Web Development 2 - Assignments</h1>
            <ul>
                <li className="list-unstyled">
                    <a href={"/week-2"} className="text-blue-500 underline">Go to Week-2 Page</a>
                </li>
                <li className="list-unstyled">
                    <a href={"/week-3"} className="text-blue-500 underline">Go to Week-3 Page</a>
                </li>
            </ul>
        </div>
    );
}
