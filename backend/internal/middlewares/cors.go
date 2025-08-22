package middlewares

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

var allowedOrigins = map[string]bool{
	"http://localhost:3000": true,
	"http://127.0.0.1:3000": true,
}

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		origin := c.Request.Header.Get("Origin")

		if _, ok := allowedOrigins[origin]; ok {
			c.Writer.Header().Set("Access-Control-Allow-Origin", origin)
		}

		c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

		if c.Request.Method == http.MethodOptions {
			c.AbortWithStatus(http.StatusOK)
			return
		}

		c.Next()
	}
}
