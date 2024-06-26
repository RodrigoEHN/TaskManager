import api from "@/lib/axios";
import { Project, ProjectFormData, dashboarProjectSchema } from "@/types/index";
import { isAxiosError } from "axios";


export async function createProject( formData : ProjectFormData ) {
    try {
        const {data} = await api.post('/projects', formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
        
    }
}

export async function getProjects(  ) {
    try {
        const {data} = await api('/projects')
        const response = dashboarProjectSchema.safeParse(data)
        if (response.success) {
            return response.data
        }
        
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
        
    }
}

export async function getProjectsById( id : Project['_id'] ) {
    try {
        const {data} = await api(`/projects/${id}`)
        return(data)

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
        
    }
}

type ProjecyAPIType = {
    formData: ProjectFormData,
    projectId: Project['_id']
}

export async function updateProject({formData, projectId} : ProjecyAPIType) {
    try {
        const {data} = await api.put<string>(`/projects/${projectId}` , formData)
        return(data)

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
        
    }
}

export async function deleteProject( id : Project['_id'] ) {
    try {
        const url = `/projects/${id}`
        const {data} = await api.delete<string>(url)
        return(data)

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
        
    }
}