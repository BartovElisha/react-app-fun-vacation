const { Vacation } = require('../models/Vacation');
const joi = require('joi');

module.exports = {
    getAll: async function (req, res, next) {
        try {
            const result = await Vacation.find({});
            res.json(result);
        }
        catch (err) {
            console.log(err);
            res.status(400).send('error getting vacations');
        }
    },

    getItem: async function (req, res, next) {
        try {
            const scheme = joi.object({
                _id: joi.string().required(),
            });

            const { error, value } = scheme.validate({ _id: req.params.id });

            if (error) {
                console.log(error.details[0].message);
                res.status(400).send('invalid data');
                return;
            }

            const result = await Vacation.findOne({ _id: value._id });
            res.json(result);
        }
        catch (err) {
            console.log(err);
            res.status(400).send('error getting vacations');
        }
    },

    add: async function (req, res, next) {
        try {
            const scheme = joi.object({
                date: joi.string().required(),
                location: joi.string().required(),
                price: joi.number().min(1),
            });

            const { error, value } = scheme.validate(req.body);

            if (error) {
                console.log(error.details[0].message);
                res.status(400).send('invalid data');
                return;
            }

            const newVacation = new Vacation(value);
            const result = await newVacation.save();

            res.json({
                ...value,
                _id: result._id
            });
        }
        catch (err) {
            console.log(err);
            res.status(400).send('error add vacation');
        }
    },

    delete: async function (req, res, next) {
        try {
            const scheme = joi.object({
                _id: joi.string().required(),
            });

            const { error, value } = scheme.validate({ _id: req.params.id });

            if (error) {
                console.log(error.details[0].message);
                res.status(400).send('invalid data');
                return;
            }

            await Vacation.deleteOne(value).exec();
            res.json(value);
        }
        catch (err) {
            console.log(err);
            res.status(400).send('error delete item');
        }
    },

    edit: async function (req, res, next) {
        try {
            const scheme = joi.object({
                _id: joi.string().required(),
                date: joi.string().required(),
                location: joi.string().required(),
                price: joi.number().min(1),
            });

            const { error, value } = scheme.validate({
                ...req.body,
                _id: req.params.id
            });

            if (error) {
                console.log(error.details[0].message);
                res.status(400).send('invalid data');
                return;
            }

            const result = await Vacation.findOneAndUpdate(
                value
            );

            res.json(result);
        }
        catch (err) {
            console.log(err);
            res.status(400).send('error updating data');
        }
    },
    // edit: async function (req, res, next) {
    //     try {
    //         const scheme = joi.object({
    //             _id: joi.string().required(),
    //             date: joi.string().required(),
    //             location: joi.string().required(),
    //             price: joi.number().min(1),
    //         });

    //         const { error, value } = scheme.validate({
    //             ...req.body,
    //             _id: req.params.id
    //         });

    //         if (error) {
    //             console.log(error.details[0].message);
    //             res.status(400).send('invalid data');
    //             return;
    //         }

    //         const result = await Vacation.findOneAndUpdate(
    //             value
    //         );

    //         res.json(result);
    //     }
    //     catch (err) {
    //         console.log(err);
    //         res.status(400).send('error updating data');
    //     }
    // },

    // sortCards: async function (req, res, next) {
    //     try {
    //         const scheme = joi.object({
    //             dir: joi.number().required().valid(1, -1).default(1),
    //         });

    //         const { error, value } = scheme.validate(req.params);
    //         if (error) {
    //             console.log(error.details[0].message);
    //             res.status(400).send('invalid direction');
    //             return;
    //         }

    //         const result =
    //             await Card.find().sort({ "name": +value.dir }).limit(20);

    //         res.json(result);
    //     }
    //     catch (err) {
    //         console.log(err);
    //         res.status(400).send('error sorting card');
    //     }
    // },

    // exportToFile: async function (req, res, next) {
    //     try {
    //         const scheme = joi.object({
    //             category: joi.string().required(),
    //         });

    //         const { error, value } = scheme.validate(req.query);
    //         if (error) {
    //             console.log(error.details[0].message);
    //             res.status(400).send('invalid category');
    //             return;
    //         }

    //         const query = value.category === 'all' ? {} : { category: value.category };

    //         const result =
    //             await Card.find(query).sort({ "name": 1 });

    //         const now = new Date().getTime();
    //         const fileName = `menu-${value.category}-${now}.txt`;
    //         // todo: check if exports folder exists, if not create it using 'fs'
    //         const filePath = path.join(__dirname, '../exports', fileName);
    //         const stream = fs.createWriteStream(filePath);

    //         stream.on('open', function () {
    //             stream.write(JSON.stringify(result));
    //             stream.end();
    //         });

    //         stream.on('finish', function () {
    //             res.json({ name: fileName });
    //         });
    //     }
    //     catch (err) {
    //         console.log(err);
    //         res.status(400).send('Error');
    //     }
    // },
}