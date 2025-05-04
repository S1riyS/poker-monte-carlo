package simulation

import (
	"runtime"

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

	// Response object
	var response dto.SimulationResponse
	response.Data = make([]dto.CombinationResult, len(poker.CombinationList))
	// Lookup table to retrieve combinationsfrom response object faster
	var responseCombinationLookup = make(map[string]*dto.CombinationResult, len(poker.CombinationList))

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

	// Setup simulation
	simulation := NewSimulation(
		data.Players,
		ss.mapper2pkg.MapEach(data.Hand),
		ss.mapper2pkg.MapEach(data.Table),
	)

	// Setup channels
	numWorkers := runtime.NumCPU() * 2
	jobs := make(chan int, data.Iterations)
	results := make(chan StepResult, data.Iterations)

	// Initialize worker pool
	for range numWorkers {
		go worker(jobs, results, simulation)
	}

	// Send jobs IDs
	for j := 1; j <= data.Iterations; j++ {
		jobs <- j
	}
	close(jobs)

	// Collect results
	for i := 1; i <= data.Iterations; i++ {
		result := <-results

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
	close(results)

	return response
}

// worker is a WorkerPool unit that performs job
func worker(jobs <-chan int, results chan<- StepResult, simulation *Simulation) {
	for range jobs {
		results <- simulation.RunStep()
	}
}
