package service

import (
	"math/rand"
	"time"

	"github.com/S1riyS/poker-monte-carlo/internal/dto"
	"github.com/S1riyS/poker-monte-carlo/pkg/poker"
)

type SimulationService struct{}

func (ss *SimulationService) Run(data dto.SimulationRequest) dto.SimulationResponse {
	const mark = "service.simulation.Run"

	// Lookup table to retrieve combinationsfrom response object faster
	var responseCombinationLookup = make(map[string]*dto.CombinationResult, len(poker.Combinations))
	// Response object
	var response dto.SimulationResponse
	response.Data = make([]dto.CombinationResult, len(poker.Combinations))
	// Fill response object and lookup table
	for i, combination := range poker.Combinations {
		response.Data[i] = dto.CombinationResult{
			Name: combination.Name,
			Win:  0,
			Lose: 0,
			Tie:  0,
		}
		responseCombinationLookup[combination.Name] = &response.Data[i]
	}

	for range data.Iterations {
		combintaion, outcome := simulationStep(data)
		responseCombination := responseCombinationLookup[combintaion.Name]

		switch outcome {
		case poker.Win:
			responseCombination.Win += 1
		case poker.Lose:
			responseCombination.Lose += 1
		case poker.Tie:
			responseCombination.Tie += 1
		}
	}
	return response
}

func simulationStep(data dto.SimulationRequest) (poker.Combination, poker.Outcome) {
	// Pool of cards for current game
	gamePoolSize := 2*(data.Players+1) + 5
	gamePool := make([]poker.Card, gamePoolSize)

	// Fill pool with known cards
	copy(gamePool[0:2], data.Hand[:])
	copy(gamePool[2:2+len(data.Table)], data.Table)

	// Fill table to 5 cards (if needed)
	var simulationTable = data.Table
	if len(data.Table) != 5 {
		tableMissingSize := 5 - len(data.Table)
		tableMissing := getRandomCards(gamePool, tableMissingSize)
		simulationTable = append(simulationTable, tableMissing...)
	}

	// Cards 0-4: Table
	// Cards 5-6: Someone's Hand
	cards := make([]poker.Card, 7)
	copy(cards[0:5], simulationTable)

	// Simulate our hand
	copy(cards[5:7], data.Hand[:])
	ourResult := poker.Evaluate(cards...)

	// Simulate others hands
	var outcomeMaxDiff int
	for range data.Players {
		playerHand := getRandomCards(gamePool, 2)
		copy(cards[5:7], playerHand)
		playerResult := poker.Evaluate(cards...)

		comparison := poker.CompareResults(ourResult, playerResult)
		// Fail fast. If there is at least 1 stronger hand - Lose
		if comparison < 0 {
			return ourResult.Combination, poker.Lose
		}
		outcomeMaxDiff = max(outcomeMaxDiff, comparison)
	}

	if outcomeMaxDiff > 0 {
		return ourResult.Combination, poker.Win
	}
	return ourResult.Combination, poker.Tie
}

// getRandomCard generates n unique random cards that don't exist in the pool
// and adds them to the pool. Returns the new cards.
func getRandomCards(pool []poker.Card, n int) []poker.Card {
	if n <= 0 {
		return nil
	}

	// Initialize random number generator
	r := rand.New(rand.NewSource(time.Now().UnixNano()))

	// Create a set of existing cards for quick lookup
	existing := make(map[poker.Card]bool, len(pool))
	for _, card := range pool {
		existing[card] = true
	}

	// Calculate maximum possible unique cards (52 - existing)
	maxPossible := 52 - len(existing)
	if n > maxPossible {
		n = maxPossible // Can't generate more than available
	}

	var newCards []poker.Card

	// For smaller numbers, generate random cards until we get enough unique ones
	newCards = make([]poker.Card, 0, n)
	for len(newCards) < n {
		card := poker.Card{
			Suit: poker.SuitList[r.Intn(len(poker.SuitList))],
			Rank: 2 + r.Intn(13), // Ranks from 2 to 14 (Ace)
		}
		if !existing[card] {
			existing[card] = true
			newCards = append(newCards, card)
		}
	}

	// Update the pool with new cards
	pool = append(pool, newCards...)

	return newCards
}
