import ProjectForm from "./ProjectForm"
import { Link } from "react-router-dom"
import { ProjectFormData } from "@/types/index"
import { useForm } from "react-hook-form"

type EditProjectFromProps = {
    data: ProjectFormData
}

export default function EditProjectFrom({data} : EditProjectFromProps){

    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: {
        projectName: data.projectName,
        clientName: data.clientName,
        description: data.description
    } })

    const handleForm = (formData : ProjectFormData) => {

    }

    return (
        <>
            <div className="max-w-3xl mx-auto">
                <h1 className='text-5xl font-black'> Edit Project </h1>
                <p className='text-2xl font-light text-gray-500 mt-5'>Fill this form to edit a project</p>
                <nav className='my-5'>
                    <Link className='bg-yellow-400 hover:bg-yellow-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors' to='/'> Go to My Projects </Link>
                </nav>

                <form className='mt-10 bg-white shadow-lg p-10 rounded-lg' onSubmit={handleSubmit(handleForm)} noValidate>
                    <ProjectForm 
                    register={register}
                    errors={errors}
                    />
                    <input type='submit' value='Save Changes' className='bg-amber-400 hover:bg-amber-500 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors' />
                </form>
            </div>


        </>
    )
}