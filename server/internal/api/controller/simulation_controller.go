package controller

import (
	"github.com/S1riyS/poker-monte-carlo/internal/dto"
	"github.com/gofiber/fiber/v2"
)

type SimulationController struct {
	SimulationService any
}

// Login - authenticate user and provide new pair of tokens
//
//	@Summary		Run simulation
//	@Description	Run simulation with specified conditions
//	@Tags			Simulation
//	@Accept			json
//	@Produce		json
//	@Param			simulationRequest	body		dto.SimulationRequest	true	"Simulation Request"
//	@Success		200					{object}	dto.SimulationResponse
//	@Failure		400					{object}	dto.ValidationErrorResponse	"Validation error"
//	@Router			/v1/simulation [post]
func (sc *SimulationController) Simulate(ctx *fiber.Ctx) error {
	// TODO: uncomment parsing and validation
	// var request dto.SimulationRequest
	// err := ctx.BodyParser(&request)
	// if err != nil {
	// 	return apperrors.NewUnprocessableEntityError()
	// }

	// err = validation.Validate(request)
	// if err != nil {
	// 	return err
	// }

	// TODO: replace with actual data
	return ctx.Status(200).JSON(dto.NewMockSimulationResponse())
}
