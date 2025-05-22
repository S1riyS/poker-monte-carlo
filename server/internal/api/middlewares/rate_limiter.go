package middlewares

import (
	"net/http"
	"sync"
	"time"

	"github.com/S1riyS/poker-monte-carlo/internal/apperrors"
	"github.com/gofiber/fiber/v2"
)

var (
	requestCounts = make(map[string]int)
	mu            sync.Mutex
)

func RateLimiter(limit int, window time.Duration) fiber.Handler {
	return func(c *fiber.Ctx) error {
		ip := c.IP()

		mu.Lock()
		defer mu.Unlock()

		// Reset the count if the time window has passed
		if _, ok := requestCounts[ip]; !ok {
			requestCounts[ip] = 0
		}

		if requestCounts[ip] < limit {
			requestCounts[ip]++
			// Decrement the count after the time window
			go func() {
				time.Sleep(window)
				mu.Lock()
				requestCounts[ip]--
				mu.Unlock()
			}()
			return c.Next()
		}

		return apperrors.NewApiError(http.StatusTooManyRequests, "Too many requests", "Rate limit exceeded. Try again later.")
	}
}
