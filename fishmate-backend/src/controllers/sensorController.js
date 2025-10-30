const { SensorReading } = require('../models');

exports.createReading = async (req, res) => {
  try {
    const { pond_id, temperature_c, ph_level, dissolved_oxygen, ammonia, nitrite, turbidity } = req.body;
    const reading = await SensorReading.create({
      pond_id, temperature_c, ph_level, dissolved_oxygen, ammonia, nitrite, turbidity
    });

    res.status(201).json(reading);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getReadingsForPond = async (req, res) => {
  try {
    const { pondId } = req.params;
    const readings = await SensorReading.findAll({ where: { pond_id: pondId }, order: [['reading_time', 'DESC']] });
    res.json(readings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
