import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"
import { toast } from "react-toastify"
import ProjectForm from "@/components/projects/ProjectForm"
import { ProjectFormData } from "@/types/index"
import { createProject } from "@/api/ProjectAPI"

export default function CreateProjectView() {

    const navigate = useNavigate()

    const initialValues : ProjectFormData = {
        projectName: "",
        clientName: "",
        description: ""
    }

    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })

    const mutation = useMutation ({
        mutationFn: createProject,
        onError:  (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            navigate('/')
        }
    })

    const handleForm =  (formData: ProjectFormData) => {
         mutation.mutate(formData)
      
    }

    return (
        <>
            <div className="max-w-3xl mx-auto">
                <h1 className='text-5xl font-black'> Create Project </h1>
                <p className='text-2xl font-light text-gray-500 mt-5'>Fill this form to create a project</p>
                <nav className='my-5'>
                    <Link className='bg-yellow-400 hover:bg-yellow-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors' to='/'> Go to My Projects </Link>
                </nav>

                <form className='mt-10 bg-white shadow-lg p-10 rounded-lg' onSubmit={handleSubmit(handleForm)} noValidate>
                    <ProjectForm 
                    register={register}
                    errors={errors}
                    />
                    <input type='submit' value='Create Project' className='bg-amber-400 hover:bg-amber-500 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors' />
                </form>
            </div>


        </>
    )
}