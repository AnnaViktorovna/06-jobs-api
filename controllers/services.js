const Service = require("../models/Service");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require('../errors')


const getAllServices = async (req, res) => {
    const services = await Service.find({createdBy: req.user.userId}).sort('createdAt')
    res.status(StatusCodes.OK).json({service, count: services.length})

    const getService = async (req, res) => {
        const {
            user: {userId},
            params: {id: serviceId},
        } = req


        const service = await Service.findOne({
            _id: serviceId,
            createdBy: userId,
        })
        if (!service) {
            throw new NotFoundError(`No service with id ${serviceId}`)
        }
        res.status(StatusCodes.OK).json({service})
    }

    const createService = async (req, res) => {
        req.body.createdBy = req.user.userId;
        const service = await Service.create({...req.body});
        res.status(StatusCodes.CREATED).json({service});
    };
    const updateService = async (req, res) => {
        const {
            body: {description, price},
            user: {userId},
            params: {id: serviceId},
        } = req

        if (description === '' || price === '') {
            throw new BadRequestError('Description fields & price cannot be empty')
        }
        const service = await Service.findByIdAndUpdate(
            {_id: serviceId, createdBy: userId},
            req.body,
            {new: true, runValidators: true}
        )
        if (!service) {
            throw new NotFoundError(`No service with id ${serviceId}`)
        }
        res.status(StatusCodes.OK).json({service})
    }

    const deleteService = async (req, res) => {
        const {
            user: {userId},
            params: {id: serviceId},
        } = req

        const job = await Service.findByIdAndRemove({
            _id: serviceId,
            createdBy: userId,
        })
        if (!job) {
            throw new NotFoundError(`No service with id ${serviceId}`)
        }
        res.status(StatusCodes.OK).send()
    }
    module.exports = {
        getAllServices,
        createService,
        updateService,
        deleteService,
        getService,
    };
}