package simulation

import (
	"github.com/S1riyS/poker-monte-carlo/internal/dto"
	"github.com/S1riyS/poker-monte-carlo/internal/mapper"
	"github.com/S1riyS/poker-monte-carlo/pkg/poker"
)

type ISimulationService interface {
	Run(data dto.SimulationRequest) dto.SimulationResponse
}

type simulationService struct {
	mapper2pkg mapper.MapFunc[dto.SimulationCard, poker.Card]
}

func NewSimulationService() ISimulationService {
	return &simulationService{
		mapper2pkg: mapper.Card2PkgMapper,
	}
}

func (ss *simulationService) Run(data dto.SimulationRequest) dto.SimulationResponse {
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
	simulation := NewSimulation(
		data.Iterations,
		data.Players,
		ss.mapper2pkg.MapEach(data.Hand),
		ss.mapper2pkg.MapEach(data.Table),
	)

	for range data.Iterations {
		result := simulation.RunStep()
		responseCombination := responseCombinationLookup[result.Combination.Name]

		switch result.Outcome {
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
