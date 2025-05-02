package logger

import (
	"fmt"
	"log"
	"os"

	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"
)

// GetCore creates and returns a zapcore.Core that writes logs to both stdout and a file.
// It configures log formats for production and development environments.
func GetCore(level zap.AtomicLevel) zapcore.Core {
	stdout := zapcore.AddSync(os.Stdout)

	// logFile, err := os.OpenFile("logs/app.log", os.O_CREATE|os.O_WRONLY|os.O_APPEND, 0644)
	// if err != nil {
	// 	log.Fatal(err)
	// }
	// // TODO: add Closer-pattern in order to close the file after application shutdown
	// // defer logFile.Close()

	// fileWriter := zapcore.AddSync(logFile)

	// Set up encoder configurations for production and development.
	productionCfg := zap.NewProductionEncoderConfig()
	productionCfg.TimeKey = "timestamp"
	productionCfg.EncodeTime = zapcore.ISO8601TimeEncoder

	developmentCfg := zap.NewDevelopmentEncoderConfig()
	developmentCfg.EncodeLevel = zapcore.CapitalColorLevelEncoder // Colorizes log levels in console

	consoleEncoder := zapcore.NewConsoleEncoder(developmentCfg)
	// fileEncoder := zapcore.NewJSONEncoder(productionCfg)

	return zapcore.NewTee(
		zapcore.NewCore(consoleEncoder, stdout, level),
		// zapcore.NewCore(fileEncoder, fileWriter, level),
	)
}

// GetAtomicLevel returns a zap.AtomicLevel based on the provided log level string.
// It sets the log level and logs an error if the level is invalid.
func GetAtomicLevel(logLevel *string) zap.AtomicLevel {
	var level zapcore.Level
	fmt.Println("logger level: ", *logLevel)
	if err := level.Set(*logLevel); err != nil {
		log.Fatalf("failed to set log level %v", err)
	}

	return zap.NewAtomicLevelAt(level)
}
