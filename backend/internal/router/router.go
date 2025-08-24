package router

import (
	"backend/internal/middlewares"

	"github.com/gin-gonic/gin"
)

func NewRouter() *gin.Engine {
	r := gin.Default()
	r.Use(middlewares.CORSMiddleware())

	api := r.Group("/api")

	// Regis task route
	RegisterTaskRoutes(api)
	return r
}
