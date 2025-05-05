package mapper

import (
	"github.com/S1riyS/poker-monte-carlo/internal/dto"
	"github.com/S1riyS/poker-monte-carlo/pkg/poker"
)

func Card2PkgMapper(card dto.SimulationCard) poker.Card {
	return poker.Card{
		Rank: card.Rank,
		Suit: card.Suit,
	}
}

func Card2DtoMapper(card poker.Card) dto.SimulationCard {
	return dto.SimulationCard{
		Rank: card.Rank,
		Suit: card.Suit,
	}
}
