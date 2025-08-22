package middlewares

import (
	"fmt"

	"github.com/gin-gonic/gin"
)

func WelcomeUser(c *gin.Context) {
	c.String(200, fmt.Sprintf("Hello, welcome to my website"))
}
