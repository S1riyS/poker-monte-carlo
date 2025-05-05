package utils

import (
	"github.com/S1riyS/poker-monte-carlo/pkg/poker"
)

type Outcome string

const (
	WIN  Outcome = "win"
	LOSE Outcome = "lose"
	TIE  Outcome = "tie"
)

type Simulation struct {
	players int
	hand    []poker.Card
	table   []poker.Card
	pool    CardPool
}

type StepResult struct {
	Combination poker.Combination
	Outcome     Outcome
}

func NewSimulation(players int, hand []poker.Card, table []poker.Card) *Simulation {
	// Setup known cards
	var knownCards []poker.Card
	knownCards = append(knownCards, hand...)
	knownCards = append(knownCards, table...)

	// Setup card pool
	pool := NewCardPool(knownCards...)

	return &Simulation{
		players: players,
		hand:    hand,
		table:   table,
		pool:    *pool,
	}
}

// RunStep runs 1 step of a simulation.
// Reciever function uses value instead of reference in order to reuse CardPool
func (s Simulation) RunStep() StepResult {
	s.pool.ShuffleDeck()

	// Fill table with missing cards
	simulationTable := s.table
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
	copy(cards[5:7], s.hand)
	ourResult := poker.Evaluate(cards...)

	// Simulate others hands
	var outcomeMaxDiff int
	for range s.players {
		playerHand := s.pool.PickMany(2)
		copy(cards[5:7], playerHand)
		playerResult := poker.Evaluate(cards...)

		comparison := poker.CompareResults(ourResult, playerResult)
		// Fail fast. If there is at least 1 stronger hand - Lose
		if comparison < 0 {
			return StepResult{ourResult.Combination, LOSE}
		}
		outcomeMaxDiff = max(outcomeMaxDiff, comparison)
	}

	if outcomeMaxDiff > 0 {
		return StepResult{ourResult.Combination, WIN}
	}
	return StepResult{ourResult.Combination, TIE}
}
