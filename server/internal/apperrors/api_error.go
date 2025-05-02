package apperrors

import "net/http"

type ApiError struct {
	Code    int
	Title   string
	Details string
}

func (e *ApiError) Error() string {
	return e.Details
}

func NewApiError(code int, title string, details string) *ApiError {
	return &ApiError{
		Code:    code,
		Title:   title,
		Details: details,
	}
}

func NewInternalError() *ApiError {
	return &ApiError{
		Code:    http.StatusInternalServerError,
		Title:   "Internal error",
		Details: "Something went wrong",
	}
}

func NewUnprocessableEntityError() *ApiError {
	return &ApiError{
		Code:    http.StatusUnprocessableEntity,
		Title:   "Unprocessable entity",
		Details: "Invalid request",
	}
}
