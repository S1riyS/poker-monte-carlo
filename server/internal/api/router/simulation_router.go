package router

import (
	"github.com/S1riyS/poker-monte-carlo/internal/api/controller"
	"github.com/gofiber/fiber/v2"
)

func NewSimulationRouter(group fiber.Router) {
	sc := controller.SimulationController{nil}
	group.Post("/simulation", sc.Simulate)
}
