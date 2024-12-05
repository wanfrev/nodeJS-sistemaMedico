const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const specialtyController = require('../controllers/specialtyController');
const departmentController = require('../controllers/departmentController');
const employeeController = require('../controllers/employeeController');
const profileController = require('../controllers/profileController');
const dispatcher = require('../../Dispatcher/dispatcher');
const { validate } = require('../middlewares/validationMiddleware');
const { loginValidation, registerValidation } = require('../validations/userValidations');
const { recoverPasswordValidation } = require('../validations/authValidations');
const { processMethodValidation } = require('../validations/methodValidations');


// Ruta protegida con Dispatcher y validación
router.post(
    '/process-method',
    validate(processMethodValidation), // Validación de datos
    dispatcher(['user', 'admin']), // Validación de sesión y permisos
    userController.processMethod
);

// Rutas públicas con validaciones
router.post('/login', validate(loginValidation), userController.login);
router.post('/register', validate(registerValidation), userController.register);
router.post('/recover-password', validate(recoverPasswordValidation), userController.recoverPassword);

// Rutas para obtener todos los usuarios y modificar el perfil de usuario
router.get('/users', userController.getUsers);  // Obtener todos los usuarios
router.put('/users/:userId', userController.updateUserProfile);  // Actualizar perfil de un usuario

// Rutas para CRUD de Especialidades
router.get('/specialties', specialtyController.getAllSpecialties);  // Obtener todas las especialidades
router.post('/specialties', specialtyController.createSpecialty);  // Crear una especialidad
router.delete('/specialties/:id', specialtyController.deleteSpecialty);  // Eliminar una especialidad

// Rutas para CRUD de Departamentos
router.get('/departments', departmentController.getAllDepartments);  // Obtener todos los departamentos
router.post('/departments', departmentController.createDepartment);  // Crear un departamento
router.delete('/departments/:id', departmentController.deleteDepartment);  // Eliminar un departamento

// Rutas para CRUD de Empleados
router.get('/employees', employeeController.getAllEmployees);  // Obtener todos los empleados
router.post('/employees', employeeController.createEmployee);  // Crear un empleado
router.delete('/employees/:id', employeeController.deleteEmployee);  // Eliminar un empleado

// Rutas para CRUD de Perfiles de Usuario
router.get('/profiles', profileController.getAllProfiles);  // Obtener todos los perfiles de usuario
router.post('/profiles', profileController.createProfile);  // Crear un perfil de usuario
router.delete('/profiles/:id', profileController.deleteProfile);  // Eliminar un perfil de usuario

// Ruta pública sin validación
router.post('/logout', userController.logout);

module.exports = router;
