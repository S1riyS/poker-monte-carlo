package simulation

import (
	"github.com/S1riyS/poker-monte-carlo/internal/dto"
	"github.com/S1riyS/poker-monte-carlo/pkg/poker"
)

type Outcome string

const (
	win  Outcome = "win"
	lose Outcome = "lose"
	tie  Outcome = "tie"
)

type Simulation struct {
	data dto.SimulationRequest
	pool CardPool
}

type StepResult struct {
	Combination poker.Combination
	Outcome     Outcome
}

func NewSimulation(data dto.SimulationRequest) *Simulation {
	// Setup known cards
	var knownCards []poker.Card
	knownCards = append(knownCards, data.Hand...)
	knownCards = append(knownCards, data.Table...)

	// Setup card pool
	pool := NewCardPool(knownCards...)

	return &Simulation{
		data: data,
		pool: *pool,
	}
}

// RunStep runs 1 step of a simulation.
// Reciever function uses value instead of reference in order to reuse CardPool
func (s Simulation) RunStep() StepResult {
	s.pool.ShuffleDeck()

	// Fill table with missing cards
	simulationTable := s.data.Table
	missingCount := 5 - len(simulationTable)
	if missingCount == 1 {
		simulationTable = append(simulationTable, s.pool.PickOne())
	} else if missingCount > 1 {
		simulationTable = append(simulationTable, s.pool.PickMany(missingCount)...)
	}

	// Cards 0-4: Table
	// Cards 5-6: Someone's Hand
	cards := make([]poker.Card, 7)
	copy(cards[0:5], simulationTable)

	// Simulate our hand
	copy(cards[5:7], s.data.Hand)
	ourResult := poker.Evaluate(cards...)

	// Simulate others hands
	var outcomeMaxDiff int
	for range s.data.Players {
		playerHand := s.pool.PickMany(2)
		copy(cards[5:7], playerHand)
		playerResult := poker.Evaluate(cards...)

		comparison := poker.CompareResults(ourResult, playerResult)
		// Fail fast. If there is at least 1 stronger hand - Lose
		if comparison < 0 {
			return StepResult{ourResult.Combination, lose}
		}
		outcomeMaxDiff = max(outcomeMaxDiff, comparison)
	}

	if outcomeMaxDiff > 0 {
		return StepResult{ourResult.Combination, win}
	}
	return StepResult{ourResult.Combination, tie}
}
