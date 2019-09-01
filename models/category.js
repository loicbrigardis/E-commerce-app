const mongoose = require('mongoose');
const beautifyUnique = require('mongoose-beautiful-unique-validation');

const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32
        },

    },
    { timestamps: true }
);

categorySchema.plugin(beautifyUnique);

module.exports = mongoose.model('Category', categorySchema);
