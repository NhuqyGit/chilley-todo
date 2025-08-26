package router

import (
	"backend/internal/wire"

	"github.com/gin-gonic/gin"
)

func RegisterTaskRoutes(rg *gin.RouterGroup) {
	taskHandler := wire.InitUserHandler()


	// Group /tasks
	taskRoutes := rg.Group("/tasks")

	// CRUD routes
	taskRoutes.GET("", taskHandler.GetAllTasksHandler)        // GET /api/tasks
	taskRoutes.POST("", taskHandler.CreateTaskHandler)       // POST /api/tasks
	taskRoutes.PUT("/:id", taskHandler.UpdateTaskStatusHandler) // PUT /api/tasks/:id
	taskRoutes.DELETE("/:id", taskHandler.DeleteTaskHandler) // DELETE /api/tasks/:id
}
