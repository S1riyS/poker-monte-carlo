package poker

type Suit string

const (
	Hearts   = "Hearts"
	Diamonds = "Diamonds"
	Clubs    = "Clubs"
	Spades   = "Spades"
)

var SuitList = [4]Suit{Hearts, Diamonds, Clubs, Spades}

type Card struct {
	Suit Suit
	Rank int
}

type Hand = [2]Card

type Table = [5]Card

type Outcome string

const (
	Win  Outcome = "win"
	Lose         = "lose"
	Tie          = "tie"
)
