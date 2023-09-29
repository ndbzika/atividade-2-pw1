import { db } from "../database/db";
import { TechnologyDTO } from "../dtos/technologiesDTO";

const findTechnology = (id: string, username: string) => {
  const user = db.find((user) => user.username === username);
  const technology = db.find(() =>
    user?.technologies.find((technology) => technology.id === id)
  );
  return technology;
};

const findAllTechnologies = (username: string) => {
  const user = db.find((user) => user.username === username);
  return user?.technologies;
};

const createTechnology = (username: string, technology: TechnologyDTO) => {
  const user = db.find((user) => user.username === username);
  user?.technologies.push(technology);
};

export const technologyService = {
  findTechnology,
  findAllTechnologies,
  createTechnology,
};
