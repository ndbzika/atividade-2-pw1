import { Request, Response } from "express";
import { technologyService } from "../services/technologyService";
import { v4 as uuid } from "uuid";
import { BadRequestError, NotFoundError } from "../helpers/api-errors";

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
  if (!title || !deadline) {
    throw new BadRequestError("Title and deadline are required");
  }
  const technology = {
    id: uuid(),
    title,
    studied: false,
    deadline: new Date(deadline),
    created_at: new Date(),
  };
  const createdTech = technologyService.createTechnology(
    username as string,
    technology
  );
  if (!createdTech) {
    throw new BadRequestError("Technology already exists");
  }
  return res.status(201).json(technology);
};

const update = (req: Request, res: Response) => {
  const { username } = req.headers;
  const { id } = req.params;
  const { title, deadline } = req.body;
  if (!title && !deadline) {
    throw new BadRequestError("Title or deadline are required");
  }
  const updatedTech = technologyService.updateTechnology(
    username as string,
    id,
    title,
    deadline
  );
  if (!updatedTech) {
    throw new NotFoundError("Technology not found");
  }
  return res.status(204).send();
};

const updateStatus = (req: Request, res: Response) => {
  const { username } = req.headers;
  const { id } = req.params;
  const updatedTech = technologyService.updateTechnologyStatus(
    username as string,
    id
  );
  if (!updatedTech) {
    throw new NotFoundError("Technology not found");
  }
  return res.status(204).send();
};

const destroy = (req: Request, res: Response) => {
  const { username } = req.headers;
  const { id } = req.params;
  const deletedTech = technologyService.deleteTechnology(
    username as string,
    id
  );
  if (!deletedTech) {
    throw new NotFoundError("Technology not found");
  }
  return res.status(204).send();
};

export const technologyController = {
  index,
  store,
  update,
  updateStatus,
  destroy,
};
