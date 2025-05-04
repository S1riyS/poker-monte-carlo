package validation

import (
	"github.com/S1riyS/poker-monte-carlo/pkg/poker"
	"github.com/go-playground/validator/v10"
)

func validateEnum(value any, enumValues ...any) bool {
	isValid := false
	for _, enumValue := range enumValues {
		if value == enumValue {
			isValid = true
			break
		}
	}
	return isValid
}

const poker_suit_enum_name = "poker_suit_enum"

func validatePokerSuitEnum(fl validator.FieldLevel) bool {
	value := fl.Field().String()
	return validateEnum(value, poker.SuitList)
}
