

export default function StudentInfo({name, githubLink})
{
    return(
        <div>
            <h2>{name}</h2>
            <a className="text-blue-500 underline" href={githubLink}>My GitHub</a>
        </div>
    )
}
