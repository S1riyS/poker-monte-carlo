package app

import (
	"github.com/S1riyS/poker-monte-carlo/internal/config"
)

type serviceProvider struct {
	// Configs
	config *config.Config

	// Service

	// Controllers

}

func newServiceProvider() *serviceProvider {
	return &serviceProvider{}
}

func (s *serviceProvider) Config() *config.Config {
	if s.config == nil {
		s.config = config.GetConfig()
	}
	return s.config
}
