import { ResourceWhereInput } from "../../../generated/prisma/models";
import { IRequestUser } from "../../interface/requestUser.interface";
import { prisma } from "../../lib/prisma";
import { TCreateResourcePayload } from "./resource.interface";

const CreateResource=async(payload:any,user:IRequestUser)=>{
    console.log(payload,'payload')
    const resource=await prisma.resource.create({
        data:{
            ...payload,
            userId:user.userId
        }
    })
    return resource

}

const GetAllResource = async (
    query?: Record<string, any>,
    page?: number,
    limit?: number | undefined,
    skip?: number,
    sortBy?: string | undefined,
    sortOrder?: string | undefined,
    search?: any
) => {
    console.log(search,"searchss")

    const andConditions: ResourceWhereInput[] | ResourceWhereInput = [];
    const orConditions: any[] = [];

    if (search) {
        orConditions.push(
          {
            title: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            description: {
              contains: search,
              mode: "insensitive",
            },
          },
         {
            tags: {
                has: search,
              },
          }
        );
      }

     if(orConditions.length>0){
        andConditions.push({OR:orConditions})
     }
    const resources = await prisma.resource.findMany({
        take:limit,
        skip,
        where: { AND: andConditions }
    });
    return resources;
};
const GetSingleResource = async (id: string) => {
    if (!id) {
        throw new Error("Resource ID is required.");
    }

    const resource = await prisma.resource.findUnique({
        where: { id },
    });

    if (!resource) {
        throw new Error("Resource not found");
    }

    return resource;
};

const DeleteResource = async (id: string, userId: string) => {
    if (!id) {
        throw new Error("Resource ID is required.");
    }
    if (!userId) {
        throw new Error("User ID is required.");
    }

    const resource = await prisma.resource.findUnique({
        where: { id },
    });

    if (!resource) {
        throw new Error("Resource not found");
    }

    if (resource.userId !== userId) {
        throw new Error("You are not authorized to delete this resource.");
    }

    // Delete the resource
    const deletedResource = await prisma.resource.delete({
        where: { id },
    });

    return deletedResource;
};


export const ResouceService={
    CreateResource,
    GetAllResource,
    GetSingleResource,
    DeleteResource
}