package dto

import (
	"github.com/S1riyS/poker-monte-carlo/pkg/poker"
)

// NOTE: see pkg/poker/constants.go to determin min and max for card rank
// (min=MIN_CARD_RANK, max=MAX_CARD_RANK)
type SimulationCard struct {
	Rank int        `json:"rank" validate:"required,min=2,max=14" example:"11"`
	Suit poker.Suit `json:"suit" validate:"required,poker_suit_enum" example:"diamonds"`
}

type SimulationRequest struct {
	// Number of iterations in a simulation
	Iterations int `json:"iterations" validate:"required,max=250000" example:"10000"`
	// Number of other players at the table
	Players int `json:"players" validate:"required,min=1,max=10" example:"5"`
	// Starting hand
	Hand []SimulationCard `json:"hand" validate:"required,len=2,dive"`
	// Cards on the table (flop, turn & river)
	Table []SimulationCard `json:"table" validate:"required,max=5,dive"`
}

type CombinationResult struct {
	Name string `json:"name" example:"straight"`
	Win  int    `json:"win" example:"158"`
	Lose int    `json:"lose" example:"33"`
	Tie  int    `json:"tie" example:"7"`
}

type SimulationResponse struct {
	Data []CombinationResult `json:"data"`
}
