package config

import (
	"sync"

	"github.com/S1riyS/poker-monte-carlo/pkg/logger"
	"github.com/ilyakaznacheev/cleanenv"
	"go.uber.org/zap"
)

type Config struct {
	App AppConfig
}

type AppConfig struct {
	Env               string `env:"ENV" env-default:"development"`
	Port              int    `env:"PORT" env-default:"8080"`
	AllowedOrigins    string `env:"ALLOWED_ORIGINS" env-default:"*"`
	RequestsPerMinute int    `env:"REQUESTS_PER_MINUTE" env-default:"10"`
}

var (
	instance *Config
	once     sync.Once
)

// GetConfig returns the application configuration.
// Note that config.Config is a singleton
func GetConfig() *Config {
	const mark = "config.GetConfig"

	once.Do(func() {
		logger.Info("read application configuration", mark)
		instance = &Config{}
		if err := cleanenv.ReadEnv(instance); err != nil {
			logger.Fatal("failed to read application configuration", mark, zap.Error(err))
		}
	})
	return instance
}
