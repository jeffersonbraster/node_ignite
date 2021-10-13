import { CreateCategoryController } from "@modules/cars/useCases/createCategory/CreateCategoryController";
import { ImportCategoryController } from "@modules/cars/useCases/importCategory/ImportCategoryController";
import { ListCategoriesController } from "@modules/cars/useCases/listCatefories/ListCategoriesController";
import { Router } from "express";
import multer from "multer";

const categoriesRouter = Router();

const upload = multer({ dest: "./tmp" });

const createCategoryController = new CreateCategoryController();

const importCategoryController = new ImportCategoryController();

const listCategoriesController = new ListCategoriesController();

categoriesRouter.post("/", createCategoryController.handle);

categoriesRouter.get("/", listCategoriesController.handle);

categoriesRouter.post(
  "/import",
  upload.single("file"),
  importCategoryController.handle
);

export { categoriesRouter };
