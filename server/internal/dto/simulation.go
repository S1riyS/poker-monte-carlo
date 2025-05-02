package dto

import (
	"github.com/S1riyS/poker-monte-carlo/pkg/poker"
)

type SimulationRequest struct {
	Iterations int
	Hand       poker.Hand
	Table      *poker.Table
}

type CombinationResult struct {
	Name string
	Win  int
	Lose int
	Tie  int
}

type SimulationResponse struct {
	Data []CombinationResult
}

func NewMockSimulationResponse() SimulationResponse {
	return SimulationResponse{
		Data: []CombinationResult{
			{"high_card", 187, 200, 0},
			{"straight", 9, 0, 5},
		},
	}
}
