import { Request, Response } from "express";
import { technologyService } from "../services/technologyService";
import { BadRequestError } from "../helpers/api-errors";

const index = async (req: Request, res: Response) => {
  const { username } = req.headers;
  const technologies = await technologyService.findAllTechnologies(
    username as string
  );
  return res.json(technologies);
};

const store = async (req: Request, res: Response) => {
  const { username } = req.headers;
  const { title, deadline } = req.body;
  if (!title || !deadline) {
    throw new BadRequestError("Title and deadline are required");
  }
  const createdTech = await technologyService.createTechnology(
    username as string,
    req.body
  );
  return res.status(201).json(createdTech);
};

const update = async (req: Request, res: Response) => {
  const { username } = req.headers;
  const { id } = req.params;
  const { title, deadline } = req.body;
  if (!title && !deadline) {
    throw new BadRequestError("Title or deadline are required");
  }
  await technologyService.updateTechnology(
    username as string,
    id,
    title,
    deadline
  );
  return res.status(204).send();
};

const updateStatus = async (req: Request, res: Response) => {
  const { username } = req.headers;
  const { id } = req.params;
  await technologyService.updateTechnologyStatus(username as string, id);
  return res.status(204).send();
};

const destroy = async (req: Request, res: Response) => {
  const { username } = req.headers;
  const { id } = req.params;
  await technologyService.deleteTechnology(username as string, id);
  return res.status(204).send();
};

export const technologyController = {
  index,
  store,
  update,
  updateStatus,
  destroy,
};
