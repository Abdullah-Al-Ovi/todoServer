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

  static async indexByTodoTitle(req, res) {
    const searchValue = req.query?.searchValue.trim() 
    const userId = req.query?.userId
    if(!searchValue){
      return res.status(400).json({
        success: false,
        status: 400,
        message: "Please provide search value",
      });
    }
    if(!userId){
      return res.status(400).json({
        success: false,
        status: 400,
        message: "UserId is missing to search task",
      });
    }
    try {
      const searchedTasks = await prisma.todo.findMany({
        where:{
          userId: Number(userId),
          title:{
            contains: searchValue
          }
        }
      })
      if(!searchedTasks){
        return res.status(400).json({
          success: false,
          status: 400,
          message: "failed to search task",
        });
      }
      return res.status(200).json({
        success:true,
        status: 200,
        message:"Searched tasks gotten successfully",
        data: searchedTasks
      })
    } catch (error) { 
      return res.status(error?.code || 500).json({
        success: false,
        status: error?.code || 500,
        message: error.message || error.meta?.message || error.meta?.cause || "Something went wrong while searching task",
      })
     }
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
        message: error.message || error.meta?.message || error.meta?.cause || "Something went wrong while updating task",
      })
    }
  }

  static async deleteByTodoId(req, res) {
    const taskId = req.params?.taskId;
    console.log(taskId);
    try {
        const deletedTask = await prisma.todo.delete({
            where: {
                id: Number(taskId)
            }
        });
        if (deletedTask) {
            return res.status(200).json({
                success: true,
                status: 200,
                message: "Task deleted successfully",
                data: deletedTask
            });
        }
    } catch (error) {
        if (error.code === 'P2025') {
            // Handle P2025 error
            console.error('Prisma Error P2025:', error.message);
            // Provide user feedback, log the error, or implement fallback behavior
            return res.status(500).json({
                success: false,
                status: 500,
                message: "Error occurred while deleting task",
                error: error.message
            });
        } else {
            // Handle other errors
            console.error('An unexpected error occurred:', error);
            // Log the error and handle it appropriately
            return res.status(error?.code || 500).json({
                success: false,
                status: error?.code || 500,
                message: error.message || error.meta?.message || error.meta?.cause || "Something went wrong while deleting task",
                error: error
            });
        }
    }
}

}

export default TodoController;
