package router

import (
	"github.com/gin-gonic/gin"
)

func NewRouter() *gin.Engine {
	r := gin.Default()
	api := r.Group("/api")

	// Regis task route
	RegisterTaskRoutes(api)
	return r
}
