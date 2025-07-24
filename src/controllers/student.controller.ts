import { Request, Response, NextFunction } from 'express';
import { getAll, create, get, deleteByID, edit } from '../services/student.service';
import { StatusCodes } from 'http-status-codes';

export async function index(req: Request, res: Response, next: NextFunction) {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.itemsPerPage as string) || 10;
    const sortField = (req.query['sortBy[0][key]'] as string) || 'user.name';
    const sortDirection = (req.query['sortBy[0][order]'] as string) === 'desc' ? 'desc' : 'asc';

    const searchField = (req.query.search as string)
    const search = !!searchField?.trim() ? searchField : null;

    const result = await getAll(page, limit, sortField, sortDirection, search);
    res.json(result);
  } catch (err) {
    next(err);
  }
}
export async function store(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await create(req.body);
    res.status(StatusCodes.CREATED).json(result);
  } catch (err) {
    next(err);
  }
}

export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const result = await edit(id, req.body);
    res.status(StatusCodes.OK).json(result);
  } catch (err) {
    next(err);
  }
}

export async function show(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const result = await get(id);
    res.status(StatusCodes.OK).json(result);
  } catch (err) {
    next(err);
  }
}

export async function destroy(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    await deleteByID(id);
    res.status(StatusCodes.NO_CONTENT).end();
  } catch (err) {
    next(err);
  }
}
