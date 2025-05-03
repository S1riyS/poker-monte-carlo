package poker

type CombinationName string

type Combination struct {
	Name  string
	Value int
}

var Combinations = []Combination{
	{"high_card", 1},
	{"pair", 2},
	{"two_pairs", 3},
	{"three_of_a_kind", 4},
	{"straight", 5},
	{"flush", 6},
	{"full_house", 7},
	{"four_of_a_kind", 8},
	{"straight_flush", 9},
	{"royal_flush", 10},
}

type CombinationResult struct {
	Combination Combination
	RankValues  []int // Used for tie-breakers: sorted list of relevant card ranks
}
