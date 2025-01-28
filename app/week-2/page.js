import StudentInfo from "@/app/week-2/student-info";

export default function Page()
{
    const studentDict = {
        "Wenhan Liu": "https://github.com/Hamabi-Minami?tab=repositories"
    }

    return(
        <main>
            <h1>shopping List</h1>
            <StudentInfo name={"Wenhan Liu"} githubLink={"https://github.com/Hamabi-Minami?tab=repositories"}></StudentInfo>
        </main>
    )
}