package main

import (
	"backend/internal/router"
	"log"
)

func main() {
	server := router.NewRouter()

	if err := server.Run(":8080"); err != nil {
		log.Fatal("Failed to start server: ", err)
	}
}
