package wire

import (
	"backend/internal/handlers"
	"backend/internal/services"
	"backend/internal/storages"

	"github.com/google/wire"
)

func InitUserHandle() *handlers.TaskHandler {
    wire.Build(
        storages.NewTaskStorage,
        services.NewTaskService,
        handlers.NewTaskHandler,
    )
    return &handlers.TaskHandler{}
}