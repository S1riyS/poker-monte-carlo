package router

import (
	"github.com/S1riyS/poker-monte-carlo/internal/api/controller"
	service "github.com/S1riyS/poker-monte-carlo/internal/service/simulation"
	"github.com/gofiber/fiber/v2"
)

func NewSimulationRouter(group fiber.Router) {
	ss := service.NewSimulationService()
	sc := controller.SimulationController{SimulationService: ss}
	group.Post("/simulation", sc.Simulate)
	group.Post("/simulation/table", sc.SimulateTable)
}
