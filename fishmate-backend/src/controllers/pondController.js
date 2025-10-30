const { Pond } = require('../models');

exports.createPond = async (req, res) => {
  try {
    const { pond_name, location, area_sq_m } = req.body;
    const user_id = req.user.user_id;
    const pond = await Pond.create({ user_id, pond_name, location, area_sq_m });
    res.status(201).json(pond);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.listPonds = async (req, res) => {
  try {
    const user_id = req.user.user_id;
    const ponds = await Pond.findAll({ where: { user_id } });
    res.json(ponds);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
