import SuperAdmins from '../models/Super-admins';

export const getAllSuperAdmins = async (req, res) => {
  try {
    const superAdmins = await SuperAdmins.find(req.query);

    if (!superAdmins.length) {
      return res.status(404).json({
        message: 'The super admin does not exist',
        error: true,
      });
    }

    return res.status(200).json({
      message: 'Super admins found',
      data: superAdmins,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: `An error ocurred! ${error.message}`,
      error: true,
    });
  }
};

export const getSuperAdminById = async (req, res) => {
  try {
    const superAdmin = await SuperAdmins.findById(req.params.id);

    if (!superAdmin) {
      return res.status(404).json({
        message: `The super admin with id: ${req.params.id} does not exist`,
        error: true,
      });
    }

    return res.status(200).json({
      message: 'Super admin found',
      data: superAdmin,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: `An error ocurred! ${error.message}`,
      error: true,
    });
  }
};

export const createSuperAdmin = async (req, res) => {
  try {
    const superAdmin = new SuperAdmins({
      name: req.body.name,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
    });

    const result = await superAdmin.save();
    return res.status(201).json({
      message: 'Super Admin created successfuly',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: `An error ocurred! ${error.message}`,
      error: true,
    });
  }
};
