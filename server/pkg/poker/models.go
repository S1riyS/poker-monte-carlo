package poker

type Suit string

const (
	HEARTS   Suit = "hearts"
	DIAMONDS Suit = "diamonds"
	CLUBS    Suit = "clubs"
	SPADES   Suit = "spades"
)

var SuitList = [4]Suit{HEARTS, DIAMONDS, CLUBS, SPADES}

type Card struct {
	Rank int
	Suit Suit
}
