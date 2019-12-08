const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });

const buildCallback = (onFailure, onSuccess) => (err, data) => {
    if (err) {
        onFailure(err);
    } else {
        onSuccess(data);
    }
};

const RecordSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        required: true
    },
    level: {
        type: Number,
        required: true
    }
});

const Record = mongoose.model("Record", RecordSchema);

const findOne = (filter, onFailure, onSuccess) => {
    Record.findOne(filter, buildCallback(onFailure, onSuccess));
};

const findOneAndUpdate = ({ name, score, level }, onFailure, onSuccess) => {
    Record.findOneAndUpdate(
        { name, level },
        { $set: { score } },
        { new: true, upsert: true },
        buildCallback(onFailure, onSuccess)
    );
};

const createOrUpdate = ({ name, score, level }, onFailure, onSuccess) => {
    findOne({ name, level }, onFailure, data => {
        if (!data || data.score < score) {
            findOneAndUpdate({ name, score, level }, onFailure, onSuccess);
        } else {
            onSuccess(data);
        }
    });
};

const findAll = (filter, onFailure, onSuccess) => {
    Record.find(filter)
        .select({ __v: false, _id: false, level: false })
        .sort({ score: "desc" })
        .exec(buildCallback(onFailure, onSuccess));
};

exports.createOrUpdate = (req, res) => {
    const { name, score, level } = req.query;

    console.log(`Fetched record: (${name}, ${score} scores, ${level} level)`);
    createOrUpdate(
        { name, score, level },
        err => {
            console.log("Failure", err);
            res.status(500).json(err);
        },
        data => {
            console.log("Successful!", data);
            res.status(200).json(data);
        }
    );
};

exports.findByLevel = (req, res) => {
    const { level } = req.query;

    console.log(`Requested scores level ${level}`);
    findAll(
        { level },
        err => {
            console.log("Failure", err);
            res.status(500).json(err);
        },
        data => {
            console.log("Successful!", data);
            res.status(200).json(data);
        }
    );
};
