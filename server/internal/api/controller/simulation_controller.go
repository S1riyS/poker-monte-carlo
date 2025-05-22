package controller

import (
	"github.com/S1riyS/poker-monte-carlo/internal/apperrors"
	"github.com/S1riyS/poker-monte-carlo/internal/dto"
	"github.com/S1riyS/poker-monte-carlo/internal/security/validation"
	service "github.com/S1riyS/poker-monte-carlo/internal/service/simulation"
	"github.com/gofiber/fiber/v2"
)

type SimulationController struct {
	SimulationService service.ISimulationService
}

// Simulate - runs simulation with specified conditions
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
	var request dto.SimulationRequest
	err := ctx.BodyParser(&request)
	if err != nil {
		return apperrors.NewUnprocessableEntityError()
	}

	err = validation.Validate(request)
	if err != nil {
		return err
	}

	return ctx.Status(200).JSON(sc.SimulationService.Run(request))
}

// SimulateTable - runs simulation for all unique hands (suited and offsuit)
//
//	@Summary		Run simulation for every suited and offsuit hands
//	@Description	Run simulation for every suited and offsuit hands with specified conditions
//	@Tags			Simulation
//	@Accept			json
//	@Produce		json
//	@Param			simulationTableRequest	body		dto.SimulationTableRequest	true	"Table Simulation Request"
//	@Success		200						{object}	dto.SimulationTableResponse
//	@Failure		400						{object}	dto.ValidationErrorResponse	"Validation error"
//	@Router			/v1/simulation/table 	[post]
func (sc *SimulationController) SimulateTable(ctx *fiber.Ctx) error {
	var request dto.SimulationTableRequest
	err := ctx.BodyParser(&request)
	if err != nil {
		return apperrors.NewUnprocessableEntityError()
	}

	err = validation.Validate(request)
	if err != nil {
		return err
	}

	return ctx.Status(200).JSON(sc.SimulationService.RunTable(request))
}
