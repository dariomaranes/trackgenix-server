import Projects from '../models/Projects';

export const getProjects = async (req, res) => {
  try {
    const projects = await Projects.find(req.query);

    if (!projects) {
      return res.status(404).json({
        message: 'Projects not found',
        error: true,
      });
    }

    return res.status(200).json({
      message: 'All Projects',
      data: projects,
      error: false,
    });
  } catch (err) {
    return res.json({
      message: 'An error occurred',
      error: err,
    });
  }
};

export const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const projects = await Projects.findById(id);

    if (!projects) {
      return res.status(404).json({
        message: `Project ${req.params.id} does not exist`,
        error: true,
      });
    }

    return res.status(200).json({
      message: `Project ${id} found`,
      data: projects,
      error: false,
    });
  } catch (err) {
    return res.json({
      message: 'An error occurred',
      error: err,
    });
  }
};

export const createProject = async (req, res) => {
  try {
    const project = new Projects({
      name: req.body.name,
      description: req.body.description,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      clientName: req.body.clientName,
      employees: req.body.employees,
    });
    const result = await project.save();
    return res.status(201).json({
      message: 'Project created successfully!',
      data: result,
      error: false,
    });
  } catch (err) {
    return res.status(400).json({
      message: 'An error occurred',
      data: req.body,
      error: err,
    });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const result = await Projects.findByIdAndDelete(req.params.id);

    if (!result) {
      return res.status(404).json({
        message: `Project ${req.params.id} does not exist`,
        error: true,
      });
    }

    return res.status(200).json({
      message: `Project ${req.params.id} deleted.`,
      data: result,
      error: false,
    });
  } catch (err) {
    return res.status(400).json({
      message: 'An error occurred',
      error: err,
    });
  }
};
