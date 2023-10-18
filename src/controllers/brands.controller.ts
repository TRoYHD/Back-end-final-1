import { Request, RequestHandler, Response } from 'express';
import { Brand } from '../models';
import { CustomError } from '../middlewares/errors';
import httpStatus from 'http-status';
import cloudinary from '../config/cloudinary.config';
import { validateBrand } from '../validators';
import { Params } from '../interfaces';

const getBrands: RequestHandler = async (
  _req: Request,
  res: Response<Brand[]>
) => {
  const brands = await Brand.findAll();

  res.json(brands);
};

const getBrand: RequestHandler<Params> = async (
  req: Request<Params>,
  res: Response<Brand>
) => {
  const { id } = req.params;

  const brand = await Brand.findByPk(id);

  if (!brand) throw new CustomError('Brand not found', httpStatus.NOT_FOUND);

  res.json(brand);
};

const createBrand: RequestHandler<Params, object, Brand> = async (
  req: Request<Params, object, Brand>,
  res: Response
  
) => {
  console.log('Request Body:', req.body);
console.log('Request Files:', req.files);
  const body = validateBrand(req.body);

  // Trim field names
  const name = body.name.trim();
  const description = body.description.trim();

  if (req.files && req.files.image && !Array.isArray(req.files.image)) {
    const imgTempPath = req.files.image.tempFilePath;
    const result = await cloudinary.uploader.upload(imgTempPath);

    const image = result.url;

    const brand = await Brand.create({
      name,
      description,
      image
    });

    return res.status(httpStatus.CREATED).json(brand);
  }

  res
    .status(httpStatus.UNPROCESSABLE_ENTITY)
    .json({ msg: 'Please upload an image' });
};

export { getBrands, getBrand, createBrand };
