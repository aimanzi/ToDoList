import usertaskShema from "../models/task.mjs";

function DisplayTask(req, res) {
  console.log("Get from display user task");
  const userTask = usertaskShema;
  const userid = req.body;
  userTask
    .find(userid)
    .then((result) => {
      console.log("Task Download Completed");
      res.json({
        message: "Task Download Completed ",
        success: true,
        taskdata: result,
      });
    })
    .catch((err) => console.log(err));
}

function AddTask(req, res) {
  console.log("posting from user task");
  const userTask = usertaskShema;
  const taskData = req.body;
  const userid = taskData.userid;
  const newTask = taskData.task;

  userTask
    .findOneAndUpdate({ userid }, { $push: { task: newTask } }, { new: true })
    .then((result) => {
      if (result) {
        res.json({
          message: "Adding New Task succsess",
          adding_status: true,
          taskData: result.task,
        });
      } else {
        userTask.insertMany(taskData).then((result) => {
          if (result) {
            console.log("Adding New Task succsess");
            res.json({
              message: "Adding New Task succsess",
              adding_status: true,
              taskData: result.task,
            });
          }
        });
      }
    });
}

function DeleteTask(req, res) {
  console.log("posting from delete task");
  const userTask = usertaskShema;
  const userid = req.body.userid;
  const taskIndexToDelete = req.body.index;
  userTask.findOne({ userid }).then((result) => {
    if (result) {
      result.task.splice(taskIndexToDelete, 1);
      result.save();
      res.json({
        message: "Deleting Task Succsess",
        deleting_status: true,
        taskData: result.task,
      });
    }
  });
}

function EditTask(req, res) {
  console.log("posting from editing task");
  const userTask = usertaskShema;
  const taskData = req.body;
  const userid = taskData.userid;
  const taskIndex = taskData.index;
  const taskUpdate = {
    taskDescription: taskData.taskData.taskDescription,
    startDate: taskData.taskData.startDate,
    endDate: taskData.taskData.endDate,
  };

  console.log(taskUpdate);
  userTask.findOne({ userid }).then((result) => {
    if (result) {
      result.task.splice(taskIndex, 1);
      result.task.push(taskUpdate);
      result.save();
      res.json({
        message: "Editing Task Succsess",
        editing_status: true,
        taskData: result.task,
      });
    }
  });
}

export default { AddTask, DisplayTask, DeleteTask, EditTask };
