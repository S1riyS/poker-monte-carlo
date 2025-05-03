package simulation

import (
	"math/rand"
	"time"
)

// Generate a random permutation of numbers from 1 to n
func getPermutation(n int) []int {
	// Create a slice with numbers 1 to n
	perm := make([]int, n)
	for i := range perm {
		perm[i] = i + 1
	}

	// Seed the random number generator
	rand.Seed(time.Now().UnixNano())

	// Fisher-Yates shuffle algorithm
	for i := n - 1; i > 0; i-- {
		j := rand.Intn(i + 1)
		perm[i], perm[j] = perm[j], perm[i]
	}

	return perm
}
