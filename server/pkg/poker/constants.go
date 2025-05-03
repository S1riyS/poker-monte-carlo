package poker

var (
	MIN_CARD_RANK = 2
	MAX_CARD_RANK = 14
	SUITS_COUNT   = len(SuitList)
	DECK_SIZE     = (MAX_CARD_RANK - MIN_CARD_RANK) * SUITS_COUNT
)
