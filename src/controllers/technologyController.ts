import { Request, Response } from "express";
import { technologyService } from "../services/technologyService";
import { v4 as uuid } from "uuid";

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
    id: uuid(),
    title,
    studied: false,
    deadline: new Date(deadline),
    created_at: new Date(),
  };
  technologyService.createTechnology(username as string, technology);
  return res.status(201).json(technology);
};

const update = (req: Request, res: Response) => {
  const { username } = req.headers;
  const { id } = req.params;
  const { title, deadline } = req.body;
  technologyService.updateTechnology(username as string, id, title, deadline);
  return res.status(204).send();
}

const updateStatus = (req: Request, res: Response) => {
  const { username } = req.headers;
  const { id } = req.params;
  technologyService.updateTechnologyStatus(username as string, id);
  return res.status(204).send();
}

const destroy = (req: Request, res: Response) => {
  const { username } = req.headers;
  const { id } = req.params;
  technologyService.deleteTechnology(username as string, id);
  return res.status(204).send();
}

export const technologyController = {
  index,
  store,
  update,
  updateStatus,
  destroy
};
