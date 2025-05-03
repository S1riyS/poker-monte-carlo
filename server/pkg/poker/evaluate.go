package poker

import (
	"sort"
)

func detectStraight(values []int) (bool, int) {
	uniqueValues := make([]int, 0)
	seen := make(map[int]bool)

	// Get unique values in descending order
	for _, v := range values {
		if !seen[v] {
			seen[v] = true
			uniqueValues = append(uniqueValues, v)
		}
	}
	sort.Sort(sort.Reverse(sort.IntSlice(uniqueValues)))

	// Check for normal straight
	for i := 0; i <= len(uniqueValues)-5; i++ {
		if uniqueValues[i]-uniqueValues[i+4] == 4 {
			return true, uniqueValues[i]
		}
	}

	// Check for wheel (A-2-3-4-5)
	wheel := map[int]bool{14: true, 2: true, 3: true, 4: true, 5: true}
	hasWheel := true
	for rank := range wheel {
		if !seen[rank] {
			hasWheel = false
			break
		}
	}
	if hasWheel {
		return true, 5
	}

	return false, 0
}

func evaluateFiveCards(cards []Card) CombinationResult {
	values := make([]int, len(cards))
	suits := make([]Suit, len(cards))

	for i, card := range cards {
		values[i] = card.Rank
		suits[i] = card.Suit
	}
	sort.Sort(sort.Reverse(sort.IntSlice(values)))

	// Count value occurrences
	valueCounts := make(map[int]int)
	for _, v := range values {
		valueCounts[v]++
	}

	// Count suit occurrences
	suitCounts := make(map[Suit]int)
	for _, s := range suits {
		suitCounts[s]++
	}

	// Check flush
	isFlush := false
	var flushSuit Suit
	for s, count := range suitCounts {
		if count >= 5 {
			isFlush = true
			flushSuit = s
			break
		}
	}

	// Get flush cards if flush exists
	flushCards := make([]int, 0)
	if isFlush {
		for _, card := range cards {
			if card.Suit == flushSuit {
				flushCards = append(flushCards, card.Rank)
			}
		}
		sort.Sort(sort.Reverse(sort.IntSlice(flushCards)))
	}

	// Check straight
	isStraight, straightHigh := detectStraight(values)

	// Check straight flush
	if isFlush && isStraight {
		// Need to check if the straight is all the same suit
		straightFlushCards := make([]Card, 0)
		for _, card := range cards {
			if card.Suit == flushSuit {
				straightFlushCards = append(straightFlushCards, card)
			}
		}
		sfValues := make([]int, len(straightFlushCards))
		for i, card := range straightFlushCards {
			sfValues[i] = card.Rank
		}
		isStraightFlush, sfHigh := detectStraight(sfValues)
		if isStraightFlush {
			if sfHigh == 14 {
				return CombinationResult{
					Combination: Combination{Name: "royal_flush", Value: 10},
					RankValues:  []int{14},
				}
			}
			return CombinationResult{
				Combination: Combination{Name: "straight_flush", Value: 9},
				RankValues:  []int{sfHigh},
			}
		}
	}

	// Check four of a kind
	for v, count := range valueCounts {
		if count == 4 {
			kicker := 0
			for _, val := range values {
				if val != v && val > kicker {
					kicker = val
				}
			}
			return CombinationResult{
				Combination: Combination{Name: "four_of_a_kind", Value: 8},
				RankValues:  []int{v, kicker},
			}
		}
	}

	// Check full house
	hasThree := false
	threeValue := 0
	hasTwo := false
	twoValue := 0
	for v, count := range valueCounts {
		if count == 3 {
			if v > threeValue {
				threeValue = v
				hasThree = true
			}
		} else if count >= 2 {
			if v > twoValue && v != threeValue {
				twoValue = v
				hasTwo = true
			}
		}
	}
	if hasThree && hasTwo {
		return CombinationResult{
			Combination: Combination{Name: "full_house", Value: 7},
			RankValues:  []int{threeValue, twoValue},
		}
	}

	// Check flush
	if isFlush {
		return CombinationResult{
			Combination: Combination{Name: "flush", Value: 6},
			RankValues:  flushCards[:5], // Take top 5 flush cards
		}
	}

	// Check straight
	if isStraight {
		return CombinationResult{
			Combination: Combination{Name: "straight", Value: 5},
			RankValues:  []int{straightHigh},
		}
	}

	// Check three of a kind
	if hasThree {
		kickers := make([]int, 0)
		for _, v := range values {
			if v != threeValue {
				kickers = append(kickers, v)
			}
		}
		sort.Sort(sort.Reverse(sort.IntSlice(kickers)))
		return CombinationResult{
			Combination: Combination{Name: "three_of_a_kind", Value: 4},
			RankValues:  append([]int{threeValue}, kickers[:2]...),
		}
	}

	// Check two pair
	pairs := make([]int, 0)
	for v, count := range valueCounts {
		if count == 2 {
			pairs = append(pairs, v)
		}
	}
	if len(pairs) >= 2 {
		sort.Sort(sort.Reverse(sort.IntSlice(pairs)))
		kicker := 0
		for _, v := range values {
			if v != pairs[0] && v != pairs[1] && v > kicker {
				kicker = v
			}
		}
		return CombinationResult{
			Combination: Combination{Name: "two_pair", Value: 3},
			RankValues:  []int{pairs[0], pairs[1], kicker},
		}
	}

	// Check pair
	if len(pairs) == 1 {
		kickers := make([]int, 0)
		for _, v := range values {
			if v != pairs[0] {
				kickers = append(kickers, v)
			}
		}
		sort.Sort(sort.Reverse(sort.IntSlice(kickers)))
		return CombinationResult{
			Combination: Combination{Name: "pair", Value: 2},
			RankValues:  append([]int{pairs[0]}, kickers[:3]...),
		}
	}

	// High card
	return CombinationResult{
		Combination: Combination{Name: "high_card", Value: 1},
		RankValues:  values[:5],
	}
}

func combinations(n, k int, f func([]int)) {
	s := make([]int, k)
	last := k - 1
	var rc func(int, int)
	rc = func(i, next int) {
		for j := next; j < n; j++ {
			s[i] = j
			if i == last {
				f(s)
			} else {
				rc(i+1, j+1)
			}
		}
	}
	rc(0, 0)
}

func CompareResults(a, b CombinationResult) int {
	if a.Combination.Value != b.Combination.Value {
		return a.Combination.Value - b.Combination.Value
	}
	for i := 0; i < len(a.RankValues) && i < len(b.RankValues); i++ {
		if a.RankValues[i] != b.RankValues[i] {
			return a.RankValues[i] - b.RankValues[i]
		}
	}
	return 0
}

func Evaluate(cards ...Card) CombinationResult {
	var bestResult CombinationResult

	// Generate all 5-card combinations from the 7 available cards
	combinations(7, 5, func(indices []int) {
		fiveCards := make([]Card, 5)
		for i, idx := range indices {
			fiveCards[i] = cards[idx]
		}
		result := evaluateFiveCards(fiveCards)

		if bestResult.Combination.Value == 0 || CompareResults(result, bestResult) > 0 {
			bestResult = result
		}
	})

	return bestResult
}
