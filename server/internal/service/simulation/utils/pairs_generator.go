package utils

import "github.com/S1riyS/poker-monte-carlo/pkg/poker"

// GenerateUniqueHands generates the 169 unique starting hands
func GenerateUniqueHands() [][2]poker.Card {
	var hands [][2]poker.Card

	// Pocket pairs (AA, KK, ..., 22)
	for rank := poker.MAX_CARD_RANK; rank >= poker.MIN_CARD_RANK; rank-- {
		hands = append(hands, [2]poker.Card{
			{Rank: rank, Suit: poker.HEARTS},
			{Rank: rank, Suit: poker.DIAMONDS},
		})
	}

	// Suited and offsuit hands
	for highRank := poker.MAX_CARD_RANK; highRank >= poker.MIN_CARD_RANK+1; highRank-- {
		for lowRank := highRank - 1; lowRank >= poker.MIN_CARD_RANK; lowRank-- {
			// Suited
			hands = append(hands, [2]poker.Card{
				{Rank: highRank, Suit: poker.HEARTS},
				{Rank: lowRank, Suit: poker.HEARTS},
			})

			// Offsuit
			hands = append(hands, [2]poker.Card{
				{Rank: highRank, Suit: poker.HEARTS},
				{Rank: lowRank, Suit: poker.DIAMONDS},
			})
		}
	}

	return hands
}
