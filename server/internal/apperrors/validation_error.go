package apperrors

import "net/http"

// ValidationFieldError is a single field error
type ValidationFieldError struct {
	Name    string
	Message string
}

// ValidationError is an accummulator for every field error of struct
type ValidationError struct {
	Code   int
	Title  string
	Fields []ValidationFieldError
}

func (e *ValidationError) Error() string {
	return "validation error"
}

func NewValidationError(fields []ValidationFieldError) *ValidationError {
	return &ValidationError{
		Code:   http.StatusBadRequest,
		Title:  "Validation error",
		Fields: fields,
	}
}
