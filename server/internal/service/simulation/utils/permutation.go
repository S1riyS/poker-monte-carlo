package utils

import (
	"math/rand"
)

// GenerateRandomPermutation generates a random permutation of numbers 0..n-1
// using Fisher-Yates shuffle algorithm.
//
// Complexity:
// Time - O(n)
// Space - O(1)
func getPermutation(n int) []int {
	// Initialize the slice with sequential numbers
	perm := make([]int, n)
	for i := 0; i < n; i++ {
		perm[i] = i
	}

	// Shuffle slice
	rand.Shuffle(n, func(i, j int) {
		perm[i], perm[j] = perm[j], perm[i]
	})

	return perm
}
