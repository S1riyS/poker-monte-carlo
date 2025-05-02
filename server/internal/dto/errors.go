package dto

import "time"

// API error
type ApiErrorResponse struct {
	Timestamp time.Time `json:"timestamp" example:"2025-02-03T15:57:31.17345643+00:00"`
	Title     string    `json:"title" example:"Error title"`
	Details   string    `json:"details" example:"Something went wrong"`
}

// Validation error
type ValidationErrorResponse struct {
	Timestamp time.Time              `json:"timestamp" example:"2025-02-03T15:57:31.17345643+00:00"`
	Title     string                 `json:"title" example:"Validation error"`
	Fields    []ValidationFieldError `json:"fields"`
}

type ValidationFieldError struct {
	Name    string `json:"name" example:"field_name"`
	Message string `json:"message" example:"field_name is required"`
}
