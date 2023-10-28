import { PrismaClient } from "@prisma/client";
import { PostTechnologyDTO, TechnologyDTO } from "../dtos/technologiesDTO";
import { userService } from "./userService";
import { InternalServerError, NotFoundError } from "../helpers/api-errors";

const prisma = new PrismaClient();

const TechnologyExists = async (id: string, username: string) => {
  const technology = await findTechnology(id, username);
  if (!technology) {
    return false;
  }
  return true;
};

const findTechnology = async (id: string, username: string) => {
  const user = await userService.findUserByUsername(username);
  const technology = await prisma.technology.findUnique({
    where: {
      id,
      userId: user?.id,
    },
  });
  if (!technology) {
    throw new NotFoundError("Technology Not Found");
  }
  return technology as TechnologyDTO;
};

const findAllTechnologies = async (username: string) => {
  const user = await userService.findUserByUsername(username);
  const technologies = await prisma.technology.findMany({
    where: {
      userId: user?.id,
    },
  });

  return technologies as TechnologyDTO[];
};

const createTechnology = async (
  username: string,
  technology: PostTechnologyDTO
) => {
  const user = await userService.findUserByUsername(username);
  const newTechnology = await prisma.technology.create({
    data: {
      title: technology.title,
      studied: false,
      deadline: new Date(technology.deadline),
      userId: user?.id,
    },
  });

  if (!newTechnology) {
    console.log(newTechnology);
    throw new InternalServerError("Internal Server Error");
  }
  return newTechnology;
};

const updateTechnology = async (
  username: string,
  id: string,
  title?: string,
  deadline?: Date
) => {
  const user = await userService.findUserByUsername(username);
  if (!(await TechnologyExists(id, username))) {
    throw new NotFoundError("Technology Not Found");
  }
  const technology = await findTechnology(id, username);
  const updatedTechnology = await prisma.technology.update({
    where: {
      id,
      userId: user?.id,
    },
    data: {
      title: title || technology?.title,
      deadline: new Date(deadline!) || technology?.deadline,
    },
  });
  if (!updatedTechnology) {
    throw new InternalServerError("Internal Server Error");
  }
  return updatedTechnology;
};

const updateTechnologyStatus = async (username: string, id: string) => {
  const user = await userService.findUserByUsername(username);
  if (!(await TechnologyExists(id, username))) {
    throw new NotFoundError("Technology Not Found");
  }
  const technology = await findTechnology(id, username);
  const updatedTechnology = await prisma.technology.update({
    where: {
      id,
      userId: user?.id,
    },
    data: {
      studied: !technology?.studied,
    },
  });
  if (!updatedTechnology) {
    throw new InternalServerError("Internal Server Error");
  }
  return updatedTechnology;
};

const deleteTechnology = async (username: string, id: string) => {
  const user = await userService.findUserByUsername(username);
  if (!(await TechnologyExists(id, username))) {
    throw new NotFoundError("Technology Not Found");
  }
  const deletedTechnology = await prisma.technology.delete({
    where: {
      id,
      userId: user?.id,
    },
  });
  if (!deletedTechnology) {
    throw new InternalServerError("Internal Server Error");
  }
  return deletedTechnology;
};

export const technologyService = {
  findTechnology,
  findAllTechnologies,
  createTechnology,
  updateTechnology,
  updateTechnologyStatus,
  deleteTechnology,
};
