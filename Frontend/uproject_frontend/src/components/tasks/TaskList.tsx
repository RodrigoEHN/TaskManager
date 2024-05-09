import { Task } from "@/types/index"
import TaskCard from "./TaskCard"
//import { statusTranslations } from '@/locales/en';

type TaskListProps = {
    tasks: Task[]
}

type GroupedTasks = {
    [key: string]: Task[]
}

const initialStatusGroups: GroupedTasks = {
    pending: [],
    onHold: [],
    inProgress: [],
    underReview: [],
    completed: []
}

const statusStyles : {[key: string] : string} = {
    pending: 'border-t-slate-400',
    onHold: 'border-t-red-400',
    inProgress: 'border-t-blue-400',
    underReview: 'border-t-amber-400',
    completed: 'border-t-emerald-400',
}

const statusTranslations : {[key: string] : string} = {
    pending: 'Pending',
    onHold: 'On Hold',
    inProgress: 'In Progress',
    underReview: 'Under Review',
    completed: 'Completed',
}

export default function TaskList({ tasks }: TaskListProps) {

    const groupedTasks = tasks.reduce((acc, task) => {
        let currentGroup = acc[task.status] ? [...acc[task.status]] : [];
        currentGroup = [...currentGroup, task]
        return { ...acc, [task.status]: currentGroup };
    }, initialStatusGroups);

    return (
        <>
            <h2 className="text-5xl font-black my-10">Tasks</h2>

            <div className='flex gap-5 overflow-x-scroll 2xl:overflow-auto pb-32'>
                {Object.entries(groupedTasks).map(([status, tasks]) => (
                    <div key={status} className='min-w-[300px] 2xl:min-w-0 2xl:w-1/5'>

                        <h3 className={`capitalize tex-xl font-light border border-slate-300 bg-white p-3 border-t-8 ${statusStyles[status]}`}>{statusTranslations[status]}</h3>

                        <ul className='mt-5 space-y-5'>
                            {tasks.length === 0 ? (
                                <li className="text-gray-500 text-center pt-3">No tasks avaiable</li>
                            ) : (
                                tasks.map(task => <TaskCard key={task._id} task={task} />)
                            )}
                        </ul>
                    </div>
                ))}
            </div>
        </>
    )
}