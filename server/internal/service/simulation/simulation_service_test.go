package simulation

import (
	"fmt"
	"math/rand"
	"testing"

	"github.com/S1riyS/poker-monte-carlo/internal/dto"
	"github.com/S1riyS/poker-monte-carlo/internal/mapper"
	"github.com/S1riyS/poker-monte-carlo/internal/service/simulation/utils"
	"github.com/S1riyS/poker-monte-carlo/pkg/poker"
)

const PLAYER_COUNT = 6

var TABLE_SIZES = [4]int{0, 3, 4, 5}

func generateBenchmarkName(iterations int, players int) string {
	return fmt.Sprintf("iterations %d players %d", iterations, players)
}

func BenchmarkSimulationServiceRun(b *testing.B) {
	// Interations data
	iterationsData := []struct {
		iterations int
	}{
		{iterations: 1},
		{iterations: 10},
		{iterations: 100},
		{iterations: 1000},
		{iterations: 10000},
	}

	// Init
	service := NewSimulationService()
	dtoMapper := mapper.MapFunc[poker.Card, dto.SimulationCard](mapper.Card2DtoMapper)

	// Run benchmarks
	b.ResetTimer()
	for _, data := range iterationsData {
		// Setup request DTO
		b.StopTimer()
		cardPool := utils.NewCardPool()
		tableSize := TABLE_SIZES[rand.Intn(len(TABLE_SIZES))]
		request := dto.SimulationRequest{
			Iterations: data.iterations,
			Players:    PLAYER_COUNT,
			Hand:       dtoMapper.MapEach(cardPool.PickMany(2)),
			Table:      dtoMapper.MapEach(cardPool.PickMany(tableSize)),
		}

		// Run benchmark
		b.StartTimer()
		benchName := generateBenchmarkName(data.iterations, PLAYER_COUNT)
		b.Run(benchName, func(b *testing.B) {
			for i := 0; i < b.N; i++ {
				service.Run(request)
			}
		})
	}
}
