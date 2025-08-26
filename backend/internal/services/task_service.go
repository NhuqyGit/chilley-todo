package services

import (
	"backend/internal/models"
	"backend/internal/storages"
)

type ITaskService interface{
	GetAllTasks() ([]models.Task, error)
	CreateTask(task models.Task) (models.Task, error)
	UpdateTaskStatus(id int64, completed bool) (models.Task, error)
	DeleteTask(id int64) (error)
}

type TaskService struct {
	storage storages.ITaskStorage
}

func NewTaskService(storage storages.ITaskStorage) ITaskService {
	return &TaskService{storage: storage}
}

func (s *TaskService) GetAllTasks() ([]models.Task, error) {
	return s.storage.GetAll()
}

func (s *TaskService) CreateTask(task models.Task) (models.Task, error){
	return s.storage.Create(task)
}

func (s *TaskService) UpdateTaskStatus(id int64, completed bool) (models.Task, error) {
	return s.storage.UpdateTaskStatus(id, completed)
}

func (s *TaskService) DeleteTask(id int64) (error) {
    return s.storage.DeleteTask(id)
}
