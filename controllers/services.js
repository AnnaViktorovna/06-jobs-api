const Service = require("../models/Service");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require('../errors')


const getAllServices = async (req, res) => {
    const services = await Service.find({createdBy: req.username}).sort('createdAt')
    res.status(StatusCodes.OK).json({services, count: services.length})
};
    const getService = async (req, res) => {
        const { username } = req;
        const { id: serviceId } = req.params;
        if (!req.username) {
            return res.status(401).json({ message: 'User not authenticated' });
        }

        const service = await Service.findOne({
            _id: serviceId,
            createdBy: username,
        })
        if (!service) {
            throw new NotFoundError(`No service with id ${serviceId}`)
        }
        res.status(StatusCodes.OK).json({service})
    };

    const createService = async (req, res) => {
        req.body.createdBy = req.username;
        const service = await Service.create({...req.body});
        res.status(StatusCodes.CREATED).json({service});
    };
const updateService = async (req, res) => {
    const { description, price } = req.body;
    const { userId } = req.user;
    const { id: serviceId } = req.params;

    if (!description || !price) {
        throw new BadRequestError('Description fields & price cannot be empty');
    }

    if (price <= 0) {
        throw new BadRequestError('Price must be greater than zero');
    }

    const service = await Service.findByIdAndUpdate(
        {_id: serviceId, createdBy: userId},
        req.body,
        { new: true, runValidators: true }
    );

    if (!service) {
        throw new NotFoundError(`No service with id ${serviceId}`);
    }

    res.status(StatusCodes.OK).json({service});
};


const deleteService = async (req, res) => {
            const { userId } = req.user;
            const { id: serviceId } = req.params;

            const service = await Service.findByIdAndRemove({
                _id: serviceId,
                createdBy: userId,
            });
            if (!service) {
                throw new NotFoundError(`No service with id ${serviceId}`);
            }
            res.status(StatusCodes.OK).send();
        };

    module.exports = {
        getAllServices,
        createService,
        updateService,
        deleteService,
        getService,
    };