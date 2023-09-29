import { db } from "../database/db";
import { TechnologyDTO } from "../dtos/technologiesDTO";

const findTechnology = (id: string, username: string) => {
  const user = db.find((user) => user.username === username);
  const technology = db.find(() =>
    user?.technologies.find((technology: TechnologyDTO) => technology.id === id)
  );
  return technology as unknown as TechnologyDTO;
};

const findAllTechnologies = (username: string) => {
  const user = db.find((user) => user.username === username);
  return user?.technologies;
};

const createTechnology = (username: string, technology: TechnologyDTO) => {
  const user = db.find((user) => user.username === username);
  user?.technologies.push(technology);
};

const updateTechnology = (username: string, id: string ,title: string, deadline:Date) => {
  const technology = findTechnology(id, username);
  technology.title = title || technology.title;
  technology.deadline = new Date(deadline) || technology.deadline;
}

const updateTechnologyStatus = (username: string, id: string) => {
  const technology = findTechnology(id, username);
  technology.studied = true;
}

const deleteTechnology = (username: string, id: string) => {
  const technology = findTechnology(id, username);
  const user = db.find((user) => user.username === username);
  const index = user?.technologies.indexOf(technology);
  user?.technologies.splice(index!, 1);
}

export const technologyService = {
  findTechnology,
  findAllTechnologies,
  createTechnology,
  updateTechnology,
  updateTechnologyStatus,
  deleteTechnology
};
