import { TechnologyDTO } from "./technologiesDTO";

export type UserDTO = {
  id: string;
  name: string;
  username: string;
  technologies: TechnologyDTO[];
};
