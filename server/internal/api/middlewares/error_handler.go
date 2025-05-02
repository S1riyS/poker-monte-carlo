package middlewares

import (
	"errors"
	"time"

	"github.com/S1riyS/poker-monte-carlo/internal/apperrors"
	"github.com/S1riyS/poker-monte-carlo/internal/dto"
	"github.com/gofiber/fiber/v2"
)

var internalError = apperrors.NewInternalError()

func ErrorHandler(ctx *fiber.Ctx) error {
	err := ctx.Next()

	// Handle application API errors
	var apiErr *apperrors.ApiError
	if errors.As(err, &apiErr) {
		return ctx.Status(apiErr.Code).JSON(apiErrorToResponse(apiErr))
	}

	// Handle validation errors
	var validationErr *apperrors.ValidationError
	if errors.As(err, &validationErr) {
		return ctx.Status(validationErr.Code).JSON(validationErrorToResponse(validationErr))
	}

	if err != nil {
		return ctx.Status(internalError.Code).JSON(apiErrorToResponse(internalError))
	}

	return nil
}

func apiErrorToResponse(err *apperrors.ApiError) dto.ApiErrorResponse {
	return dto.ApiErrorResponse{
		Timestamp: time.Now(),
		Title:     err.Title,
		Details:   err.Details,
	}
}

func validationErrorToResponse(err *apperrors.ValidationError) dto.ValidationErrorResponse {
	// Convert fields
	responseValidationFieldErrors := make([]dto.ValidationFieldError, len(err.Fields))
	for i, field := range err.Fields {
		responseValidationFieldErrors[i] = dto.ValidationFieldError{
			Name:    field.Name,
			Message: field.Message,
		}
	}
	// Create validation error response
	return dto.ValidationErrorResponse{
		Timestamp: time.Now(),
		Title:     err.Title,
		Fields:    responseValidationFieldErrors,
	}
}
