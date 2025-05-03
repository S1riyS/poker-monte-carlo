package poker

type CombinationName string

type Combination struct {
	Name  string
	Value int
}

var (
	HIGH_CARD       = Combination{"high_card", 1}
	PAIR            = Combination{"pair", 2}
	TWO_PAIRS       = Combination{"two_pairs", 3}
	THREE_OF_A_KIND = Combination{"three_of_a_kind", 4}
	STRAIGHT        = Combination{"straight", 5}
	FLUSH           = Combination{"flush", 6}
	FULL_HOUSE      = Combination{"full_house", 7}
	FOUR_OF_A_KIND  = Combination{"four_of_a_kind", 8}
	STRAIGHT_FLUSH  = Combination{"straight_flush", 9}
	ROYAL_FLUSH     = Combination{"royal_flush", 10}
)

var CombinationList = []Combination{
	HIGH_CARD,
	PAIR,
	TWO_PAIRS,
	THREE_OF_A_KIND,
	STRAIGHT,
	FLUSH,
	FULL_HOUSE,
	FOUR_OF_A_KIND,
	STRAIGHT_FLUSH,
	ROYAL_FLUSH,
}

type CombinationResult struct {
	Combination Combination
	RankValues  []int // Used for tie-breakers: sorted list of relevant card ranks
}
