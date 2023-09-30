import { db } from "../database/db";
import { TechnologyDTO } from "../dtos/technologiesDTO";
import { userService } from "./userService";

const TechnologyExists = (id: string, username: string) => {
  const user = userService.UserExists(username);
  if (!user) {
    return false;
  }
  const technology = findTechnology(id, username);
  if (!technology) {
    return false;
  }
  return true;
};

const findTechnology = (id: string, username: string) => {
  if (!TechnologyExists(id, username)) {
    return false;
  }
  const user = userService.findUserByUsername(username);
  const technology = db.find(() =>
    user?.technologies.find((technology: TechnologyDTO) => technology.id === id)
  );
  return technology as unknown as TechnologyDTO;
};

const findAllTechnologies = (username: string) => {
  if (!userService.UserExists(username)) {
    return false;
  }
  const user = userService.findUserByUsername(username);
  return user?.technologies;
};

const createTechnology = (username: string, technology: TechnologyDTO) => {
  if (!userService.UserExists(username)) {
    return false;
  }
  const user = userService.findUserByUsername(username);
  user?.technologies.push(technology);
};

const updateTechnology = (
  username: string,
  id: string,
  title: string,
  deadline: Date
) => {
  if (!userService.UserExists(username)) {
    return false;
  }
  const user = userService.findUserByUsername(username);
  if (!TechnologyExists(id, username)) {
    return false;
  }
  const tech = user?.technologies.map((tech) => {
    if (tech.id === id) {
      tech.title = title || tech.title;
      tech.deadline = deadline || tech.deadline;
    }
  });
  return tech;
};

const updateTechnologyStatus = (username: string, id: string) => {
  if (!userService.UserExists(username)) {
    return false;
  }
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
  if (!userService.UserExists(username)) {
    return false;
  }
  const user = userService.findUserByUsername(username);
  if (!TechnologyExists(id, username)) {
    return false;
  }
  const technology = findTechnology(id, username);
  const index = user?.technologies.indexOf(technology as TechnologyDTO);
  user?.technologies.splice(index!, 1);
};

export const technologyService = {
  findTechnology,
  findAllTechnologies,
  createTechnology,
  updateTechnology,
  updateTechnologyStatus,
  deleteTechnology,
};
