package services

import (
	"backend/internal/models"
	"backend/internal/storages"
)

type TaskService struct {
	storage *storages.TaskStorage
}

func NewTaskService(storage *storages.TaskStorage) *TaskService {
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
