package app

import (
	"context"
	"flag"
	"fmt"
	"log"
	"os/signal"
	"syscall"
	"time"

	"github.com/S1riyS/poker-monte-carlo/internal/api/middlewares"
	"github.com/S1riyS/poker-monte-carlo/internal/api/router"
	"github.com/S1riyS/poker-monte-carlo/internal/security/validation"
	"github.com/S1riyS/poker-monte-carlo/pkg/logger"
	_ "github.com/S1riyS/poker-monte-carlo/swagger"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/recover"
	"github.com/gofiber/swagger"
	"github.com/joho/godotenv"
	"go.uber.org/zap"
)

const (
	ENV_PATH = ".env"
)

var logLevel = flag.String("l", "info", "log level")

type App struct {
	fiberServer *fiber.App
	provider    *serviceProvider
}

func New() *App {
	const mark = "app.New"

	app := &App{}
	err := app.runInitSteps()
	if err != nil {
		logger.Fatal("failed to init deps", mark)
	}
	return app
}

func (a *App) Run() error {
	const mark = "app.Run"

	go func() {
		port := a.provider.Config().App.Port
		processedPort := fmt.Sprintf(":%d", port)
		err := a.fiberServer.Listen(processedPort)
		if err != nil {
			logger.Fatal("failed to start http server", mark, zap.Int("port", port))
		}
	}()
	return nil
}

func (a *App) GracefulShutdown(done chan bool) {
	const mark = "app.GracefulShutdown"

	// Create context that listens for the interrupt signal from the OS.
	ctx, stop := signal.NotifyContext(context.Background(), syscall.SIGINT, syscall.SIGTERM)
	defer stop()

	// Listen for the interrupt signal.
	<-ctx.Done()

	logger.Info("shutting down", mark)

	// The context is used to inform the server it has 5 seconds to finish
	// the request it is currently handling
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	if err := a.fiberServer.ShutdownWithContext(ctx); err != nil {
		logger.Error("Server forced to shutdown", mark, zap.Error(err))
	}

	logger.Info("Server exiting", mark)

	// Notify the main goroutine that the shutdown is complete
	done <- true
}

func (a *App) runInitSteps() error {
	const mark = "app.runInitSteps"

	initSteps := []func() error{
		a.initEnvironment,
		a.initLogger,
		a.initFiberServer,
		a.initServiceProvider,
		a.initValidator,
		a.initControllers,
	}

	for _, step := range initSteps {
		if err := step(); err != nil {
			logger.Fatal("failed to init deps", mark)
		}
	}

	return nil
}

func (a *App) initLogger() error {
	flag.Parse()                                                 // Parse command-line flags
	logger.Init(logger.GetCore(logger.GetAtomicLevel(logLevel))) // Initialize logger with the specified log level
	return nil
}

func (a *App) initFiberServer() error {
	a.fiberServer = fiber.New(fiber.Config{
		ServerHeader: "github.com/S1riyS/go-quiz",
		AppName:      "github.com/S1riyS/go-quiz",
	})

	// CORS policy
	a.fiberServer.Use(cors.New(cors.Config{
		AllowOrigins:     "*",
		AllowMethods:     "GET,POST,PUT,DELETE,OPTIONS,PATCH",
		AllowHeaders:     "Accept, Authorization, Content-Type",
		AllowCredentials: false,
		MaxAge:           300,
	}))

	// Apply middlewares
	a.fiberServer.Use(
		middlewares.Logger,       // Logger
		middlewares.ErrorHandler, // Error handler
		recover.New(),            // Recover
	)

	return nil
}

func (a *App) initEnvironment() error {
	const mark = "app.initEnvironment"

	err := godotenv.Load(ENV_PATH)
	if err != nil {
		log.Fatal("error loading .env file", mark, zap.String("path", ENV_PATH))
		return fmt.Errorf("error loading %v file: %v", ENV_PATH, err)
	}
	return nil
}

func (a *App) initServiceProvider() error {
	a.provider = newServiceProvider()
	return nil
}

func (a *App) initValidator() error {
	validation.InitValidator()
	return nil
}

func (a *App) initControllers() error {
	// Root router (/api)
	api := a.fiberServer.Group("/api")
	api.Get("/docs/*", swagger.HandlerDefault) // Docs - /api/docs

	// API v1 router (/api/v1)
	v1Router := api.Group("/v1")
	router.Setup(v1Router)

	return nil
}
