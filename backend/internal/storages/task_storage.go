package storages

import (
	"backend/internal/models"
	"errors"
	"sync"
)

type TaskStorage struct{
	data map[int64]models.Task
	nextID int64
	mu sync.Mutex
}

func NewTaskStorage() *TaskStorage {
	return &TaskStorage{
		data:   make(map[int64]models.Task),
		nextID: 1,
	}
}

func (s *TaskStorage) GetAll() ([]models.Task, error){
	s.mu.Lock()
	defer s.mu.Unlock()
	Tasks := []models.Task{}
	for _, u := range s.data {
		Tasks = append(Tasks, u)
	}
	return Tasks, nil
}

func (s *TaskStorage) Create(task models.Task) (models.Task, error){
	s.mu.Lock()
	defer s.mu.Unlock()

	task.ID = s.nextID
	task.Completed = false
	s.nextID++
	s.data[task.ID] = task
	return task, nil
}

func (s *TaskStorage) UpdateTaskStatus(id int64, completed bool) (models.Task, error) {
	s.mu.Lock()
	defer s.mu.Unlock()
	
	task, ok := s.data[id]
	if !ok{
		return models.Task{}, errors.New("update: task not found")
	}

	task.Completed = completed
	s.data[id] = task
	return task, nil
}

func (s *TaskStorage) DeleteTask(id int64) error{
	s.mu.Lock()
	defer s.mu.Unlock()

	if _, ok := s.data[id]; !ok {
		return errors.New("delete: task not found")
	}
	delete(s.data, id)
	return nil
}