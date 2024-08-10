import Task from '../models/task.js';
import asyncWrapper from '../middleware/async.js';
import { createCustomError } from '../errors/custom-error.js';

const getAllTasks = asyncWrapper(async (req, res) => {
    const tasks = await Task.find({});
    return res.status(201).send({ tasks });
})

const creatTask = asyncWrapper(async (req, res) => {
    const { name } = req.body;
    const task = await Task.create({ name });
    return res.status(201).send(task);
});

const getTask = asyncWrapper(async (req, res, next) => {
    let { id: taskId } = req.params
    const task = await Task.findById(taskId)
    if (!task) {
        next(createCustomError(`No task with ID: ${taskId}`, 404))
        return 
    }
    res.status(200).json({ task })
})

const updateTask = asyncWrapper(async (req, res, next) => {
    const { id: taskId } = req.params
    // if option weren't given to Task.findOneAndUpdate, the returned task would be the old one, not the up-to-date version of the task
    const task = await Task.findOneAndUpdate({ _id: taskId }, req.body, {
        new: true,
        runValidators: true
    })
    if (!task) next(createCustomError(`No task with ID: ${taskId}`, 404))
    return res.status(200).json({ task })
})

const deleteTask = asyncWrapper(async (req, res, next) => {
    const { id: taskId } = req.params
    const task = await Task.findOneAndDelete({ _id: taskId })
    if (!task) next(createCustomError(`No task with ID: ${taskId}`, 404))
    return res.status(200).json({ task })
})

export { getAllTasks, creatTask, getTask, updateTask, deleteTask };
