import { Request, Response } from "express";
import { technologyService } from "../services/technologyService";
import { randomUUID } from "crypto";

const index = (req: Request, res: Response) => {
  const { username } = req.headers;
  const technologies = technologyService.findAllTechnologies(
    username as string
  );
  return res.json(technologies);
};

const store = (req: Request, res: Response) => {
  const { username } = req.headers;
  const { title, deadline } = req.body;
  const technology = {
    id: randomUUID(),
    title,
    studied: false,
    deadline: new Date(deadline),
    created_at: new Date(),
  };
  technologyService.createTechnology(username as string, technology);
  return res.status(201).json(technology);
};

export const technologyController = {
  index,
  store,
};
