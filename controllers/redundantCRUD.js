const getAllObjectsInCollection = async (req, res, collection) => {
    try {
        const functionObjects = await collection.find({});
        console.log(`Showing all objects in collection`);
        return res.json(functionObjects);
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

// const getObjectsByKeyAndValue = async (req, res, collection, key) => {
//     try {
//         const { value } = req.query;
//         const objects = await collection.find({ [key]: value });
//         if (!objects) throw Error(`Objects with that ${key} were not found`);
//         return res.json({ objects });
//     } catch (e) {
//         console.log(e);
//         res.send(e.message);
//     }
// };

///////// ISSUE ABOVE. how can i pass the key argument into req.query.key so that it looks for the releant key

/// approval is only relevant for articles.
const getObjectsByLocation = async (req, res, collection, where, excludedFields, approval) => {
    try {
        const { id } = req.params;
        let objects;
        if (approval && excludedFields) {
            objects =
                excludedFields.length === 1
                    ? await collection.find({ [where]: id, [excludedFields[0]]: null, approved: true })
                    : await collection.find({
                          [where]: id,
                          [excludedFields[0]]: null,
                          [excludedFields[1]]: null,
                          approved: true,
                      });
        } else if (excludedFields) {
            objects =
                excludedFields.length === 1
                    ? await collection.find({ [where]: id, [excludedFields[0]]: null })
                    : await collection.find({ [where]: id, [excludedFields[0]]: null, [excludedFields[1]]: null });
        } else if (approval) {
            objects = await collection.find({ [where]: id, approved: true });
        } else {
            objects = await collection.find({ [where]: id });
        }
        if (!objects) throw Error(`Objects with ${where}: ${here} were not found`);
        return res.json(objects);
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
    getObjectsByLocation,
    updateObjectById,
    deleteObjectById,
};
