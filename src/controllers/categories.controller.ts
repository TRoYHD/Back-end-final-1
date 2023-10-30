import { NextFunction, Request, RequestHandler, Response } from 'express';
import { Category, Product,  } from '../models';
import { CustomError } from '../middlewares/errors';
import httpStatus from 'http-status';
import cloudinary from '../config/cloudinary.config';
import validateCategory from '../validators/category.validator';
import { PaginationQuery, Params } from '../interfaces';

const getCategories: RequestHandler = async (
  _req: Request,
  res: Response<Category[]>
) => {
  const categories = await Category.findAll();

  res.json(categories);
};

const getCategory: RequestHandler<Params> = async (
  req: Request<Params>,
  res: Response<Category>
) => {
  const { id } = req.params;

  const category = await Category.findByPk(id);

  if (!category)
    throw new CustomError('Category not found', httpStatus.NOT_FOUND);

  res.json(category);
};

const getCategoryProducts: RequestHandler<
  Params,
  object,
  object,
  PaginationQuery
> = async (
  req: Request<Params, object, object, PaginationQuery>,
  res: Response
) => {
  const page = req.query.page ? parseInt(req.query.page) : 1;
  const perPage = req.query.perPage ? parseInt(req.query.perPage) : 1;
  const { id } = req.params;

  const { count, rows } = await Product.findAndCountAll({
    include: [
      {
        model: Category,
        where: {
          id
        },
        attributes: []
      },
      
    ],
    offset: (page - 1) * perPage,
    limit: perPage,
    distinct: true
  });

  res.json({ count, rows });
};

const createCategory: RequestHandler<Params, object, Category> = async (
  req: Request<Params, object, Category>,
  res: Response
) => {
  const body = validateCategory(req.body);

  const { name, description } = body;

  if (req.files && req.files.image && !Array.isArray(req.files.image)) {
    const imgTempPath = req.files.image.tempFilePath;
    const result = await cloudinary.uploader.upload(imgTempPath);

    const image = result.url;

    const category = await Category.create({
      name,
      description,
      image
    });

    return res.status(httpStatus.CREATED).json(category);
  }

  res
    .status(httpStatus.UNPROCESSABLE_ENTITY)
    .json({ msg: 'Please upload an image' });
};

export {
  getCategories,
  getCategory,
  createCategory,
  getCategoryProducts as getProductsCategory
};
