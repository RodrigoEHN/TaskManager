import { Navigate, useNavigate, useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { getProjectsById } from "@/api/ProjectAPI"
//import EditProjectFrom from "@/components/projects/EditProjectForm"
import AddTaskModal from "@/components/tasks/AddTaskModal"
import TaskList from "@/components/tasks/TaskList"
import EditTaskData from "@/components/tasks/EditTaskData"
import TaskModalDetails from "@/components/tasks/TaskModalDetails"


export default function ProjectDetailsView() {
    
    const navigate = useNavigate()

    const params = useParams()
    const projectId = params.projectId!

    const { data, isLoading, isError } = useQuery({
        queryKey: ['project', projectId],
        queryFn: () => getProjectsById(projectId),
        // retry: false
    })

    if(isLoading) return 'Loading...'
    if (isError) return <Navigate to={'/404'} />

    if (data) return (
        <>
            <h1 className="text-5xl font-black">{data.projectName}</h1>
            <p className="text-2xl font-light text-gray-500 mt-5">{data.description}</p>

            <nav className="my-5 flex gap-3">
                <button type="button" className="bg-yellow-400 hover:bg-yellow-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors rounded-2xl" onClick={() => navigate(location.pathname + '?newTask=true') } >
                    Add Tasks
                </button>
            </nav>

            <TaskList tasks={data.tasks}/>

            <AddTaskModal/>
            <EditTaskData/>
            <TaskModalDetails/>
    

        </>
    )
    



}