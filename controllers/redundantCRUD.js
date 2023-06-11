const getAllObjectsInCollection = async (req, res, collection) => {
    try {
        let functionObjects = await collection.find({});
        console.log(`Showing all objects in collection`);
        return res.json({ functionObjects });
    } catch (e) {
        console.log(e);
        return res.send(e.message);
    }
};

// const getAllObjectsInACollectionByMajorBrainRegion

const getObjectById = async (req, res, collection) => {
    try {
        const { id } = req.params;
        const object = await collection.findById(id);
        if (!object) throw Error(`Object ID Not Found`);
        return res.json({ object });
    } catch (e) {
        console.log(e);
        res.send(e.message);
    }
};

const createObject = async (req, res, collection) => {
    try {
        const newObject = await new collection(req.body);
        await newObject.save();
        return res.json({ newObject });
    } catch (e) {
        console.log(e);
        res.send(e.message);
    }
};

const updateObjectById = async (req, res, collection) => {
    try {
        const { id } = req.params;
        const updatedObject = await collection.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        if (updatedObject) {
            return res.json({ updatedObject });
        }
        return res.send("Object ID Not Found");
    } catch (e) {
        console.log(e);
        res.send(e.message);
    }
};

const deleteObjectById = async (req, res, collection) => {
    try {
        const { id } = req.params;
        const deletedObject = await collection.findByIdAndDelete(id);
        if (deletedObject) {
            return res.json({ deletedObject });
        }
        return res.send("Object ID Not Found");
    } catch (e) {
        console.log(e);
        res.send(e.message);
    }
};

module.exports = {
    createObject,
    getAllObjectsInCollection,
    getObjectById,
    updateObjectById,
    deleteObjectById,
};
