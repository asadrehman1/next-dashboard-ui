"use server";

import { ClassSchema, SubjectSchema, TeacherSchema } from "./formValidationSchemas";
import { prisma } from "./prisma";
import { clerkClient } from "@clerk/nextjs/server";

//Subject Actions
export const createSubject = async (
    currentState: { success: boolean, error: boolean },
    data: SubjectSchema) => {
    try {
        await prisma.subject.create({
            data: {
                name: data.name,
                teachers: {
                    connect: data.teachers.map(teacherId => ({ id: teacherId }))
                }
            }
        })
        return { success: true, error: false };
    } catch (error) {
        console.log(error);
        return { success: false, error: true };
    }
}
export const updateSubject = async (
    currentState: { success: boolean, error: boolean },
    data: SubjectSchema) => {
    try {
        await prisma.subject.update({
            where: {
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

//Class actions
export const createClass = async (
    currentState: { success: boolean, error: boolean },
    data: ClassSchema) => {
    try {
        await prisma.class.create({
            data
        })
        return { success: true, error: false };
    } catch (error) {
        console.log(error);
        return { success: false, error: true };
    }
}
export const updateClass = async (
    currentState: { success: boolean, error: boolean },
    data: ClassSchema) => {
    try {
        await prisma.class.update({
            where: {
                id: data.id
            },
            data
        })
        return { success: true, error: false };
    } catch (error) {
        console.log(error);
        return { success: false, error: true };
    }
}
export const deleteClass = async (
    currentState: { success: boolean, error: boolean },
    data: FormData) => {

    const id = data.get("id") as string;

    try {
        await prisma.class.delete({
            where: {
                id: parseInt(id)
            }
        })
        return { success: true, error: false };
    } catch (error) {
        return { success: false, error: true };
    }
}

//Teacher actions
export const createTeacher = async (
    currentState: { success: boolean, error: boolean },
    data: TeacherSchema) => {
    try {
        const user = await (await clerkClient()).users.createUser({
            username: data.username,
            password: data.password,
            firstName: data.name,
            lastName: data.surname,
            publicMetadata: { role: "teacher" }
        });
        await prisma.teacher.create({
            data: {
                id: user.id,
                username: data.username,
                name: data.name,
                surname: data.surname,
                email: data.email || null,
                phone: data.phone || null,
                address: data.address,
                img: data.img || null,
                bloodType: data.bloodType,
                sex: data.sex,
                birthday: data.birthday,
                subjects: {
                    connect: data.subjects?.map((subjectId: string) => ({
                        id: parseInt(subjectId),
                    })),
                },
            },
        });

        return { success: true, error: false };
    } catch (error) {
        console.log(error);
        return { success: false, error: true };
    }
}
export const updateTeacher = async (
    currentState: { success: boolean, error: boolean },
    data: TeacherSchema) => {

    if (!data.id) {
        return { success: false, error: true };
    }

    try {
        const user = await (await clerkClient()).users.updateUser(data.id, {
            username: data.username,
            ...(data.password !== "" && { password: data.password }),
            firstName: data.name,
            lastName: data.surname,
            publicMetadata: { role: "teacher" }
        });
        await prisma.teacher.update({
            where:{
                id: data.id
            },
            data: {
                ...(data.password !== "" && { password: data.password}),
                username: data.username,
                name: data.name,
                surname: data.surname,
                email: data.email || null,
                phone: data.phone || null,
                address: data.address,
                img: data.img || null,
                bloodType: data.bloodType,
                sex: data.sex,
                birthday: data.birthday,
                subjects: {
                    set: data.subjects?.map((subjectId: string) => ({
                        id: parseInt(subjectId),
                    })),
                },
            },
        });
        return { success: true, error: false };
    } catch (error) {
        console.log(error);
        return { success: false, error: true };
    }
}
export const deleteTeacher = async (
    currentState: { success: boolean, error: boolean },
    data: FormData) => {

    const id = data.get("id") as string;

    try {
        await prisma.teacher.delete({
            where: {
                id: id
            }
        })
        return { success: true, error: false };
    } catch (error) {
        return { success: false, error: true };
    }
}