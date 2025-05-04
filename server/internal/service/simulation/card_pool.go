package simulation

import (
	"github.com/S1riyS/poker-monte-carlo/pkg/poker"
)

type CardPool struct {
	pool              []poker.Card
	permutation       []int
	permutationPoiner int
}

// NewCardPool creates new CardPool in O(DECK_SIZE)
func NewCardPool(knownCards ...poker.Card) *CardPool {
	// Set optimization that allows to check if card exists in O(1)
	knownCardsSet := make(map[poker.Card]bool, len(knownCards))
	for _, card := range knownCards {
		knownCardsSet[card] = true
	}

	// Calculate pool size
	poolSize := poker.DECK_SIZE - len(knownCards)

	// Setup key CardPool fields
	// TODO: return to original allocation and fix assignment
	// pool := make([]poker.Card, poolSize)
	var pool []poker.Card
	permutation := getPermutation(poolSize)

	// Fill pool
	// Iterate rank from MIN_CARD_RANK to MAX_CARD_RANK, for each rank iterate over all suits
	for rank := poker.MIN_CARD_RANK; rank <= poker.MAX_CARD_RANK; rank++ {
		for _, suit := range poker.SuitList {
			currentCard := poker.Card{Rank: rank, Suit: suit}

			_, alreadyExists := knownCardsSet[currentCard]
			if !alreadyExists {
				pool = append(pool, currentCard)
			}
		}
	}

	return &CardPool{
		pool:              pool,
		permutation:       permutation,
		permutationPoiner: 0,
	}
}

// PickMany returns k random cards from pool in O(k)
func (cp *CardPool) PickMany(k int) []poker.Card {
	result := make([]poker.Card, k)
	for i := range k {
		indexToPick := cp.permutation[cp.permutationPoiner]
		result[i] = cp.pool[indexToPick]
		cp.permutationPoiner += 1
	}

	return result
}

// PickOne returns 1 random cards from pool in O(1)
func (cp *CardPool) PickOne() poker.Card {
	indexToPick := cp.permutation[cp.permutationPoiner]
	result := cp.pool[indexToPick]
	cp.permutationPoiner += 1

	return result
}

func (cp *CardPool) ShuffleDeck() {
	cp.permutation = getPermutation(len(cp.pool))
}
