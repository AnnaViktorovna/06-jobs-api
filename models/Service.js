const mongoose = require("mongoose");


const ServiceSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter service name"],
            trim: true,
            maxlength: [100, "Service name cannot exceed 100 characters"],
        },
        price: {
            type: Number,
            required: [true, "Please enter service price"],
            maxlength: [5, "Service price cannot exceed 5 characters"],
            default: 0.0,
        },
        description: {
            type: String,
            required: [true, "Please enter service description"],
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "User is required"]
        },
        type: {
            type: String,
            enum: [
                "Manicure",
                "Pedicure",
                "Cosmetology",
                "Makeup",
                "Haircut",
                "Others"
            ],
            default: "Others",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Service", ServiceSchema);