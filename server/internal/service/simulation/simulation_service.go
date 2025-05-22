package simulation

import (
	"runtime"

	"github.com/S1riyS/poker-monte-carlo/internal/dto"
	"github.com/S1riyS/poker-monte-carlo/internal/mapper"
	"github.com/S1riyS/poker-monte-carlo/internal/service/simulation/utils"
	"github.com/S1riyS/poker-monte-carlo/pkg/logger"
	"github.com/S1riyS/poker-monte-carlo/pkg/poker"
	"go.uber.org/zap"
)

type ISimulationService interface {
	Run(dto.SimulationRequest) dto.SimulationResponse
	RunTable(dto.SimulationTableRequest) dto.SimulationTableResponse
}

type simulationService struct {
	mapper2pkg mapper.MapFunc[dto.SimulationCard, poker.Card]
	mapper2dto mapper.MapFunc[poker.Card, dto.SimulationCard]
}

func NewSimulationService() ISimulationService {
	return &simulationService{
		mapper2pkg: mapper.Card2PkgMapper,
		mapper2dto: mapper.Card2DtoMapper,
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
	simulation := utils.NewSimulation(
		data.Players,
		ss.mapper2pkg.MapEach(data.Hand),
		ss.mapper2pkg.MapEach(data.Table),
	)

	// Setup channels
	numWorkers := runtime.NumCPU() * 2
	jobs := make(chan int, data.Iterations)
	results := make(chan utils.StepResult, data.Iterations)

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
		case utils.WIN:
			responseCombination.Win += 1
		case utils.LOSE:
			responseCombination.Lose += 1
		case utils.TIE:
			responseCombination.Tie += 1
		}
	}
	close(results)

	return response
}

func (ss *simulationService) RunTable(data dto.SimulationTableRequest) dto.SimulationTableResponse {
	const mark = "service.simulation.RunTable"

	// Setup all pairs
	allPairs := utils.GenerateUniqueHands()

	// Setup response
	var response dto.SimulationTableResponse
	response.Data = make([]dto.SpecificHandResult, len(allPairs))

	for i, hand := range allPairs {
		logger.Debug(mark, "Running simulation for hand", zap.Any("hand", hand))
		// Run single simulation
		currentHandAsDTO := ss.mapper2dto.MapEach(hand[:])
		sigleSimulationResult := ss.Run(dto.SimulationRequest{
			Players:    data.Players,
			Hand:       currentHandAsDTO,
			Iterations: data.Iterations,
		})

		var currentResult dto.AccumulatedHandResult
		for _, combination := range sigleSimulationResult.Data {
			currentResult.Win += combination.Win
			currentResult.Lose += combination.Lose
			currentResult.Tie += combination.Tie
		}

		// Save to response
		response.Data[i] = dto.SpecificHandResult{
			Hand:   currentHandAsDTO,
			Result: currentResult,
		}
	}

	logger.Debug(mark, "Simulation finished", zap.Int("total_hands", len(response.Data)))
	return response
}

// worker is a WorkerPool unit that performs job
func worker(jobs <-chan int, results chan<- utils.StepResult, simulation *utils.Simulation) {
	for range jobs {
		results <- simulation.RunStep()
	}
}
