package router

import "github.com/gofiber/fiber/v2"

func Setup(router fiber.Router) {
	publicRouter := router.Group("")

	// Public API
	NewSimulationRouter(publicRouter)
}
