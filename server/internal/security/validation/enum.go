package validation

import (
	"github.com/S1riyS/poker-monte-carlo/pkg/poker"
	"github.com/go-playground/validator/v10"
)

func validateEnum[T comparable](value T, enumValues []T) bool {
	for _, enumValue := range enumValues {
		if value == enumValue {
			return true
		}
	}
	return false
}

const poker_suit_enum_name = "poker_suit_enum"

func validatePokerSuitEnum(fl validator.FieldLevel) bool {
	value := fl.Field().String()
	return validateEnum(poker.Suit(value), poker.SuitList[:])
}
