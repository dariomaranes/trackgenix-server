import Employees from '../models/Employees';
import APIError from '../utils/APIError';
import firebase from '../helpers/firebase';

export const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employees.find(req.query);
    return res.status(200).json({
      message: 'Employees found',
      data: employees,
      error: false,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      message: error.message || error,
      error: true,
    });
  }
};

export const getEmployeesById = async (req, res) => {
  try {
    const employee = await Employees.findById(req.params.id);
    if (!employee) {
      throw new APIError({
        message: 'Employee not found',
        status: 404,
      });
    }
    return res.status(200).json({
      message: 'Employee found',
      data: employee,
      error: false,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      message: error.message || error,
      error: true,
    });
  }
};

export const createEmployees = async (req, res) => {
  try {
    const newFirebaseUser = await firebase.auth().createUser({
      email: req.body.email,
      password: req.body.password,
    });

    await firebase
      .auth()
      .setCustomUserClaims(newFirebaseUser.uid, { role: 'EMPLOYEE' });

    const newEmployee = new Employees({
      name: req.body.name,
      lastName: req.body.lastName,
      phone: req.body.phone,
      email: req.body.email,
      firebaseUid: newFirebaseUser.uid,
    });
    const employee = await newEmployee.save();
    return res.status(201).json({
      message: 'Employee created',
      data: employee,
      error: false,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      message: error.message || error,
      error: true,
    });
  }
};

export const deleteEmployees = async (req, res) => {
  try {
    const employee = await Employees.findById(req.params.id);
    await firebase.auth().deleteUser(employee.firebaseUid);
    const result = await Employees.findByIdAndDelete(req.params.id);
    if (!result) {
      throw new APIError({
        message: 'Employee not found',
        status: 404,
      });
    }
    return res.status(204).send();
  } catch (error) {
    return res.status(error.status || 500).json({
      message: error.message || error,
      error: true,
    });
  }
};

export const editEmployees = async (req, res) => {
  try {
    const employee = await Employees.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      },
    );
    if (!employee) {
      throw new APIError({
        message: 'Employee not found',
        status: 404,
      });
    }

    await firebase.auth().updateUser(employee.firebaseUid, {
      email: req.body.email,
      password: req.body.password,
    });

    return res.status(200).json({
      message: `Employee with id: ${req.params.id} edited`,
      data: employee,
      error: false,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      message: error.message || error,
      error: true,
    });
  }
};
