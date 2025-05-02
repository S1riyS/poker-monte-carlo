package main

import (
	"log"

	"github.com/S1riyS/poker-monte-carlo/internal/app"
)

// Application entry point
//
//	@title						GoQuiz
//	@version					1.0
//	@description				A quizes management service API in Go using Fiber framework.
//
//	@contact.name				Ankudinov Kirill
//	@contact.url				https://github.com/S1riyS
//	@contact.email				kirill.ankudinov.94@mail.ru
//
//	@host						localhost:8080
//	@BasePath					/api
//
//	@securityDefinitions.apikey	ApiKeyAuth
//	@in							header
//	@name						Authorization
func main() {
	// Setup and run app
	app := app.New()
	app.Run()

	// Create a done channel to signal when the shutdown is complete
	done := make(chan bool, 1)

	// Run graceful shutdown in a separate goroutine
	go app.GracefulShutdown(done)

	// Wait for the graceful shutdown to complete
	<-done
	log.Println("Graceful shutdown complete.")
}
