package main

import (
	"log"

	"github.com/S1riyS/poker-monte-carlo/internal/app"
)

// Application entry point
//
//	@title			PokerMonteCarlo
//	@version		1.0
//	@description	Simulation of starting hand in poker with Monte-Carlo method.
//
//	@contact.name	Ankudinov Kirill
//	@contact.url	https://github.com/S1riyS
//	@contact.email	kirill.ankudinov.94@mail.ru
//
//	@host			localhost:8080
//	@BasePath		/api
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
