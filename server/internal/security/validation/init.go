package validation

import (
	"fmt"
	"reflect"
	"strings"

	"github.com/S1riyS/poker-monte-carlo/internal/apperrors"
	"github.com/go-playground/validator/v10"
)

// validatorInstance is a global validator instance
var validatorInstance = validator.New()

func InitValidator() {
	// Custom funtion that retrives json tag as a name of field
	validatorInstance.RegisterTagNameFunc(func(fld reflect.StructField) string {
		name := strings.SplitN(fld.Tag.Get("json"), ",", 2)[0]
		if name == "-" {
			return ""
		}
		return name
	})

	// Application specific validation functions
	validatorInstance.RegisterValidation(poker_suit_enum_name, validatePokerSuitEnum)
}

func Validate(data any) error {
	err := validatorInstance.Struct(data)
	if err != nil {
		validatorError := err.(validator.ValidationErrors)
		return validatorErrorToAppError(validatorError)
	}
	return nil
}

// validatorErrorToAppError converts validator package error (github.com/go-playground/validator/v10)
// to application specific validation error (apperrors.ValidationError)
func validatorErrorToAppError(errors validator.ValidationErrors) *apperrors.ValidationError {
	// Convert fields
	fields := make([]apperrors.ValidationFieldError, len(errors))
	for i, err := range errors {
		fields[i] = apperrors.ValidationFieldError{
			Name:    err.Field(),
			Message: getCustomErrorMessage(err),
		}
	}

	return apperrors.NewValidationError(fields)
}

// getCustomErrorMessage returns custom error message for given validator field error
func getCustomErrorMessage(err validator.FieldError) string {
	field := err.Field()
	tag := err.Tag()
	params := err.Param()

	var sizeName string
	switch err.Kind() {
	case reflect.Slice, reflect.String:
		sizeName = "length"
	case reflect.Int, reflect.Float32, reflect.Float64:
		sizeName = "value"
	default:
		sizeName = "size"
	}

	switch tag {
	case "required":
		return fmt.Sprintf("%s is required", field)
	case "min":
		return fmt.Sprintf("%s of %s must be at least %v", sizeName, field, params)
	case "max":
		return fmt.Sprintf("%s of %s must be at most %v", sizeName, field, params)
	case "len":
		return fmt.Sprintf("%s of %s must be %v", sizeName, field, params)
	case "gte":
		return fmt.Sprintf("%s must be greater than or equal to %v", field, params)
	case "lte":
		return fmt.Sprintf("%s must be less than or equal to %v", field, params)
	case "email":
		return fmt.Sprintf("%s must be a valid email address", field)
	// Enum cases here
	/// case ...:
	default:
		return fmt.Sprintf("%s failed validation for %s", field, tag)
	}
}
