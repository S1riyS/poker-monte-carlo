package simulation

import (
	"github.com/S1riyS/poker-monte-carlo/internal/dto"
	"github.com/S1riyS/poker-monte-carlo/pkg/poker"
)

type SimulationService struct{}

func (ss *SimulationService) Run(data dto.SimulationRequest) dto.SimulationResponse {
	const mark = "service.simulation.Run"

	// Lookup table to retrieve combinationsfrom response object faster
	var responseCombinationLookup = make(map[string]*dto.CombinationResult, len(poker.CombinationList))
	// Response object
	var response dto.SimulationResponse
	response.Data = make([]dto.CombinationResult, len(poker.CombinationList))
	// Fill response object and lookup table
	for i, combination := range poker.CombinationList {
		response.Data[i] = dto.CombinationResult{
			Name: combination.Name,
			Win:  0,
			Lose: 0,
			Tie:  0,
		}
		responseCombinationLookup[combination.Name] = &response.Data[i]
	}

	// Run simulation
	simulation := NewSimulation(data)

	for range data.Iterations {
		combintaion, outcome := simulation.RunStep()
		responseCombination := responseCombinationLookup[combintaion.Name]

		switch outcome {
		case win:
			responseCombination.Win += 1
		case lose:
			responseCombination.Lose += 1
		case tie:
			responseCombination.Tie += 1
		}
	}
	return response
}
