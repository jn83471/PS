import { Router } from "express";
import { UserController } from "../Controllers/UserController";
import { ValidateUserExcist } from "../Middlewares/params/ValidateUserId";
import { autenticate } from "../Middlewares/params/auth";
import { handleInputErrors } from "../Middlewares/params/validation";
import { body } from "express-validator";
import { ValidateBodyRol } from "../Middlewares/body/ValidateBodyRol";
import { ValidateBodyDepartament } from "../Middlewares/body/ValidateBodyDepartament";

const router = Router()

router.param('UsersId', ValidateUserExcist)

router.get('/', UserController.Index)
router.get('/User'
    ,autenticate
    ,UserController.ConfirmAccount
)

router.post('/Login'
    , body('Email').isEmail().withMessage('E-mail no valido')
    , body('Password').notEmpty().withMessage("Necesita llenar el campo de password")
    , handleInputErrors, UserController.Login)
router.get('/:UsersId', UserController.Show)
router.post('/', autenticate
    , body('Name').notEmpty().withMessage('El nombre no es valido')
    , body('Email').isEmail().withMessage('E-mail no valido')
    , body('Password').notEmpty().withMessage('La contraseña es requerida')
    , body('RolId').isNumeric().withMessage("Necesita un rol valido el usuario")
    , body('DepartmentId').isNumeric().withMessage("Necesita un departamento  valido")
    ,handleInputErrors
    ,ValidateBodyRol
    ,ValidateBodyDepartament
    , UserController.Create)
router.put('/:UsersId'
    , body('Name').notEmpty().withMessage('El nombre no es valido')
    , body('RolId').isNumeric().withMessage("Necesita un rol valido el usuario")
    , body('DepartmentId').isNumeric().withMessage("Necesita un departamento  valido")
    ,ValidateBodyRol
    ,ValidateBodyDepartament
    ,autenticate, UserController.Update)
router.delete('/:UsersId', autenticate, UserController.Delete)





export default router