import { db } from "../database/db";
import { TechnologyDTO } from "../dtos/technologiesDTO";
import { userService } from "./userService";

const TechnologyExists = (id: string, username: string) => {
  const technology = findTechnology(id, username);
  if (!technology) {
    return false;
  }
  return true;
};

const findTechnology = (id: string, username: string) => {
  const user = userService.findUserByUsername(username);
  const technology = db.find(() =>
    user?.technologies.find((technology: TechnologyDTO) => technology.id === id)
  );
  if (!technology) {
    return false;
  }
  return technology as unknown as TechnologyDTO;
};

const findAllTechnologies = (username: string) => {
  const user = userService.findUserByUsername(username);
  return user?.technologies;
};

const createTechnology = (username: string, technology: TechnologyDTO) => {
  if (TechnologyExists(technology.id, username)) {
    return false;
  }
  const user = userService.findUserByUsername(username);
  user?.technologies.push(technology);
  return user;
};

const updateTechnology = (
  username: string,
  id: string,
  title: string,
  deadline: Date
) => {
  const user = userService.findUserByUsername(username);
  if (!TechnologyExists(id, username)) {
    return false;
  }
  user?.technologies.map((tech) => {
    if (tech.id === id) {
      tech.title = title || tech.title;
      tech.deadline = deadline || tech.deadline;
    }
  });
  return true;
};

const updateTechnologyStatus = (username: string, id: string) => {
  const user = userService.findUserByUsername(username);
  if (!TechnologyExists(id, username)) {
    return false;
  }
  user?.technologies.map((tech: TechnologyDTO) => {
    if (tech.id === id) {
      tech.studied = true;
    }
  });
  return true;
};

const deleteTechnology = (username: string, id: string) => {
  const user = userService.findUserByUsername(username);
  if (!TechnologyExists(id, username)) {
    return false;
  }
  const technology = findTechnology(id, username);
  const index = user?.technologies.indexOf(technology as TechnologyDTO);
  user?.technologies.splice(index!, 1);
  return true;
};

export const technologyService = {
  findTechnology,
  findAllTechnologies,
  createTechnology,
  updateTechnology,
  updateTechnologyStatus,
  deleteTechnology,
};
