package router

import (
	"backend/internal/handlers"
	"backend/internal/services"
	"backend/internal/storages"

	"github.com/gin-gonic/gin"
)

func RegisterTaskRoutes(rg *gin.RouterGroup) {
	store := storages.NewTaskStorage()
	taskService := services.NewTaskService(store)
	taskHandler := handlers.NewTaskHandler(taskService)


	// Group /tasks
	taskRoutes := rg.Group("/tasks")

	// CRUD routes
	taskRoutes.GET("", taskHandler.GetAllTasksHandler)        // GET /api/tasks
	taskRoutes.POST("", taskHandler.CreateTaskHandler)       // POST /api/tasks
	taskRoutes.PUT("/:id", taskHandler.UpdateTaskStatusHandler) // PUT /api/tasks/:id
	taskRoutes.DELETE("/:id", taskHandler.DeleteTaskHandler) // DELETE /api/tasks/:id
}
