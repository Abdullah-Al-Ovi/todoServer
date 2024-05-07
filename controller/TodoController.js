import prisma from "../db/db.config.js";

class TodoController {

  static async store(req, res) {
    const { userId, title, description } = req.body;

    if ([title, description].some((field) => field?.trim() === "")) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "All fields are required",
      });
    }
    try {
      const newTask = await prisma.todo.create({
        data: {
          userId: Number(userId),
          title,
          description
        }
      })
      if (!newTask) {
        return res.status(400).json({
          success: false,
          status: 400,
          message: "failed to create task",
        });
      }
      return res.status(201).json({
        success: true,
        status: 200,
        message: "Task added successfully",
        data: newTask
      })
    } catch (error) {
      return res.status(error?.code || 500).json({
        success: false,
        status: error?.code || 500,
        message: error.message || error.meta?.message || error.meta?.cause || "Something went wrong while creating task",
      })
    }
  }

  static async indexByTodoId(req, res) {
    try {
    } catch (error) { }
  }

  static async showByUserId(req, res) {
    const userId = req.params?.userId
    // console.log(userId);
    try {
      const tasks = await prisma.todo.findMany({
        where: {
          userId: Number(userId)
        }
      })
      if (!tasks) {
        return res.status(500).json({
          success: false,
          status: 500,
          message: "Something went wrong",
        });
      }
      return res.status(200).json({
        success: true,
        status: 200,
        message: "Tasks found successfully",
        data:tasks
      });

    } catch (error) {
      return res.status(error?.code || 500).json({
        success: false,
        status: error?.code || 500,
        message: error.message || error.meta?.message || error.meta?.cause || "Something went wrong while finding tasks",
      })
    }
  }

  static async updateByTodoId(req, res) {
    const {status} = req.body 
    const taskId = req.params?.taskId 
    try {
      const updatedTodo = await prisma.todo.update({
        where: { id: Number(taskId) },
        data: { status }
    });
    if(!updatedTodo){
      return res.status(400).json({
        success: false,
        status: 400,
        message:"Failed to update task",
      })
    }
    return res.status(200).json({
      success: true,
      status:200,
      message:"Task updated successfully",
      data: updatedTodo
    })
    } catch (error) {
      return res.status(error?.code || 500).json({
        success: false,
        status: error?.code || 500,
        message: error.message || error.meta?.message || error.meta?.cause || "Something went wrong while finding tasks",
      })
    }
  }
}

export default TodoController;
