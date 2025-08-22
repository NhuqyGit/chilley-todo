package handlers

import (
	"backend/internal/models"
	"backend/internal/services"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

type TaskHandler struct {
	service *services.TaskService
}

func NewTaskHandler(service *services.TaskService) *TaskHandler {
	return &TaskHandler{service: service}
}

// GET /tasks
func (h *TaskHandler) GetAllTasksHandler(c *gin.Context) {
	tasks, err := h.service.GetAllTasks()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to get tasks"})
		return
	}
	c.JSON(http.StatusOK, tasks)
}

// POST /tasks
func (h *TaskHandler) CreateTaskHandler(c *gin.Context) {
	var task models.Task
	if err := c.ShouldBindJSON(&task); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid input"})
		return
	}

	created, err := h.service.CreateTask(task)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to create task"})
		return
	}

	c.JSON(http.StatusCreated, created)
}

// PUT /tasks/:id
func (h *TaskHandler) UpdateTaskStatusHandler(c *gin.Context) {
	id, err := strconv.ParseInt(c.Param("id"), 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid task id"})
		return
	}

	var req struct {
		Completed bool `json:"completed"`
	}
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid request body"})
		return
	}

	task, err := h.service.UpdateTaskStatus(id, req.Completed)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, task)
}

// DELETE /tasks/:id
func (h *TaskHandler) DeleteTaskHandler(c *gin.Context) {
	id, err := strconv.ParseInt(c.Param("id"), 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid task id"})
		return
	}

	if err := h.service.DeleteTask(id); err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Task deleted successfully",
		"id":      id,
	})
}
