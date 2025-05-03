package router

import (
	"github.com/S1riyS/poker-monte-carlo/internal/api/controller"
	"github.com/S1riyS/poker-monte-carlo/internal/service"
	"github.com/gofiber/fiber/v2"
)

func NewSimulationRouter(group fiber.Router) {
	ss := service.SimulationService{}
	sc := controller.SimulationController{SimulationService: ss}
	group.Post("/simulation", sc.Simulate)
}
