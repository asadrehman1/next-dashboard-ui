"use server";

import { SubjectSchema } from "./formValidationSchemas";
import { prisma } from "./prisma";


export const createSubject = async (
    currentState:{success: boolean, error: boolean},
    data:SubjectSchema) => {
    try {
        await prisma.subject.create({
            data:{
                name: data.name,
                teachers: {
                    connect: data.teachers.map(teacherId => ({id: teacherId}))
                }
            }
        })
        return { success: true, error: false};
    } catch (error) {
        console.log(error);
        return { success: false, error: true};
    }
}
export const updateSubject = async (
    currentState: { success: boolean, error: boolean },
    data: SubjectSchema) => {
    try {
        await prisma.subject.update({
            where:{
                id: data.id
            },
            data: {
                name: data.name,
                teachers: {
                    set: data.teachers.map((teacherId) => ({ id: teacherId })) 
                }
            }
        })
        return { success: true, error: false };
    } catch (error) {
        return { success: false, error: true };
    }
}
export const deleteSubject = async (
    currentState: { success: boolean, error: boolean },
    data: FormData) => {

    const id = data.get("id") as string;

    try {
        await prisma.subject.delete({
            where: {
                id: parseInt(id)
            }
        })
        return { success: true, error: false };
    } catch (error) {
        return { success: false, error: true };
    }
}